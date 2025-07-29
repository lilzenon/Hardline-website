/**
 * Image Optimization Routes
 * Serves optimized images with WebP/AVIF support and responsive sizing
 */

const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const router = express.Router();

// Import Sharp for image optimization with enhanced logging
let sharp;
let sharpLoadTime;
let sharpVersion;

function initializeSharp() {
    try {
        const startTime = Date.now();
        sharp = require('sharp');
        sharpLoadTime = Date.now() - startTime;
        sharpVersion = (sharp.versions && sharp.versions.sharp) || 'unknown';
        console.log(`✅ Sharp module loaded in images route (v${sharpVersion}, ${sharpLoadTime}ms)`);
        return true;
    } catch (error) {
        console.warn('⚠️ Sharp module not available in images route:', error.message);
        sharp = null;
        return false;
    }
}

// Initialize Sharp on module load
const sharpInitialized = initializeSharp();

// Sharp availability checker with per-request logging
function checkSharpAvailability(requestId) {
    const isAvailable = sharp && typeof sharp === 'function';
    console.log(`🔍 [${requestId}] Sharp availability check: ${isAvailable ? '✅ Available' : '❌ Not Available'} (v${sharpVersion || 'N/A'})`);

    // If Sharp is not available, try to reinitialize once
    if (!isAvailable && sharp === null) {
        console.log(`🔄 [${requestId}] Attempting Sharp reinitialization...`);
        const reinitSuccess = initializeSharp();
        console.log(`🔄 [${requestId}] Sharp reinitialization: ${reinitSuccess ? '✅ Success' : '❌ Failed'}`);
        return reinitSuccess;
    }

    return isAvailable;
}

/**
 * Check if browser supports WebP
 */
function supportsWebP(req) {
    const accept = req.headers.accept || '';
    return accept.includes('image/webp');
}

/**
 * Check if browser supports AVIF
 */
function supportsAVIF(req) {
    const accept = req.headers.accept || '';
    return accept.includes('image/avif');
}

/**
 * Get best image format for browser
 */
function getBestFormat(req) {
    if (supportsAVIF(req)) return 'avif';
    if (supportsWebP(req)) return 'webp';
    return 'original';
}

/**
 * Serve optimized images
 */
