/**
 * WebGL Detection Utilities
 * Detects WebGL support and capabilities for Three.js components
 */

/**
 * Check if WebGL is supported in the current environment
 * @returns {boolean} True if WebGL is supported
 */
export function isWebGLSupported() {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!context) {
      return false;
    }
    
    // Check for basic WebGL capabilities
    const hasVertexShaderSupport = context.getShaderPrecisionFormat(context.VERTEX_SHADER, context.HIGH_FLOAT);
    const hasFragmentShaderSupport = context.getShaderPrecisionFormat(context.FRAGMENT_SHADER, context.HIGH_FLOAT);
    
    // Clean up
    const extension = context.getExtension('WEBGL_lose_context');
    if (extension) {
      extension.loseContext();
    }
    
    return !!(hasVertexShaderSupport && hasFragmentShaderSupport);
  } catch (error) {
    console.warn('WebGL detection failed:', error);
    return false;
  }
}

/**
 * Check if WebGL2 is supported
 * @returns {boolean} True if WebGL2 is supported
 */
export function isWebGL2Supported() {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2');
    
    if (!context) {
      return false;
    }
    
    // Clean up
    const extension = context.getExtension('WEBGL_lose_context');
    if (extension) {
      extension.loseContext();
    }
    
    return true;
  } catch (error) {
    console.warn('WebGL2 detection failed:', error);
    return false;
  }
}

/**
 * Get WebGL capabilities and limitations
 * @returns {Object} WebGL capabilities object
 */
export function getWebGLCapabilities() {
  if (!isWebGLSupported()) {
    return {
      supported: false,
      version: null,
      maxTextureSize: 0,
      maxVertexUniforms: 0,
      maxFragmentUniforms: 0
    };
  }
  
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    const capabilities = {
      supported: true,
      version: isWebGL2Supported() ? 2 : 1,
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxVertexUniforms: gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
      maxFragmentUniforms: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
      maxVaryingVectors: gl.getParameter(gl.MAX_VARYING_VECTORS),
      maxVertexAttribs: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
      maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
      aliasedLineWidthRange: gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE),
      aliasedPointSizeRange: gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)
    };
    
    // Clean up
    const extension = gl.getExtension('WEBGL_lose_context');
    if (extension) {
      extension.loseContext();
    }
    
    return capabilities;
  } catch (error) {
    console.warn('Failed to get WebGL capabilities:', error);
    return {
      supported: false,
      version: null,
      maxTextureSize: 0,
      maxVertexUniforms: 0,
      maxFragmentUniforms: 0
    };
  }
}

/**
 * Check if the current environment is suitable for Three.js
 * @returns {boolean} True if environment supports Three.js
 */
export function isThreeJSCompatible() {
  // Check basic requirements
  if (typeof window === 'undefined') {
    return false; // Server-side rendering
  }
  
  if (!document || !document.createElement) {
    return false; // No DOM support
  }
  
  if (!isWebGLSupported()) {
    return false; // No WebGL support
  }
  
  // Check for minimum capabilities
  const capabilities = getWebGLCapabilities();
  if (capabilities.maxTextureSize < 512) {
    return false; // Too limited for our shaders
  }
  
  return true;
}

/**
 * Log WebGL information for debugging
 */
export function logWebGLInfo() {
  const capabilities = getWebGLCapabilities();
  console.log('🎮 WebGL Capabilities:', {
    supported: capabilities.supported,
    version: capabilities.version,
    maxTextureSize: capabilities.maxTextureSize,
    maxVertexUniforms: capabilities.maxVertexUniforms,
    maxFragmentUniforms: capabilities.maxFragmentUniforms,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    vendor: navigator.vendor
  });
}
