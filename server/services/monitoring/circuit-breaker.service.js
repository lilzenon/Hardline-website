const EventEmitter = require('events');

class CircuitBreakerService extends EventEmitter {
    constructor(options = {}) {
        super();
        
        // Circuit breaker configuration
        this.failureThreshold = options.failureThreshold || 5;
        this.recoveryTimeout = options.recoveryTimeout || 30000; // 30 seconds
        this.monitoringPeriod = options.monitoringPeriod || 60000; // 1 minute
        
        // Circuit breaker states
        this.states = {
            CLOSED: 'CLOSED',     // Normal operation
            OPEN: 'OPEN',         // Circuit is open, failing fast
            HALF_OPEN: 'HALF_OPEN' // Testing if service has recovered
        };
        
        // Circuit breakers for different services
        this.circuits = {
            database: {
                state: this.states.CLOSED,
                failures: 0,
                lastFailureTime: null,
                successCount: 0,
                totalRequests: 0
            },
            redis: {
                state: this.states.CLOSED,
                failures: 0,
                lastFailureTime: null,
                successCount: 0,
                totalRequests: 0
            },
            analytics: {
                state: this.states.CLOSED,
                failures: 0,
                lastFailureTime: null,
                successCount: 0,
                totalRequests: 0
            }
        };
        
        // Start monitoring
        this.startMonitoring();
    }

    /**
     * Execute operation with circuit breaker protection
     */
    async execute(circuitName, operation, fallback = null) {
        const circuit = this.circuits[circuitName];
        if (!circuit) {
            throw new Error(`Unknown circuit: ${circuitName}`);
        }

        circuit.totalRequests++;

        // Check if circuit is open
        if (circuit.state === this.states.OPEN) {
            if (this.shouldAttemptReset(circuit)) {
                circuit.state = this.states.HALF_OPEN;
                console.log(`🔄 Circuit ${circuitName} moved to HALF_OPEN state`);
            } else {
                console.warn(`⚡ Circuit ${circuitName} is OPEN - failing fast`);
                if (fallback) {
                    return await fallback();
                }
                throw new Error(`Circuit ${circuitName} is open`);
            }
        }

        try {
            const result = await operation();
            this.onSuccess(circuitName);
            return result;
        } catch (error) {
            this.onFailure(circuitName, error);
            
            if (fallback) {
                console.log(`🔄 Using fallback for ${circuitName}`);
                return await fallback();
            }
            
            throw error;
        }
    }

    /**
     * Handle successful operation
     */
    onSuccess(circuitName) {
        const circuit = this.circuits[circuitName];
        circuit.successCount++;
        
        if (circuit.state === this.states.HALF_OPEN) {
            circuit.state = this.states.CLOSED;
            circuit.failures = 0;
            console.log(`✅ Circuit ${circuitName} recovered - moved to CLOSED state`);
            this.emit('circuitClosed', circuitName);
        }
    }

    /**
     * Handle failed operation
     */
    onFailure(circuitName, error) {
        const circuit = this.circuits[circuitName];
        circuit.failures++;
        circuit.lastFailureTime = Date.now();
        
        console.error(`🚨 Circuit ${circuitName} failure ${circuit.failures}/${this.failureThreshold}:`, error.message);
        
        if (circuit.failures >= this.failureThreshold) {
            circuit.state = this.states.OPEN;
            console.error(`⚡ Circuit ${circuitName} OPENED due to ${circuit.failures} failures`);
            this.emit('circuitOpened', circuitName, error);
        }
    }

    /**
     * Check if circuit should attempt reset
     */
    shouldAttemptReset(circuit) {
        return Date.now() - circuit.lastFailureTime > this.recoveryTimeout;
    }

    /**
     * Get circuit status
     */
    getStatus(circuitName = null) {
        if (circuitName) {
            return this.circuits[circuitName];
        }
        return this.circuits;
    }

    /**
     * Reset circuit manually
     */
    reset(circuitName) {
        const circuit = this.circuits[circuitName];
        if (circuit) {
            circuit.state = this.states.CLOSED;
            circuit.failures = 0;
            circuit.lastFailureTime = null;
            console.log(`🔄 Circuit ${circuitName} manually reset`);
            this.emit('circuitReset', circuitName);
        }
    }

    /**
     * Start monitoring and reporting
     */
    startMonitoring() {
        setInterval(() => {
            this.reportStatus();
            this.resetCounters();
        }, this.monitoringPeriod);
    }

    /**
     * Report circuit breaker status
     */
    reportStatus() {
        const openCircuits = Object.entries(this.circuits)
            .filter(([name, circuit]) => circuit.state === this.states.OPEN)
            .map(([name]) => name);

        if (openCircuits.length > 0) {
            console.warn(`⚡ Open circuits: ${openCircuits.join(', ')}`);
        }

        // Log metrics for each circuit
        Object.entries(this.circuits).forEach(([name, circuit]) => {
            const successRate = circuit.totalRequests > 0 
                ? ((circuit.successCount / circuit.totalRequests) * 100).toFixed(2)
                : 100;
            
            console.log(`📊 Circuit ${name}: ${circuit.state}, Success Rate: ${successRate}%, Failures: ${circuit.failures}`);
        });
    }

    /**
     * Reset counters for next monitoring period
     */
    resetCounters() {
        Object.values(this.circuits).forEach(circuit => {
            circuit.successCount = 0;
            circuit.totalRequests = 0;
        });
    }

    /**
     * Database-specific circuit breaker wrapper
     */
    async executeDatabase(operation, fallback = null) {
        return this.execute('database', operation, fallback);
    }

    /**
     * Redis-specific circuit breaker wrapper
     */
    async executeRedis(operation, fallback = null) {
        return this.execute('redis', operation, fallback);
    }

    /**
     * Analytics-specific circuit breaker wrapper
     */
    async executeAnalytics(operation, fallback = null) {
        return this.execute('analytics', operation, fallback);
    }

    /**
     * Health check for all circuits
     */
    healthCheck() {
        const health = {
            status: 'healthy',
            circuits: {},
            openCircuits: []
        };

        Object.entries(this.circuits).forEach(([name, circuit]) => {
            health.circuits[name] = {
                state: circuit.state,
                failures: circuit.failures,
                lastFailureTime: circuit.lastFailureTime
            };

            if (circuit.state === this.states.OPEN) {
                health.openCircuits.push(name);
                health.status = 'degraded';
            }
        });

        if (health.openCircuits.length >= Object.keys(this.circuits).length / 2) {
            health.status = 'critical';
        }

        return health;
    }
}

module.exports = new CircuitBreakerService();