router.get('/optimized/:imageName', async(req, res) => {
    try {
        const { imageName } = req.params;
        const width = req.query.w ? parseInt(req.query.w) : null;

        // Check if the imageName already has an extension (explicit format request)
        const hasExtension = /\.(webp|avif|png|jpg|jpeg)$/i.test(imageName);
        let requestedFormat = null;
        let baseName = imageName;

        if (hasExtension) {
            // Extract format from filename
            const ext = path.extname(imageName).slice(1).toLowerCase();
            requestedFormat = ext === 'jpg' ? 'jpeg' : ext;
            baseName = imageName.replace(/\.[^/.]+$/, '');
        }

        const bestFormat = requestedFormat || getBestFormat(req);

        // Build possible image paths in order of preference
        const possiblePaths = [];

        if (width && bestFormat !== 'original') {
            // Responsive optimized image with specific width
            possiblePaths.push(
                path.join(__dirname, '../../static/images/optimized', `${baseName}-${width}w.${bestFormat}`)
            );
        }

        if (bestFormat !== 'original') {
            // Standard optimized image
            possiblePaths.push(
                path.join(__dirname, '../../static/images/optimized', `${baseName}.${bestFormat}`)
            );
        }

        // Fallback to original (use original extension if available)
        const originalName = hasExtension ? imageName : `${baseName}.png`;
        const originalPath = path.join(__dirname, '../../static/images/figma-exact', originalName);
        possiblePaths.push(originalPath);

        // If width is specified but no optimized version exists, create it on-the-fly
        if (width && !fs.existsSync(possiblePaths[0]) && fs.existsSync(originalPath)) {
            try {
                const outputPath = path.join(__dirname, '../../static/images/optimized', `${baseName}-${width}w.${bestFormat}`);

                // Create optimized directory if it doesn't exist
                const optimizedDir = path.dirname(outputPath);
                if (!fs.existsSync(optimizedDir)) {
                    fs.mkdirSync(optimizedDir, { recursive: true });
                }

                // Generate responsive image using Sharp
                await sharp(originalPath)
                    .resize(width, width, {
                        fit: 'cover',
                        position: 'center'
                    })
                    .webp({ quality: 85 })
                    .toFile(outputPath);

                // Add the newly created file to the front of possible paths
                possiblePaths.unshift(outputPath);
            } catch (sharpError) {
                console.error(`⚠️ Failed to generate responsive image: ${sharpError.message}`);
            }
        }

        // Try each path until we find an existing file
        for (const imagePath of possiblePaths) {
            try {
                await fs.access(imagePath);

                // Set appropriate headers
                const ext = path.extname(imagePath).slice(1);
                const mimeType = {
                    'webp': 'image/webp',
                    'avif': 'image/avif',
                    'png': 'image/png',
                    'jpg': 'image/jpeg',
                    'jpeg': 'image/jpeg'
                }[ext] || 'image/png';

                res.set({
                    'Content-Type': mimeType,
                    'Cache-Control': 'public, max-age=31536000, immutable', // 1 year
                    'Vary': 'Accept',
                    'X-Image-Optimized': bestFormat !== 'original' ? 'true' : 'false'
                });

                return res.sendFile(imagePath);
            } catch {
                // File doesn't exist, try next option
                continue;
            }
        }

        // No image found
        res.status(404).json({ error: 'Image not found' });

    } catch (error) {
        console.error('❌ Image serving error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Generate responsive image srcset
 */
router.get('/srcset/:imageName', async(req, res) => {
    try {
        const { imageName } = req.params;
        const bestFormat = getBestFormat(req);
        const sizes = [320, 640, 768, 1024, 1280, 1920];

        const srcset = [];
        const baseName = imageName.replace(/\.[^/.]+$/, '');

        for (const size of sizes) {
            const optimizedPath = path.join(__dirname, '../../static/images/optimized', `${baseName}-${size}w.${bestFormat}`);

            try {
                await fs.access(optimizedPath);
                srcset.push(`/images/optimized/${baseName}-${size}w.${bestFormat} ${size}w`);
            } catch {
                // Size doesn't exist, skip
            }
        }

        // Add fallback
        if (srcset.length === 0) {
            srcset.push(`/images/figma-exact/${imageName} 1920w`);
        }

        res.json({
            srcset: srcset.join(', '),
            format: bestFormat,
            sizes: srcset.length
        });

    } catch (error) {
        console.error('❌ Srcset generation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Image optimization stats
 */
router.get('/stats', async(req, res) => {
    try {
        const optimizedDir = path.join(__dirname, '../../static/images/optimized');
        const originalDir = path.join(__dirname, '../../static/images/figma-exact');

        let optimizedFiles = [];
        let originalFiles = [];

        try {
            optimizedFiles = await fs.readdir(optimizedDir);
        } catch {
            optimizedFiles = [];
        }

        try {
            originalFiles = await fs.readdir(originalDir);
        } catch {
            originalFiles = [];
        }

        const stats = {
            optimizedImages: optimizedFiles.length,
            originalImages: originalFiles.length,
            optimizationRatio: originalFiles.length > 0 ? (optimizedFiles.length / originalFiles.length * 100).toFixed(1) + '%' : '0%',
            supportedFormats: ['webp', 'avif', 'png', 'jpeg'],
            cachePolicy: '1 year immutable'
        };

        res.json(stats);

    } catch (error) {
        console.error('❌ Stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Memory tracking for Sharp instances
let activeSharpInstances = 0;
const MAX_CONCURRENT_SHARP = 5;

// Request queue system to prevent Sharp exhaustion
const optimizationQueue = [];
let isProcessingQueue = false;

// Sleep utility for retry delays
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Process optimization queue
async function processOptimizationQueue() {
    if (isProcessingQueue || optimizationQueue.length === 0) {
        return;
    }

    isProcessingQueue = true;
    console.log(`🔄 Processing optimization queue: ${optimizationQueue.length} requests pending`);

    while (optimizationQueue.length > 0 && activeSharpInstances < MAX_CONCURRENT_SHARP) {
        const queueItem = optimizationQueue.shift();
        const { resolve, reject, imageBuffer, format, requestId, maxRetries } = queueItem;

        console.log(`📤 [${requestId}] Dequeued for processing (Queue: ${optimizationQueue.length}, Active: ${activeSharpInstances})`);

        try {
            const result = await optimizeImageWithRetry(imageBuffer, format, requestId, maxRetries);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    }

    isProcessingQueue = false;

    // Continue processing if more items were added
    if (optimizationQueue.length > 0) {
        setImmediate(processOptimizationQueue);
    }
}

// Queue-aware optimization wrapper
function queueOptimization(imageBuffer, format, requestId, maxRetries = 3) {
    return new Promise((resolve, reject) => {
        // If we have capacity, process immediately
        if (activeSharpInstances < MAX_CONCURRENT_SHARP && optimizationQueue.length === 0) {
            console.log(`⚡ [${requestId}] Processing immediately (Active: ${activeSharpInstances})`);
            optimizeImageWithRetry(imageBuffer, format, requestId, maxRetries)
                .then(resolve)
                .catch(reject);
        } else {
            // Add to queue
            console.log(`📥 [${requestId}] Added to queue (Queue: ${optimizationQueue.length + 1}, Active: ${activeSharpInstances})`);
            optimizationQueue.push({ resolve, reject, imageBuffer, format, requestId, maxRetries });
            processOptimizationQueue();
        }
    });
}

// Enhanced image optimization with retry logic and memory management
async function optimizeImageWithRetry(imageBuffer, format, requestId, maxRetries = 3) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Check memory constraints
            if (activeSharpInstances >= MAX_CONCURRENT_SHARP) {
                console.warn(`🚫 [${requestId}] Max concurrent Sharp instances reached (${activeSharpInstances}), attempt ${attempt}/${maxRetries}`);
                if (attempt < maxRetries) {
                    const delay = Math.pow(2, attempt - 1) * 100; // Exponential backoff: 100ms, 200ms, 400ms
                    console.log(`⏳ [${requestId}] Waiting ${delay}ms before retry...`);
                    await sleep(delay);
                    continue;
                } else {
                    throw new Error('Max concurrent Sharp instances exceeded');
                }
            }

            // Track memory usage
            const memBefore = process.memoryUsage();
            activeSharpInstances++;

            console.log(`🔄 [${requestId}] Sharp optimization attempt ${attempt}/${maxRetries} (Active: ${activeSharpInstances}, Memory: ${Math.round(memBefore.heapUsed / 1024 / 1024)}MB)`);

            let optimizedBuffer;
            let sharpInstance;

            try {
                sharpInstance = sharp(imageBuffer);

                if (format === 'webp') {
                    optimizedBuffer = await sharpInstance
                        .webp({ quality: 85, effort: 4 })
                        .toBuffer();
                } else {
                    optimizedBuffer = await sharpInstance
                        .jpeg({ quality: 85, progressive: true })
                        .toBuffer();
                }

                // Success - log memory usage and return
                const memAfter = process.memoryUsage();
                const memDiff = Math.round((memAfter.heapUsed - memBefore.heapUsed) / 1024 / 1024);
                console.log(`✅ [${requestId}] Sharp optimization successful on attempt ${attempt} (Memory delta: ${memDiff}MB)`);

                return optimizedBuffer;

            } finally {
                // Always cleanup Sharp instance and decrement counter
                if (sharpInstance) {
                    try {
                        sharpInstance.destroy();
                    } catch (destroyError) {
                        console.warn(`⚠️ [${requestId}] Sharp instance cleanup warning:`, destroyError.message);
                    }
                }
                activeSharpInstances--;
            }

        } catch (error) {
            lastError = error;
            console.error(`❌ [${requestId}] Sharp optimization attempt ${attempt}/${maxRetries} failed:`, error.message);

            if (attempt < maxRetries) {
                const delay = Math.pow(2, attempt - 1) * 100; // Exponential backoff
                console.log(`⏳ [${requestId}] Retrying in ${delay}ms...`);
                await sleep(delay);
            }
        }
    }

    // All retries failed
    throw lastError;
}

/**
 * Enhanced optimization with responsive sizing support
 */
function queueOptimizationWithResize(imageBuffer, format, width, requestId) {
    return new Promise((resolve, reject) => {
        // If we have capacity, process immediately
        if (activeSharpInstances < MAX_CONCURRENT_SHARP && optimizationQueue.length === 0) {
            console.log(`⚡ [${requestId}] Processing immediately with resize (Active: ${activeSharpInstances})`);
            optimizeImageWithRetryAndResize(imageBuffer, format, width, requestId, 3)
                .then(resolve)
                .catch(reject);
        } else {
            // Add to queue
            console.log(`📋 [${requestId}] Adding to optimization queue (Queue length: ${optimizationQueue.length + 1})`);
            optimizationQueue.push({
                imageBuffer,
                format,
                width,
                requestId,
                resolve,
                reject,
                maxRetries: 3
            });

            // Process queue
            setImmediate(processOptimizationQueueWithResize);
        }
    });
}

// Process optimization queue with resize support
function processOptimizationQueueWithResize() {
    if (optimizationQueue.length === 0 || activeSharpInstances >= MAX_CONCURRENT_SHARP) {
        return;
    }

    const task = optimizationQueue.shift();
    console.log(`🔄 [${task.requestId}] Processing queued optimization with resize (Queue remaining: ${optimizationQueue.length})`);

    optimizeImageWithRetryAndResize(task.imageBuffer, task.format, task.width, task.requestId, task.maxRetries)
        .then(task.resolve)
        .catch(task.reject)
        .finally(() => {
            // Process next item in queue
            setImmediate(processOptimizationQueueWithResize);
        });
}

/**
 * Enhanced image optimization with retry logic, memory management, and responsive sizing
 */
async function optimizeImageWithRetryAndResize(imageBuffer, format, width, requestId, maxRetries = 3) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Check memory constraints
            if (activeSharpInstances >= MAX_CONCURRENT_SHARP) {
                console.warn(`🚫 [${requestId}] Max concurrent Sharp instances reached (${activeSharpInstances}), attempt ${attempt}/${maxRetries}`);
                if (attempt < maxRetries) {
                    const delay = Math.pow(2, attempt - 1) * 100; // Exponential backoff: 100ms, 200ms, 400ms
                    console.log(`⏳ [${requestId}] Waiting ${delay}ms before retry...`);
                    await sleep(delay);
                    continue;
                } else {
                    throw new Error('Max concurrent Sharp instances exceeded');
                }
            }

            // Track memory usage
            const memBefore = process.memoryUsage();
            activeSharpInstances++;

            console.log(`🔄 [${requestId}] Sharp optimization with resize attempt ${attempt}/${maxRetries} (Active: ${activeSharpInstances}, Memory: ${Math.round(memBefore.heapUsed / 1024 / 1024)}MB)`);

            let optimizedBuffer;

            try {
                let sharpInstance = sharp(imageBuffer);

                // Apply responsive resizing if width is specified
                if (width && width > 0) {
                    sharpInstance = sharpInstance.resize(width, null, {
                        withoutEnlargement: true,
                        fit: 'inside'
                    });
                    console.log(`📐 [${requestId}] Resizing to max width: ${width}px`);
                }

                // Apply format-specific optimization
                if (format === 'webp') {
                    optimizedBuffer = await sharpInstance
                        .webp({ quality: 85, effort: 4, smartSubsample: true })
                        .toBuffer();
                } else if (format === 'avif') {
                    optimizedBuffer = await sharpInstance
                        .avif({ quality: 80, effort: 4 })
                        .toBuffer();
                } else {
                    optimizedBuffer = await sharpInstance
                        .jpeg({ quality: 85, progressive: true, mozjpeg: true })
                        .toBuffer();
                }

                // Success - log memory usage and return
                const memAfter = process.memoryUsage();
                const memDiff = Math.round((memAfter.heapUsed - memBefore.heapUsed) / 1024 / 1024);
                console.log(`✅ [${requestId}] Sharp optimization with resize successful on attempt ${attempt} (Memory delta: ${memDiff}MB)`);

                return optimizedBuffer;

            } finally {
                activeSharpInstances--;
                console.log(`🔓 [${requestId}] Sharp instance released (Active: ${activeSharpInstances})`);
            }

        } catch (error) {
            lastError = error;
            console.warn(`⚠️ [${requestId}] Sharp optimization attempt ${attempt} failed: ${error.message}`);

            if (attempt < maxRetries) {
                const delay = Math.pow(2, attempt - 1) * 100; // Exponential backoff
                console.log(`⏳ [${requestId}] Retrying in ${delay}ms...`);
                await sleep(delay);
            }
        }
    }

    // All retries failed
    throw lastError;
}

// Proxy optimization route for external images (event covers, etc.)
router.get('/proxy-optimized', async(req, res) => {
            const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
            const startTime = Date.now();

            try {
                const { url } = req.query;

                if (!url) {
                    return res.status(400).json({ error: 'URL parameter is required' });
                }

                const decodedUrl = decodeURIComponent(url);
                console.log(`🔄 [${requestId}] Starting proxy optimization: ${decodedUrl}`);

                // Enhanced Sharp availability check with per-request logging
                if (!checkSharpAvailability(requestId)) {
                    console.warn(`⚠️ [${requestId}] Sharp not available, redirecting to original: ${decodedUrl}`);
                    return res.redirect(decodedUrl);
                }

                // Fetch the external image
                const fetch = (await
                    import ('node-fetch')).default;
                const fetchStart = Date.now();

                const response = await fetch(decodedUrl, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (compatible; ImageOptimizer/1.0)'
                    },
                    timeout: 10000
                });

                const fetchTime = Date.now() - fetchStart;
                console.log(`📥 [${requestId}] Image fetch completed in ${fetchTime}ms (Status: ${response.status})`);

                if (!response.ok) {
                    console.warn(`⚠️ [${requestId}] Failed to fetch image (${response.status}), redirecting to original: ${decodedUrl}`);
                    return res.redirect(decodedUrl);
                }

                const imageBuffer = Buffer.from(await response.arrayBuffer());

                // Validate image buffer
                if (!imageBuffer || imageBuffer.length === 0) {
                    console.warn(`⚠️ [${requestId}] Empty image buffer, redirecting to original: ${decodedUrl}`);
                    return res.redirect(decodedUrl);
                }

                console.log(`📊 [${requestId}] Image buffer size: ${Math.round(imageBuffer.length / 1024)}KB`);

                const bestFormat = getBestFormat(req);
                const width = req.query.w ? parseInt(req.query.w) : null;

                // Set aggressive caching headers
                res.set({
                    'Cache-Control': 'public, max-age=31536000, immutable', // 1 year
                    'Content-Type': bestFormat === 'webp' ? 'image/webp' : bestFormat === 'avif' ? 'image/avif' : 'image/jpeg',
                    'Vary': 'Accept'
                });

                // Optimize the image using enhanced queue system with responsive sizing
                try {
                    const optimizedBuffer = await queueOptimizationWithResize(imageBuffer, bestFormat, width, requestId);

                    const totalTime = Date.now() - startTime;
                    const compressionRatio = ((imageBuffer.length - optimizedBuffer.length) / imageBuffer.length * 100).toFixed(1);

                    console.log(`✅ [${requestId}] External image optimized (${bestFormat.toUpperCase()}${width ? `, ${width}px` : ''}): ${decodedUrl}`);
            console.log(`📈 [${requestId}] Size: ${Math.round(imageBuffer.length / 1024)}KB → ${Math.round(optimizedBuffer.length / 1024)}KB (${compressionRatio}% reduction)`);
            console.log(`⏱️ [${requestId}] Total processing time: ${totalTime}ms`);

            res.send(optimizedBuffer);

        } catch (sharpError) {
            const totalTime = Date.now() - startTime;
            console.error(`❌ [${requestId}] All Sharp optimization attempts failed after ${totalTime}ms:`, sharpError.message);
            console.warn(`⚠️ [${requestId}] Falling back to original image: ${decodedUrl}`);
            return res.redirect(decodedUrl);
        }

    } catch (error) {
        const totalTime = Date.now() - startTime;
        console.error(`❌ [${requestId}] Proxy optimization error after ${totalTime}ms:`, error.message);

        // Fallback: redirect to original URL
        const { url } = req.query;
        if (url) {
            console.warn(`⚠️ [${requestId}] General error, redirecting to original: ${decodeURIComponent(url)}`);
            res.redirect(decodeURIComponent(url));
        } else {
            res.status(500).json({ error: 'Image optimization failed' });
        }
    }
});

// Cache clearing and diagnostics endpoint
router.post('/clear-cache', async(req, res) => {
    try {
        console.log('🧹 Clearing image optimization caches...');

        // Clear any internal caches
        activeSharpInstances = 0;
        optimizationQueue.length = 0;
        isProcessingQueue = false;

        // Force garbage collection if available
        if (global.gc) {
            global.gc();
            console.log('🗑️ Forced garbage collection');
        }

        // Reinitialize Sharp module
        const reinitSuccess = initializeSharp();

        const memUsage = process.memoryUsage();

        res.json({
            success: true,
            message: 'Image optimization caches cleared',
            sharp_reinitialized: reinitSuccess,
            memory_usage: {
                heap_used: Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB',
                heap_total: Math.round(memUsage.heapTotal / 1024 / 1024) + 'MB',
                external: Math.round(memUsage.external / 1024 / 1024) + 'MB'
            },
            active_instances: activeSharpInstances,
            queue_length: optimizationQueue.length
        });

    } catch (error) {
        console.error('❌ Cache clearing error:', error);
        res.status(500).json({ error: 'Failed to clear caches' });
    }
});

// Diagnostics endpoint for debugging optimization issues
router.get('/diagnostics', async(req, res) => {
    try {
        const memUsage = process.memoryUsage();

        res.json({
            sharp_status: {
                available: sharp && typeof sharp === 'function',
                version: sharpVersion,
                load_time: sharpLoadTime + 'ms'
            },
            queue_status: {
                active_instances: activeSharpInstances,
                max_concurrent: MAX_CONCURRENT_SHARP,
                queue_length: optimizationQueue.length,
                is_processing: isProcessingQueue
            },
            memory_usage: {
                heap_used: Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB',
                heap_total: Math.round(memUsage.heapTotal / 1024 / 1024) + 'MB',
                external: Math.round(memUsage.external / 1024 / 1024) + 'MB',
                rss: Math.round(memUsage.rss / 1024 / 1024) + 'MB'
            },
            system_info: {
                node_version: process.version,
                platform: process.platform,
                arch: process.arch,
                uptime: Math.round(process.uptime()) + 's'
            }
        });

    } catch (error) {
        console.error('❌ Diagnostics error:', error);
        res.status(500).json({ error: 'Failed to get diagnostics' });
    }
});

// URL testing endpoint for analyzing specific failing URLs
router.post('/test-url', async(req, res) => {
    const { url } = req.body;
    const requestId = `test_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        const decodedUrl = decodeURIComponent(url);
        console.log(`🧪 [${requestId}] Testing URL: ${decodedUrl}`);

        const testResults = {
            url: decodedUrl,
            request_id: requestId,
            timestamp: new Date().toISOString(),
            tests: {}
        };

        // Test 1: URL accessibility
        const fetch = (await
            import ('node-fetch')).default;
        const fetchStart = Date.now();

        try {
            const response = await fetch(decodedUrl, {
                headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ImageOptimizer/1.0)' },
                timeout: 10000
            });

            const fetchTime = Date.now() - fetchStart;
            testResults.tests.accessibility = {
                success: response.ok,
                status: response.status,
                status_text: response.statusText,
                fetch_time: fetchTime + 'ms',
                content_type: response.headers.get('content-type'),
                content_length: response.headers.get('content-length')
            };

            if (response.ok) {
                // Test 2: Image buffer processing
                const imageBuffer = Buffer.from(await response.arrayBuffer());
                testResults.tests.buffer_processing = {
                    success: imageBuffer && imageBuffer.length > 0,
                    buffer_size: Math.round(imageBuffer.length / 1024) + 'KB',
                    buffer_length: imageBuffer.length
                };

                // Test 3: Sharp optimization
                if (imageBuffer && imageBuffer.length > 0) {
                    try {
                        const optimizationStart = Date.now();
                        const optimizedBuffer = await queueOptimization(imageBuffer, 'webp', requestId, 1);
                        const optimizationTime = Date.now() - optimizationStart;

                        testResults.tests.sharp_optimization = {
                            success: true,
                            optimization_time: optimizationTime + 'ms',
                            original_size: Math.round(imageBuffer.length / 1024) + 'KB',
                            optimized_size: Math.round(optimizedBuffer.length / 1024) + 'KB',
                            compression_ratio: ((imageBuffer.length - optimizedBuffer.length) / imageBuffer.length * 100).toFixed(1) + '%'
                        };
                    } catch (sharpError) {
                        testResults.tests.sharp_optimization = {
                            success: false,
                            error: sharpError.message,
                            error_type: sharpError.constructor.name
                        };
                    }
                }
            }
        } catch (fetchError) {
            testResults.tests.accessibility = {
                success: false,
                error: fetchError.message,
                error_type: fetchError.constructor.name
            };
        }

        // Test 4: System status
        testResults.tests.system_status = {
            sharp_available: checkSharpAvailability(requestId),
            active_instances: activeSharpInstances,
            queue_length: optimizationQueue.length,
            memory_usage: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB'
        };

        console.log(`🧪 [${requestId}] Test completed:`, JSON.stringify(testResults, null, 2));
        res.json(testResults);

    } catch (error) {
        console.error(`❌ [${requestId}] URL test error:`, error);
        res.status(500).json({
            error: 'URL test failed',
            message: error.message,
            request_id: requestId
        });
    }
});

module.exports = router;