/**
 * Memory Monitoring Utility for Production Optimization
 * Tracks memory usage and provides alerts for 512MB RAM limit
 */

interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
  usedPercentage: number;
  timestamp: number;
}

interface MemoryAlert {
  level: 'info' | 'warning' | 'critical';
  message: string;
  memoryInfo: MemoryInfo;
}

class MemoryMonitor {
  private isEnabled: boolean = false;
  private monitoringInterval: number | null = null;
  private alertCallbacks: ((alert: MemoryAlert) => void)[] = [];
  private memoryHistory: MemoryInfo[] = [];
  private maxHistorySize: number = 50; // Keep last 50 readings

  // Memory thresholds for 512MB RAM limit
  private readonly THRESHOLDS = {
    WARNING: 0.6,  // 60% - Start warning
    CRITICAL: 0.8, // 80% - Critical alert
    EMERGENCY: 0.9 // 90% - Emergency cleanup
  };

  constructor() {
    this.isEnabled = 'memory' in performance && typeof (performance as any).memory !== 'undefined';
    
    if (!this.isEnabled) {
      console.warn('⚠️ Memory monitoring not available in this browser');
    }
  }

  /**
   * Start memory monitoring
   */
  start(intervalMs: number = 30000): void {
    if (!this.isEnabled) return;

    if (this.monitoringInterval) {
      this.stop();
    }

    this.monitoringInterval = window.setInterval(() => {
      this.checkMemory();
    }, intervalMs);

    console.log('📊 Memory monitoring started');
  }

  /**
   * Stop memory monitoring
   */
  stop(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
      console.log('📊 Memory monitoring stopped');
    }
  }

  /**
   * Get current memory information
   */
  getCurrentMemoryInfo(): MemoryInfo | null {
    if (!this.isEnabled) return null;

    const memory = (performance as any).memory;
    const usedPercentage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;

    return {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      usedPercentage,
      timestamp: Date.now()
    };
  }

  /**
   * Check memory and trigger alerts if needed
   */
  private checkMemory(): void {
    const memoryInfo = this.getCurrentMemoryInfo();
    if (!memoryInfo) return;

    // Add to history
    this.memoryHistory.push(memoryInfo);
    if (this.memoryHistory.length > this.maxHistorySize) {
      this.memoryHistory.shift();
    }

    // Check thresholds and trigger alerts
    if (memoryInfo.usedPercentage >= this.THRESHOLDS.EMERGENCY) {
      this.triggerAlert('critical', 'EMERGENCY: Memory usage at 90%+ - immediate cleanup required', memoryInfo);
      this.emergencyCleanup();
    } else if (memoryInfo.usedPercentage >= this.THRESHOLDS.CRITICAL) {
      this.triggerAlert('critical', 'CRITICAL: Memory usage at 80%+ - cleanup recommended', memoryInfo);
    } else if (memoryInfo.usedPercentage >= this.THRESHOLDS.WARNING) {
      this.triggerAlert('warning', 'WARNING: Memory usage at 60%+ - monitor closely', memoryInfo);
    }
  }

  /**
   * Trigger memory alert
   */
  private triggerAlert(level: MemoryAlert['level'], message: string, memoryInfo: MemoryInfo): void {
    const alert: MemoryAlert = { level, message, memoryInfo };
    
    // Log to console
    const logMethod = level === 'critical' ? 'error' : level === 'warning' ? 'warn' : 'info';
    console[logMethod](`🧠 Memory Alert [${level.toUpperCase()}]: ${message}`, {
      usedMB: Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024),
      limitMB: Math.round(memoryInfo.jsHeapSizeLimit / 1024 / 1024),
      percentage: Math.round(memoryInfo.usedPercentage * 100)
    });

    // Notify callbacks
    this.alertCallbacks.forEach(callback => {
      try {
        callback(alert);
      } catch (error) {
        console.error('Memory alert callback error:', error);
      }
    });

    // Track in analytics if available
    if (window.analyticsBeacon && window.analyticsBeacon.isEnabled()) {
      window.analyticsBeacon.sendEvent({
        event: 'memory_alert',
        properties: {
          level,
          used_mb: Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024),
          limit_mb: Math.round(memoryInfo.jsHeapSizeLimit / 1024 / 1024),
          percentage: Math.round(memoryInfo.usedPercentage * 100)
        }
      });
    }
  }

  /**
   * Emergency memory cleanup
   */
  private emergencyCleanup(): void {
    console.warn('🚨 Emergency memory cleanup initiated');

    // Force garbage collection if available
    if (window.gc) {
      try {
        window.gc();
        console.log('🗑️ Forced garbage collection completed');
      } catch (error) {
        console.warn('Failed to force garbage collection:', error);
      }
    }

    // Clear any large caches
    if (window.caches) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          if (cacheName.includes('dynamic') || cacheName.includes('temp')) {
            caches.delete(cacheName);
            console.log(`🗑️ Cleared cache: ${cacheName}`);
          }
        });
      });
    }

    // Notify mobile lifecycle for cleanup
    if (window.mobileLifecycle && window.mobileLifecycle.cleanupAll) {
      window.mobileLifecycle.cleanupAll();
    }
  }

  /**
   * Add alert callback
   */
  onAlert(callback: (alert: MemoryAlert) => void): void {
    this.alertCallbacks.push(callback);
  }

  /**
   * Remove alert callback
   */
  offAlert(callback: (alert: MemoryAlert) => void): void {
    const index = this.alertCallbacks.indexOf(callback);
    if (index > -1) {
      this.alertCallbacks.splice(index, 1);
    }
  }

  /**
   * Get memory usage summary
   */
  getSummary(): string {
    const current = this.getCurrentMemoryInfo();
    if (!current) return 'Memory monitoring not available';

    const usedMB = Math.round(current.usedJSHeapSize / 1024 / 1024);
    const limitMB = Math.round(current.jsHeapSizeLimit / 1024 / 1024);
    const percentage = Math.round(current.usedPercentage * 100);

    return `Memory: ${usedMB}MB / ${limitMB}MB (${percentage}%)`;
  }

  /**
   * Get memory history for analysis
   */
  getHistory(): MemoryInfo[] {
    return [...this.memoryHistory];
  }
}

// Create global instance
const memoryMonitor = new MemoryMonitor();

// Auto-start in production
if (process.env.NODE_ENV === 'production') {
  memoryMonitor.start(60000); // Check every minute in production
} else {
  memoryMonitor.start(30000); // Check every 30 seconds in development
}

// Make available globally
(window as any).memoryMonitor = memoryMonitor;

export default memoryMonitor;
