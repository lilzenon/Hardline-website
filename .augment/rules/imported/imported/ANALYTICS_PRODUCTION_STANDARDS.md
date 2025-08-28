---
type: "agent_requested"
---

# ANALYTICS PRODUCTION STANDARDS & IMPLEMENTATION RULES

This document defines mandatory standards for production-ready analytics implementation in the BOUNCE2BOUNCE platform. All analytics-related development must adhere to these rules.

## **🔒 SECURITY REQUIREMENTS (PRIORITY 1)**

### **Rule 1.1: API Authentication**
- **MANDATORY**: All analytics endpoints MUST implement API key authentication
- **IMPLEMENTATION**: Use `x-api-key` header validation for all `/api/analytics/*` routes
- **EXCEPTION**: Public tracking endpoints may use rate limiting instead of API keys
- **VALIDATION**: API keys must be validated against database or environment variables

### **Rule 1.2: Enhanced Rate Limiting**
- **MANDATORY**: Implement tiered rate limiting based on endpoint sensitivity
- **ANALYTICS ENDPOINTS**: Maximum 100 requests per 15 minutes per IP
- **DASHBOARD ENDPOINTS**: Maximum 500 requests per 15 minutes per authenticated user
- **TRACKING ENDPOINTS**: Maximum 1000 requests per 15 minutes per IP
- **IMPLEMENTATION**: Use express-rate-limit with Redis backing store

### **Rule 1.3: Secure Cross-Domain Sessions**
- **MANDATORY**: Use HttpOnly cookies with SameSite=None; Secure attributes
- **DOMAIN SCOPE**: Set cookie domain to `.b2b.click` for subdomain sharing
- **SESSION VALIDATION**: All analytics requests must validate session server-side
- **EXPIRATION**: Sessions expire after 24 hours of inactivity

### **Rule 1.4: Data Encryption**
- **MANDATORY**: Encrypt sensitive analytics data at rest
- **FIELDS TO ENCRYPT**: IP addresses, user agents, location data
- **METHOD**: Use AES-256-GCM encryption with rotating keys
- **KEY MANAGEMENT**: Store encryption keys in secure environment variables

## **⚡ PERFORMANCE REQUIREMENTS (PRIORITY 2)**

### **Rule 2.1: Database Query Optimization**
- **MANDATORY**: All analytics queries must complete within 100ms
- **INDEXING**: Create composite indexes for user_id + timestamp queries
- **SINGLE QUERIES**: Avoid N+1 query patterns, use JOINs for related data
- **MONITORING**: Log and alert on queries exceeding 100ms threshold

### **Rule 2.2: Intelligent Caching Strategy**
- **REAL-TIME METRICS**: 30-second TTL with high priority
- **HOURLY AGGREGATES**: 5-minute TTL with medium priority
- **DAILY SUMMARIES**: 1-hour TTL with low priority
- **HISTORICAL DATA**: 24-hour TTL with low priority
- **CACHE INVALIDATION**: Implement smart invalidation on data updates

### **Rule 2.3: Connection Pooling**
- **DATABASE POOL**: Minimum 5, Maximum 20 connections
- **REDIS POOL**: Minimum 2, Maximum 10 connections
- **TIMEOUT SETTINGS**: 25-second query timeout, 30-second statement timeout
- **MONITORING**: Track connection usage and pool exhaustion

## **📊 DATA QUALITY REQUIREMENTS (PRIORITY 2)**

### **Rule 3.1: Input Validation**
- **MANDATORY**: Validate all analytics data before database insertion
- **REQUIRED FIELDS**: sessionId, userId, timestamp must be present
- **DATA TYPES**: Enforce strict type checking for all numeric fields
- **SANITIZATION**: Sanitize all text fields to prevent XSS/injection

### **Rule 3.2: Data Accuracy**
- **SESSION DEDUPLICATION**: Prevent duplicate session creation
- **TIMESTAMP VALIDATION**: Ensure timestamps are within reasonable bounds
- **GEOGRAPHIC VALIDATION**: Validate country codes against ISO standards
- **ERROR HANDLING**: Log validation failures without crashing

### **Rule 3.3: Real-Time Capabilities**
- **ADAPTIVE HEARTBEAT**: Adjust frequency based on user activity
- **ACTIVE USERS**: 30-second heartbeat interval
- **IDLE USERS**: 5-minute heartbeat interval
- **BACKGROUND TABS**: 15-minute heartbeat interval

