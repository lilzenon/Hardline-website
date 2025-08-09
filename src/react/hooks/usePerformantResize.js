/**
 * Performance-optimized resize hook that prevents forced reflows
 * Batches DOM reads and writes, uses ResizeObserver when available
 */
import { useState, useEffect, useRef, useCallback } from 'react';

// Shared resize observer instance to avoid creating multiple observers
let sharedResizeObserver = null;
const resizeCallbacks = new Map();

// Initialize shared ResizeObserver
const initializeResizeObserver = () => {
    if (typeof window === 'undefined' || sharedResizeObserver) return;

    if ('ResizeObserver' in window) {
        sharedResizeObserver = new ResizeObserver((entries) => {
            // Batch all resize callbacks in a single animation frame
            requestAnimationFrame(() => {
                entries.forEach((entry) => {
                    const callbacks = resizeCallbacks.get(entry.target);
                    if (callbacks) {
                        const { width, height } = entry.contentRect;
                        callbacks.forEach(callback => callback({ width, height }));
                    }
                });
            });
        });
    }
};

export const usePerformantResize = (callback, element = null) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const callbackRef = useRef(callback);
    const elementRef = useRef(element);

    // Update callback ref without triggering re-renders
    callbackRef.current = callback;
    elementRef.current = element;

    const handleResize = useCallback((newDimensions) => {
        setDimensions(newDimensions);
        if (callbackRef.current) {
            callbackRef.current(newDimensions);
        }
    }, []);

    useEffect(() => {
        initializeResizeObserver();

        const targetElement = elementRef.current || window;

        if (sharedResizeObserver && targetElement !== window) {
            // Use ResizeObserver for element-specific resize detection
            if (!resizeCallbacks.has(targetElement)) {
                resizeCallbacks.set(targetElement, new Set());
            }
            resizeCallbacks.get(targetElement).add(handleResize);
            sharedResizeObserver.observe(targetElement);

            return () => {
                const callbacks = resizeCallbacks.get(targetElement);
                if (callbacks) {
                    callbacks.delete(handleResize);
                    if (callbacks.size === 0) {
                        resizeCallbacks.delete(targetElement);
                        sharedResizeObserver.unobserve(targetElement);
                    }
                }
            };
        } else {
            // Fallback to window resize with debouncing
            let rafId = null;
            let timeoutId = null;

            const debouncedResize = () => {
                if (rafId) cancelAnimationFrame(rafId);
                if (timeoutId) clearTimeout(timeoutId);

                timeoutId = setTimeout(() => {
                    rafId = requestAnimationFrame(() => {
                        const width = window.innerWidth;
                        const height = window.innerHeight;
                        handleResize({ width, height });
                    });
                }, 100); // 100ms debounce
            };

            window.addEventListener('resize', debouncedResize, { passive: true });

            // Initial measurement
            rafId = requestAnimationFrame(() => {
                const width = window.innerWidth;
                const height = window.innerHeight;
                handleResize({ width, height });
            });

            return () => {
                window.removeEventListener('resize', debouncedResize);
                if (rafId) cancelAnimationFrame(rafId);
                if (timeoutId) clearTimeout(timeoutId);
            };
        }
    }, [handleResize]);

    return dimensions;
};

/**
 * Hook for viewport-based responsive calculations
 * Prevents forced reflows by caching calculations
 * FIXED: Removed circular dependency by implementing resize logic directly
 */
export const useViewportDimensions = () => {
    const [viewport, setViewport] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
        isMobile: false,
        isTablet: false,
        isDesktop: false
    });

    const updateViewport = useCallback((dimensions) => {
        const { width, height } = dimensions;
        const isMobile = width <= 768;
        const isTablet = width > 768 && width <= 1024;
        const isDesktop = width > 1024;

        setViewport({
            width,
            height,
            isMobile,
            isTablet,
            isDesktop
        });
    }, []);

    // FIXED: Implement resize logic directly instead of calling usePerformantResize
    // This breaks the circular dependency that was causing "Cannot access before initialization"
    useEffect(() => {
        let rafId = null;
        let timeoutId = null;

        const debouncedResize = () => {
            if (rafId) cancelAnimationFrame(rafId);
            if (timeoutId) clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                rafId = requestAnimationFrame(() => {
                    const width = window.innerWidth;
                    const height = window.innerHeight;
                    updateViewport({ width, height });
                });
            }, 100); // 100ms debounce
        };

        window.addEventListener('resize', debouncedResize, { passive: true });

        // Initial measurement
        rafId = requestAnimationFrame(() => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            updateViewport({ width, height });
        });

        return () => {
            window.removeEventListener('resize', debouncedResize);
            if (rafId) cancelAnimationFrame(rafId);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [updateViewport]);

    return viewport;
};

/**
 * Hook for batched DOM measurements
 * Prevents forced reflows by batching reads and writes
 */
export const useBatchedMeasurements = () => {
    const measurementQueue = useRef([]);
    const rafId = useRef(null);

    const batchMeasurement = useCallback((element, callback) => {
        measurementQueue.current.push({ element, callback });

        if (rafId.current) return;

        rafId.current = requestAnimationFrame(() => {
            // Batch all DOM reads first
            const measurements = measurementQueue.current.map(({ element, callback }) => {
                if (!element) return null;

                const rect = element.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(element);

                return {
                    callback,
                    data: {
                        rect,
                        offsetWidth: element.offsetWidth,
                        offsetHeight: element.offsetHeight,
                        scrollTop: element.scrollTop,
                        scrollLeft: element.scrollLeft,
                        computedStyle
                    }
                };
            }).filter(Boolean);

            // Then execute all callbacks with the batched data
            measurements.forEach(({ callback, data }) => {
                callback(data);
            });

            measurementQueue.current = [];
            rafId.current = null;
        });
    }, []);

    useEffect(() => {
        return () => {
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, []);

    return batchMeasurement;
};