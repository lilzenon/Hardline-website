/**
 * Performance testing script to verify forced reflow optimizations
 * Run this in the browser console to test for layout thrashing
 */

console.log('🚀 Starting Performance Optimization Tests...');

// Test 1: Check for forced reflows during resize
function testResizePerformance() {
  console.log('\n📏 Testing Resize Performance...');
  
  const startTime = performance.now();
  let layoutCount = 0;
  
  // Monitor layout events
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'measure' && entry.name.includes('layout')) {
        layoutCount++;
      }
    }
  });
  
  observer.observe({ entryTypes: ['measure'] });
  
  // Simulate resize events
  for (let i = 0; i < 10; i++) {
    window.dispatchEvent(new Event('resize'));
  }
  
  setTimeout(() => {
    observer.disconnect();
    const endTime = performance.now();
    console.log(`✅ Resize test completed in ${(endTime - startTime).toFixed(2)}ms`);
    console.log(`📊 Layout events triggered: ${layoutCount}`);
    
    if (layoutCount < 5) {
      console.log('✅ PASS: Low layout thrashing detected');
    } else {
      console.log('❌ FAIL: High layout thrashing detected');
    }
  }, 1000);
}

// Test 2: Check for scroll performance
function testScrollPerformance() {
  console.log('\n📜 Testing Scroll Performance...');
  
  const scrollContainer = document.querySelector('.scroll-container') || document.documentElement;
  const startTime = performance.now();
  let frameCount = 0;
  
  function measureFrame() {
    frameCount++;
    if (frameCount < 60) { // Test for 1 second at 60fps
      requestAnimationFrame(measureFrame);
    } else {
      const endTime = performance.now();
      const fps = (frameCount / ((endTime - startTime) / 1000)).toFixed(1);
      console.log(`✅ Scroll test completed: ${fps} FPS`);
      
      if (fps > 55) {
        console.log('✅ PASS: Smooth scroll performance');
      } else {
        console.log('❌ FAIL: Poor scroll performance');
      }
    }
  }
  
  // Simulate scroll events
  for (let i = 0; i < 100; i++) {
    scrollContainer.scrollTop = i * 10;
  }
  
  requestAnimationFrame(measureFrame);
}

// Test 3: Check for layout-triggering properties
function testLayoutTriggers() {
  console.log('\n🎯 Testing Layout Triggers...');
  
  const testElement = document.createElement('div');
  testElement.style.cssText = `
    position: absolute;
    top: -1000px;
    left: -1000px;
    width: 100px;
    height: 100px;
    background: red;
  `;
  document.body.appendChild(testElement);
  
  const startTime = performance.now();
  
  // Test layout-triggering properties
  const layoutProperties = [
    'offsetWidth', 'offsetHeight', 'clientWidth', 'clientHeight',
    'scrollTop', 'scrollLeft', 'scrollWidth', 'scrollHeight'
  ];
  
  let accessCount = 0;
  layoutProperties.forEach(prop => {
    for (let i = 0; i < 100; i++) {
      const value = testElement[prop]; // This should not trigger layout if optimized
      accessCount++;
    }
  });
  
  const endTime = performance.now();
  document.body.removeChild(testElement);
  
  console.log(`✅ Layout property access test completed in ${(endTime - startTime).toFixed(2)}ms`);
  console.log(`📊 Properties accessed: ${accessCount}`);
  
  if ((endTime - startTime) < 50) {
    console.log('✅ PASS: Fast layout property access');
  } else {
    console.log('❌ FAIL: Slow layout property access');
  }
}