## **📈 MONITORING REQUIREMENTS (PRIORITY 3)**

### **Rule 4.1: Error Tracking**
- **MANDATORY**: Implement comprehensive error logging for all analytics operations
- **ERROR THRESHOLD**: Alert when error rate exceeds 5%
- **PERFORMANCE THRESHOLD**: Alert when response time exceeds 1 second
- **INTEGRATION**: Use structured logging with correlation IDs

### **Rule 4.2: Data Quality Monitoring**
- **VALIDATION CHECKS**: Monitor data completeness and accuracy
- **ANOMALY DETECTION**: Alert on unusual traffic patterns
- **HEALTH CHECKS**: Automated endpoint health monitoring
- **DASHBOARD METRICS**: Track dashboard load times and error rates

### **Rule 4.3: Performance Monitoring**
- **DATABASE METRICS**: Query performance, connection usage, slow queries
- **CACHE METRICS**: Hit rates, eviction rates, memory usage
- **API METRICS**: Response times, throughput, error rates
- **ALERTING**: Real-time alerts for performance degradation

## **🔄 DATA GOVERNANCE REQUIREMENTS (PRIORITY 3)**

### **Rule 5.1: Data Retention**
- **ACTIVE DATA**: Keep 1 year of detailed analytics data
- **ARCHIVED DATA**: Compress and archive data older than 1 year
- **DELETION POLICY**: Delete data older than 2 years
- **AUTOMATION**: Implement automated cleanup jobs

### **Rule 5.2: Backup Strategy**
- **FREQUENCY**: Daily automated backups of analytics tables
- **RETENTION**: Keep 30 days of daily backups, 12 months of weekly backups
- **TESTING**: Monthly backup restoration tests
- **STORAGE**: Encrypted backup storage with geographic redundancy

### **Rule 5.3: GDPR Compliance**
- **CONSENT TRACKING**: Log all consent grants and revocations
- **DATA EXPORT**: Provide user data export within 30 days
- **DATA DELETION**: Complete data removal within 30 days of request
- **AUDIT TRAIL**: Maintain audit logs for all privacy-related operations

## **🚀 IMPLEMENTATION PRIORITIES**

### **WEEK 1: CRITICAL SECURITY (MUST COMPLETE)**
1. Implement API key authentication for analytics endpoints
2. Configure tiered rate limiting with Redis backing
3. Secure cross-domain session management
4. Add input validation for all analytics data

### **WEEK 2: PERFORMANCE OPTIMIZATION (MUST COMPLETE)**
1. Optimize database queries with proper indexing
2. Implement intelligent caching strategy
3. Add connection pooling optimization
4. Performance testing under load

### **WEEK 3: MONITORING & ALERTING (SHOULD COMPLETE)**
1. Comprehensive error tracking implementation
2. Performance monitoring setup
3. Data quality monitoring
4. Alert configuration and testing

### **WEEK 4: DATA GOVERNANCE (SHOULD COMPLETE)**
1. Data retention policy implementation
2. Automated backup strategy
3. GDPR compliance verification
4. Documentation and training

## **📋 PRODUCTION DEPLOYMENT GATES**

### **SECURITY GATE (BLOCKING)**
- [ ] API authentication implemented and tested
- [ ] Rate limiting configured and verified
- [ ] HTTPS enforced for all endpoints
- [ ] Security headers validated
- [ ] Penetration testing completed

### **PERFORMANCE GATE (BLOCKING)**
- [ ] All queries under 100ms response time
- [ ] Load testing passed (10,000 concurrent users)
- [ ] Caching strategy implemented
- [ ] Database optimization completed
- [ ] Memory usage within limits

### **MONITORING GATE (NON-BLOCKING)**
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Alerting thresholds set
- [ ] Health checks implemented
- [ ] Documentation completed

## **🎯 SUCCESS METRICS**

### **SECURITY METRICS**
- Zero security vulnerabilities in production
- 100% API authentication coverage
- Rate limiting effectiveness > 99%

### **PERFORMANCE METRICS**
- API response time < 100ms (95th percentile)
- Database query time < 50ms (average)
- Cache hit rate > 90%
- System uptime > 99.9%

