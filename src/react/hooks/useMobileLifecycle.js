/**
 * Mobile Lifecycle Management Hook
 * Handles tab switching, background/foreground transitions, and memory management
 * Prevents mobile browser lockups and black screens
 * EMERGENCY FIX: Simplified to prevent infinite recursion
 */

import { useEffect, useRef, useCallback, useState } from 'react';

export const useMobileLifecycle = () => {
    const [isVisible, setIsVisible] = useState(!document.hidden);
    const [isActive, setIsActive] = useState(true);
    const timersRef = useRef(new Set());
    const intervalsRef = useRef(new Set());
    const listenersRef = useRef(new Map());
    const cleanupFunctionsRef = useRef(new Set());

    // Enhanced timer management with automatic cleanup
    const createTimer = useCallback((callback, delay) => {
        const timerId = setTimeout(() => {
            timersRef.current.delete(timerId);
            callback();
        }, delay);

        timersRef.current.add(timerId);
        return timerId;
    }, []);

    const createInterval = useCallback((callback, delay) => {
        const intervalId = setInterval(() => {
            // Only execute if page is visible and active
            if (isVisible && isActive) {
                callback();
            }
        }, delay);

        intervalsRef.current.add(intervalId);
        return intervalId;
    }, [isVisible, isActive]);

    const clearTimer = useCallback((timerId) => {
        clearTimeout(timerId);
        timersRef.current.delete(timerId);
    }, []);

    const clearManagedInterval = useCallback((intervalId) => {
        clearInterval(intervalId);
        intervalsRef.current.delete(intervalId);
    }, []);

    // Enhanced event listener management
    const addEventListener = useCallback((element, event, handler, options = {}) => {
        const key = `${element.constructor.name}-${event}`;

        // Remove existing listener if it exists
        if (listenersRef.current.has(key)) {
            const { element: oldElement, event: oldEvent, handler: oldHandler } = listenersRef.current.get(key);
            oldElement.removeEventListener(oldEvent, oldHandler);
        }

        element.addEventListener(event, handler, options);
        listenersRef.current.set(key, { element, event, handler });

        return () => {
            element.removeEventListener(event, handler);
            listenersRef.current.delete(key);
        };
    }, []);

    // Register cleanup function
    const registerCleanup = useCallback((cleanupFn) => {
        cleanupFunctionsRef.current.add(cleanupFn);
        return () => cleanupFunctionsRef.current.delete(cleanupFn);
    }, []);

    // Pause all background processes
    const pauseBackgroundProcesses = useCallback(() => {
        console.log('🔄 Pausing background processes for mobile optimization');
        setIsActive(false);

        // Execute all registered cleanup functions
        cleanupFunctionsRef.current.forEach(cleanup => {
            try {
                cleanup();
            } catch (error) {
                console.warn('Error during cleanup:', error);
            }
        });
    }, []);

    // Resume background processes
    const resumeBackgroundProcesses = useCallback(() => {
        console.log('▶️ Resuming background processes');
        setIsActive(true);
    }, []);

    // Clean up all resources
    const cleanupAll = useCallback(() => {
        console.log('🧹 Cleaning up all mobile lifecycle resources');

        // Clear all timers
        timersRef.current.forEach(timerId => clearTimeout(timerId));
        timersRef.current.clear();

        // Clear all intervals
        intervalsRef.current.forEach(intervalId => clearInterval(intervalId));
        intervalsRef.current.clear();

        // Remove all event listeners
        listenersRef.current.forEach(({ element, event, handler }) => {
            try {
                element.removeEventListener(event, handler);
            } catch (error) {
                console.warn('Error removing event listener:', error);
            }
        });
        listenersRef.current.clear();

        // Execute cleanup functions
        cleanupFunctionsRef.current.forEach(cleanup => {
            try {
                cleanup();
            } catch (error) {
                console.warn('Error during final cleanup:', error);
            }
        });
        cleanupFunctionsRef.current.clear();
    }, []);

    // Handle page visibility changes
    useEffect(() => {
        const handleVisibilityChange = () => {
            const visible = !document.hidden;
            setIsVisible(visible);

            if (visible) {
                console.log('👁️ Page became visible - resuming processes');
                resumeBackgroundProcesses();
            } else {
                console.log('🙈 Page became hidden - pausing processes');
                pauseBackgroundProcesses();
            }
        };

        const handleFocus = () => {
            console.log('🎯 Window focused - resuming processes');
            setIsActive(true);
            resumeBackgroundProcesses();
        };

        const handleBlur = () => {
            console.log('😴 Window blurred - pausing processes');
            pauseBackgroundProcesses();
        };

        // Handle mobile app switching
        const handlePageHide = () => {
            console.log('📱 Page hide event - mobile app switch detected');
            pauseBackgroundProcesses();
        };

        const handlePageShow = (event) => {
            console.log('📱 Page show event - returning from mobile app switch');
            if (event.persisted) {
                console.log('📄 Page restored from cache');
            }
            resumeBackgroundProcesses();
        };

        // Add all event listeners
        document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });
        window.addEventListener('focus', handleFocus, { passive: true });
        window.addEventListener('blur', handleBlur, { passive: true });
        window.addEventListener('pagehide', handlePageHide, { passive: true });
        window.addEventListener('pageshow', handlePageShow, { passive: true });

        // Mobile-specific events
        window.addEventListener('beforeunload', pauseBackgroundProcesses, { passive: true });

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('pagehide', handlePageHide);
            window.removeEventListener('pageshow', handlePageShow);
            window.removeEventListener('beforeunload', pauseBackgroundProcesses);

            cleanupAll();
        };
    }, [pauseBackgroundProcesses, resumeBackgroundProcesses, cleanupAll]);

    // Memory pressure handling for mobile
    useEffect(() => {
        const handleMemoryPressure = () => {
            console.warn('⚠️ Memory pressure detected - cleaning up resources');
            cleanupAll();

            // Force garbage collection if available
            if (window.gc) {
                window.gc();
            }
        };

        // Listen for memory pressure events (if supported)
        if ('memory' in performance) {
            const checkMemory = () => {
                const memInfo = performance.memory;
                const usedRatio = memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit;

                if (usedRatio > 0.6) { // Lower threshold for 512MB RAM limit
                    handleMemoryPressure();
                }
            };

            const memoryCheckInterval = setInterval(checkMemory, 60000); // Check every 60 seconds (reduced frequency)

            return () => clearInterval(memoryCheckInterval);
        }
    }, [cleanupAll]);

    return {
        isVisible,
        isActive,
        createTimer,
        createInterval,
        clearTimer,
        clearInterval: clearManagedInterval,
        addEventListener,
        registerCleanup,
        pauseBackgroundProcesses,
        resumeBackgroundProcesses,
        cleanupAll
    };
};

export default useMobileLifecycle;