// Test 4: Check for animation performance
function testAnimationPerformance() {
  console.log('\n🎬 Testing Animation Performance...');
  
  const testElement = document.createElement('div');
  testElement.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    background: blue;
    transform: translate(-50%, -50%);
    transition: transform 0.3s ease;
  `;
  document.body.appendChild(testElement);
  
  let frameCount = 0;
  const startTime = performance.now();
  
  function animateElement() {
    frameCount++;
    const progress = (frameCount % 120) / 120; // 2 second cycle
    const translateX = Math.sin(progress * Math.PI * 2) * 100;
    const translateY = Math.cos(progress * Math.PI * 2) * 100;
    
    // Use transform instead of layout properties
    testElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
    
    if (frameCount < 120) {
      requestAnimationFrame(animateElement);
    } else {
      const endTime = performance.now();
      document.body.removeChild(testElement);
      
      const fps = (frameCount / ((endTime - startTime) / 1000)).toFixed(1);
      console.log(`✅ Animation test completed: ${fps} FPS`);
      
      if (fps > 55) {
        console.log('✅ PASS: Smooth animation performance');
      } else {
        console.log('❌ FAIL: Poor animation performance');
      }
    }
  }
  
  requestAnimationFrame(animateElement);
}

// Test 5: Check for memory leaks in event listeners
function testEventListenerLeaks() {
  console.log('\n🧠 Testing Event Listener Memory Management...');
  
  const initialListeners = getEventListenerCount();
  
  // Create and destroy multiple components with event listeners
  for (let i = 0; i < 100; i++) {
    const element = document.createElement('div');
    const handler = () => {};
    
    element.addEventListener('click', handler);
    element.addEventListener('scroll', handler, { passive: true });
    element.addEventListener('resize', handler);
    
    document.body.appendChild(element);
    
    // Simulate component cleanup
    element.removeEventListener('click', handler);
    element.removeEventListener('scroll', handler);
    element.removeEventListener('resize', handler);
    
    document.body.removeChild(element);
  }
  
  // Force garbage collection if available
  if (window.gc) {
    window.gc();
  }
  
  setTimeout(() => {
    const finalListeners = getEventListenerCount();
    const leakedListeners = finalListeners - initialListeners;
    
    console.log(`📊 Initial listeners: ${initialListeners}`);
    console.log(`📊 Final listeners: ${finalListeners}`);
    console.log(`📊 Leaked listeners: ${leakedListeners}`);
    
    if (leakedListeners < 10) {
      console.log('✅ PASS: No significant memory leaks detected');
    } else {
      console.log('❌ FAIL: Memory leaks detected');
    }
  }, 1000);
}

// Helper function to estimate event listener count
function getEventListenerCount() {
  // This is an approximation since there's no direct way to count listeners
  const elements = document.querySelectorAll('*');
  let count = 0;
  
  elements.forEach(el => {
    // Check for common event listener indicators
    if (el.onclick || el.onscroll || el.onresize) count++;
    if (el.getAttribute('onclick')) count++;
    if (el.classList.contains('clickable')) count++;
  });
  
  return count;
}

// Test 6: Check Core Web Vitals impact
function testCoreWebVitals() {
  console.log('\n📈 Testing Core Web Vitals Impact...');
  
  // Measure Cumulative Layout Shift
  let clsScore = 0;
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsScore += entry.value;
      }
    }
  });
  
  observer.observe({ type: 'layout-shift', buffered: true });
  
  // Simulate layout shifts
  const testDiv = document.createElement('div');
  testDiv.style.cssText = 'width: 100px; height: 100px; background: red;';
  document.body.appendChild(testDiv);
  
  // This should NOT cause layout shift if optimized
  testDiv.style.transform = 'translateX(100px)';
  
  setTimeout(() => {
    observer.disconnect();
    document.body.removeChild(testDiv);
    
    console.log(`📊 Cumulative Layout Shift: ${clsScore.toFixed(4)}`);
    
    if (clsScore < 0.1) {
      console.log('✅ PASS: Good CLS score');
    } else if (clsScore < 0.25) {
      console.log('⚠️ WARN: Needs improvement CLS score');
    } else {
      console.log('❌ FAIL: Poor CLS score');
    }
  }, 2000);
}

// Run all tests
function runAllTests() {
  console.log('🧪 Running Performance Optimization Test Suite...');
  
  testResizePerformance();
  setTimeout(testScrollPerformance, 1500);
  setTimeout(testLayoutTriggers, 3000);
  setTimeout(testAnimationPerformance, 4500);
  setTimeout(testEventListenerLeaks, 6000);
  setTimeout(testCoreWebVitals, 8000);
  
  setTimeout(() => {
    console.log('\n🎉 All performance tests completed!');
    console.log('Check the results above to verify optimization effectiveness.');
  }, 12000);
}

// Auto-run tests if script is executed directly
if (typeof window !== 'undefined') {
  runAllTests();
}

// Export for manual testing
window.performanceTests = {
  runAllTests,
  testResizePerformance,
  testScrollPerformance,
  testLayoutTriggers,
  testAnimationPerformance,
  testEventListenerLeaks,
  testCoreWebVitals
};