### **DATA QUALITY METRICS**
- Data validation success rate > 99%
- Error rate < 1%
- Real-time data accuracy > 95%

## **⚠️ COMPLIANCE REQUIREMENTS**

### **GDPR COMPLIANCE**
- Explicit consent required before tracking
- Data portability within 30 days
- Right to deletion within 30 days
- Privacy by design implementation

### **SECURITY COMPLIANCE**
- Regular security audits (quarterly)
- Vulnerability scanning (weekly)
- Access control reviews (monthly)
- Incident response plan tested (annually)

---

**ENFORCEMENT**: These rules are mandatory for all analytics-related development. Any deviation requires explicit approval from the technical lead and security team.

**REVIEW CYCLE**: These rules will be reviewed and updated quarterly to reflect industry best practices and regulatory changes.

**LAST UPDATED**: 2025-01-19
**NEXT REVIEW**: 2025-04-19

---

## **💻 IMPLEMENTATION CODE STANDARDS**

### **API Authentication Implementation**
```javascript
// MANDATORY: API Key middleware for analytics endpoints
const analyticsAuth = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        return res.status(401).json({ error: 'API key required' });
    }

    const isValid = await validateApiKey(apiKey);
    if (!isValid) {
        return res.status(401).json({ error: 'Invalid API key' });
    }

    req.apiKeyInfo = await getApiKeyInfo(apiKey);
    next();
};

// Apply to all analytics routes
router.use('/api/analytics', analyticsAuth);
```

### **Enhanced Rate Limiting Implementation**
```javascript
// MANDATORY: Tiered rate limiting configuration
const createRateLimiter = (maxRequests, windowMs, message) => {
    return rateLimit({
        windowMs,
        max: maxRequests,
        message: { error: message },
        standardHeaders: true,
        legacyHeaders: false,
        store: new RedisStore({
            client: redisClient,
            prefix: 'rl:'
        })
    });
};

// Apply different limits to different endpoint types
const analyticsLimiter = createRateLimiter(100, 15 * 60 * 1000, 'Analytics rate limit exceeded');
const dashboardLimiter = createRateLimiter(500, 15 * 60 * 1000, 'Dashboard rate limit exceeded');
const trackingLimiter = createRateLimiter(1000, 15 * 60 * 1000, 'Tracking rate limit exceeded');
```

### **Database Query Optimization Standards**
```sql
-- MANDATORY: Create optimized indexes for analytics queries
CREATE INDEX CONCURRENTLY idx_analytics_user_time
ON homepage_page_views (user_id, view_timestamp DESC);

CREATE INDEX CONCURRENTLY idx_analytics_session_time
ON homepage_sessions (user_id, session_start DESC);

CREATE INDEX CONCURRENTLY idx_analytics_events_user
ON events (user_id, created_at DESC);

-- MANDATORY: Single optimized query for dashboard data
CREATE OR REPLACE FUNCTION get_dashboard_analytics(p_user_id INTEGER)
RETURNS TABLE (
    unique_visitors BIGINT,
    total_page_views BIGINT,
    total_events BIGINT,
    most_clicked_link JSON
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(DISTINCT s.session_id)::BIGINT as unique_visitors,
        COUNT(pv.id)::BIGINT as total_page_views,
        COUNT(DISTINCT e.id)::BIGINT as total_events,
        (SELECT row_to_json(link_data) FROM (
            SELECT l.address, l.description, l.visit_count
            FROM links l
            WHERE l.user_id = p_user_id
            ORDER BY l.visit_count DESC
            LIMIT 1
        ) link_data) as most_clicked_link
    FROM homepage_sessions s
    LEFT JOIN homepage_page_views pv ON s.session_id = pv.session_id
    LEFT JOIN events e ON s.user_id = e.user_id
    WHERE s.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;
```

### **Intelligent Caching Implementation**
```javascript
// MANDATORY: Tiered caching strategy
class AnalyticsCache {
    constructor(redisClient) {
        this.redis = redisClient;
        this.cacheConfigs = {
            'realtime': { ttl: 30, priority: 'high' },
            'hourly': { ttl: 300, priority: 'medium' },
            'daily': { ttl: 3600, priority: 'low' },
            'historical': { ttl: 86400, priority: 'low' }
        };
    }

    async get(key, dataType = 'hourly') {
        const config = this.cacheConfigs[dataType];
        const cachedData = await this.redis.get(`analytics:${key}`);

        if (cachedData) {
            return JSON.parse(cachedData);
        }
        return null;
    }

    async set(key, data, dataType = 'hourly') {
        const config = this.cacheConfigs[dataType];
        await this.redis.setex(
            `analytics:${key}`,
            config.ttl,
            JSON.stringify(data)
        );
    }

    async invalidate(pattern) {
        const keys = await this.redis.keys(`analytics:${pattern}*`);
        if (keys.length > 0) {
            await this.redis.del(...keys);
        }
    }
}
```

### **Data Validation Standards**
```javascript
// MANDATORY: Input validation for all analytics data
const validateAnalyticsData = (data) => {
    const schema = {
        sessionId: { type: 'string', required: true, minLength: 10 },
        userId: { type: 'number', required: true, min: 1 },
        timestamp: { type: 'string', required: true },
        eventType: { type: 'string', required: true, enum: ['page_view', 'click', 'session_start'] },
        url: { type: 'string', required: false, maxLength: 2048 },
        referrer: { type: 'string', required: false, maxLength: 2048 },
        userAgent: { type: 'string', required: false, maxLength: 512 }
    };

    const errors = [];

    for (const [field, rules] of Object.entries(schema)) {
        const value = data[field];

        if (rules.required && (value === undefined || value === null)) {
            errors.push(`${field} is required`);
            continue;
        }

        if (value !== undefined && value !== null) {
            if (rules.type === 'string' && typeof value !== 'string') {
                errors.push(`${field} must be a string`);
            }
            if (rules.type === 'number' && typeof value !== 'number') {
                errors.push(`${field} must be a number`);
            }
            if (rules.minLength && value.length < rules.minLength) {
                errors.push(`${field} must be at least ${rules.minLength} characters`);
            }
            if (rules.maxLength && value.length > rules.maxLength) {
                errors.push(`${field} must be at most ${rules.maxLength} characters`);
            }
            if (rules.enum && !rules.enum.includes(value)) {
                errors.push(`${field} must be one of: ${rules.enum.join(', ')}`);
            }
        }
    }

    if (errors.length > 0) {
        throw new ValidationError(`Validation failed: ${errors.join(', ')}`);
    }

    return true;
};
```

### **Error Monitoring Implementation**
```javascript
// MANDATORY: Comprehensive error tracking
class AnalyticsMonitor {
    constructor() {
        this.errorThreshold = 0.05; // 5%
        this.responseTimeThreshold = 1000; // 1 second
        this.errorCounts = new Map();
        this.requestCounts = new Map();
    }

    trackError(operation, error, context = {}) {
        const timestamp = new Date().toISOString();
        const errorData = {
            operation,
            error: error.message,
            stack: error.stack,
            context,
            timestamp
        };

        console.error('Analytics Error:', errorData);

        // Update error counts
        const currentCount = this.errorCounts.get(operation) || 0;
        this.errorCounts.set(operation, currentCount + 1);

        // Check error rate
        this.checkErrorRate(operation);

        // Send to external monitoring (implement based on your monitoring service)
        this.sendToMonitoring(errorData);
    }

    trackPerformance(operation, duration, context = {}) {
        if (duration > this.responseTimeThreshold) {
            this.alertSlowOperation(operation, duration, context);
        }

        // Log performance metrics
        console.log(`Analytics Performance [${operation}]: ${duration}ms`, context);
    }

    checkErrorRate(operation) {
        const errors = this.errorCounts.get(operation) || 0;
        const requests = this.requestCounts.get(operation) || 0;

        if (requests > 100 && (errors / requests) > this.errorThreshold) {
            this.alertHighErrorRate(operation, errors, requests);
        }
    }

    alertSlowOperation(operation, duration, context) {
        console.warn(`SLOW ANALYTICS OPERATION: ${operation} took ${duration}ms`, context);
        // Implement alerting logic (email, Slack, etc.)
    }

    alertHighErrorRate(operation, errors, requests) {
        const rate = ((errors / requests) * 100).toFixed(2);
        console.error(`HIGH ERROR RATE: ${operation} has ${rate}% error rate (${errors}/${requests})`);
        // Implement alerting logic
    }
}
```
