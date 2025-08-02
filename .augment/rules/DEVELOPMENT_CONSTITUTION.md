---
type: "manual"
---

# KUTT B2B Development Constitution
## Comprehensive Rules for AI-Driven Development

### **Meta-Rules & Core Directives**

1. **Security First Principle**: Every decision must prioritize security over convenience. If a feature compromises security, it must be redesigned or rejected and you must inform me that you are doing so that I know the direction you are taking.

2. **User Privacy is Sacred**: User data is treated as highly sensitive. All PII must be encrypted, access must be audited, and GDPR/CCPA compliance is mandatory.

3. **Performance is Non-Negotiable**: The application must remain fast and responsive. Any change that degrades performance by >10% requires optimization before implementation.

4. **Code Quality Over Speed**: Write secure, maintainable code rather than rushing features. Technical debt is a security and performance liability. When I want to push for a complete feature you must finish it with this in mind. 

5. **Documentation is Code**: Every security feature, API endpoint, and database change must be thoroughly documented with examples and security implications.

---

## **Section 1: Security Architecture Rules**

### **1.1 Database Security (CRITICAL)**

**User Information Database:**
- [ ] **NEVER** store PII in plaintext - all sensitive fields MUST use AES-256 encryption
- [ ] **ALWAYS** use SHA-256 hashing for searchable fields (email_hash, phone_hash)
- [ ] **REQUIRE** access reasons for all data access operations (minimum 10 characters)
- [ ] **ENFORCE** row-level security (RLS) policies on all sensitive tables
- [ ] **LOG** every database operation with user context, IP, and business justification
- [ ] **VALIDATE** all inputs using secure functions before database insertion
- [ ] **IMPLEMENT** GDPR compliance features: consent tracking, lawful basis, right to be forgotten

**Main Application Database:**
- [ ] **OPTIMIZE** for performance while maintaining security
- [ ] **REMOVE** duplicate indexes to improve write performance
- [ ] **ADD** composite indexes for frequently queried patterns
- [ ] **PARTITION** large tables (visits, events) by time for scalability
- [ ] **MONITOR** query performance and cache hit rates continuously

### **1.2 API Security**

- [ ] **AUTHENTICATE** all API requests with JWT tokens in HttpOnly cookies
- [ ] **VALIDATE** all inputs using express-validator with strict rules
- [ ] **SANITIZE** all user inputs to prevent XSS and injection attacks
- [ ] **RATE LIMIT** sensitive endpoints (50 req/15min for PII access, 100 req/15min for general)
- [ ] **AUDIT** all API calls with security context and access reasons
- [ ] **ENCRYPT** API responses containing sensitive data
- [ ] **IMPLEMENT** CORS policies with specific allowed origins

### **1.3 Frontend Security**

- [ ] **PURIFY** all user-generated content with DOMPurify before rendering
- [ ] **VALIDATE** all form inputs on both client and server side
- [ ] **MASK** sensitive data in UI (show only last 4 digits of phone, partial email)
- [ ] **IMPLEMENT** CSP headers to prevent script injection
- [ ] **USE** HTTPS for all communications in production
- [ ] **STORE** no sensitive data in localStorage or sessionStorage

---

## **Section 2: Performance & Scalability Rules**

### **2.1 Database Performance**

- [ ] **LIMIT** file size to 500 LOC maximum - refactor if exceeded
- [ ] **INDEX** all foreign keys, WHERE clauses, JOIN conditions, ORDER BY fields
- [ ] **AVOID** N+1 queries - use proper JOINs or batch operations
- [ ] **CACHE** frequently accessed data with Redis (session data, user preferences)
- [ ] **PARTITION** tables when they exceed 1M rows or 10GB size
- [ ] **MONITOR** slow queries (>100ms) and optimize immediately

### **2.2 Frontend Performance**

- [ ] **OPTIMIZE** images: 85% quality for heroes, 80% for cards, responsive variants (1x, 2x, 3x)
- [ ] **IMPLEMENT** lazy loading for images and components below the fold
- [ ] **USE** React.memo(), useMemo(), useCallback() for expensive operations
- [ ] **CODE SPLIT** routes and heavy components
- [ ] **MINIMIZE** bundle size - analyze and remove unused dependencies
- [ ] **PREFETCH** critical resources and next likely user actions

### **2.3 Server Performance**

- [ ] **USE** connection pooling for database connections (max 20 connections)
- [ ] **IMPLEMENT** response compression (gzip/brotli)
- [ ] **CACHE** static assets with proper cache headers
- [ ] **MONITOR** memory usage and prevent memory leaks
- [ ] **OPTIMIZE** API response times (<200ms for 95% of requests)

---

## **Section 3: User Experience & Design Rules**

### **3.1 Design System Consistency**

- [ ] **FOLLOW** 8px grid system for all spacing and sizing
- [ ] **USE** glassmorphism styling: backdrop-filter, transparency, shadows
- [ ] **MAINTAIN** black background with grey glassmorphism cards
- [ ] **IMPLEMENT** iOS-style frosty transparent effects for depth
- [ ] **ENSURE** 44px minimum touch targets for mobile accessibility
- [ ] **PRESERVE** existing margins and spacing when redesigning

### **3.2 Responsive Design**

- [ ] **DESIGN** mobile-first (320px-767px), then tablet (768px-1023px), then desktop (1024px+)
- [ ] **USE** side-by-side layouts at 1024px+ breakpoints
- [ ] **CENTER** all content using margin: 0 auto, flexbox, or CSS Grid
- [ ] **SCALE** proportionally like browser zoom using CSS transform or viewport units
- [ ] **TEST** on actual devices, not just browser dev tools

### **3.3 Navigation & Interaction**

- [ ] **IMPLEMENT** hamburger menus that transform to X icons with full-screen overlay
- [ ] **CREATE** dynamic navigation that shrinks/grows on scroll
- [ ] **USE** icon-only buttons with color-coded states (red=delete, green=success)
- [ ] **ADD** proper aria-labels for accessibility
- [ ] **ANIMATE** hover states with color changes (200-300ms duration)
- [ ] **RESPECT** prefers-reduced-motion for accessibility

### **3.4 Forms & Input Elements**

- [ ] **USE** iOS-style toggle switches instead of checkboxes
- [ ] **IMPLEMENT** international phone inputs with country codes AND names
- [ ] **ADD** real-time validation and auto-formatting
- [ ] **SHOW** different states: normal, focused, submitting, success, error
- [ ] **PROVIDE** clear error messages and success feedback
- [ ] **SUPPORT** keyboard navigation and screen readers

---

## **Section 4: Development Workflow Rules**

### **4.1 Code Quality Standards**

- [ ] **FORMAT** all Python code with black and sort imports with isort
- [ ] **ADD** type hints to all function signatures
- [ ] **WRITE** Google-style docstrings for all public functions and classes
- [ ] **INCLUDE** example usage in docstrings for utility functions
- [ ] **REMOVE** commented-out code, unused imports, and dead code before committing

### **4.2 Testing Requirements**

- [ ] **WRITE** unit tests for all security functions
- [ ] **TEST** input validation and sanitization thoroughly
- [ ] **VERIFY** encryption/decryption functions work correctly
- [ ] **CHECK** access control and authorization logic
- [ ] **VALIDATE** API endpoints with various input scenarios
- [ ] **ACHIEVE** >80% code coverage for critical security components

### **4.3 Git & Deployment**

- [ ] **COMMIT** frequently with descriptive messages following conventional commits
- [ ] **INCLUDE** security impact in commit messages
- [ ] **BACKUP** databases before major migrations
- [ ] **TEST** in staging environment before production deployment
- [ ] **MONITOR** application health for 48 hours after deployment
- [ ] **ROLLBACK** immediately if security issues are detected

---

## **Section 5: Compliance & Legal Rules**

### **5.1 GDPR/CCPA Compliance**

- [ ] **OBTAIN** explicit consent before collecting any personal data
- [ ] **DOCUMENT** lawful basis for all data processing activities
- [ ] **IMPLEMENT** right to be forgotten (data deletion) functionality
- [ ] **PROVIDE** data export capabilities for user requests
- [ ] **MAINTAIN** audit logs for all personal data access
- [ ] **ENCRYPT** all personal data at rest and in transit

### **5.2 Data Retention**

- [ ] **SET** automatic deletion dates for all personal data
- [ ] **PURGE** expired data automatically (30-day grace period)
- [ ] **ARCHIVE** old data securely before deletion
- [ ] **DOCUMENT** data retention policies clearly
- [ ] **NOTIFY** users before data deletion (where legally required)

---

## **Section 6: Monitoring & Alerting Rules**

### **6.1 Security Monitoring**

- [ ] **ALERT** on suspicious access patterns (>100 records/hour per user)
- [ ] **MONITOR** failed authentication attempts
- [ ] **TRACK** unusual data access patterns
- [ ] **LOG** all administrative actions with full context
- [ ] **DETECT** potential data breaches automatically
- [ ] **REPORT** security incidents within 72 hours (GDPR requirement)

### **6.2 Performance Monitoring**

- [ ] **TRACK** API response times and alert if >500ms average
- [ ] **MONITOR** database query performance and slow queries
- [ ] **ALERT** on high memory usage (>80%) or CPU usage (>90%)
- [ ] **CHECK** cache hit rates and optimize if <95%
- [ ] **MEASURE** user experience metrics (Core Web Vitals)

---

## **Section 7: Emergency Procedures**

### **7.1 Security Incident Response**

1. **IMMEDIATE**: Isolate affected systems and stop data access
2. **ASSESS**: Determine scope and impact of the incident
3. **CONTAIN**: Prevent further unauthorized access
4. **INVESTIGATE**: Analyze logs and determine root cause
5. **REMEDIATE**: Fix vulnerabilities and restore secure operations
6. **NOTIFY**: Inform affected users and regulatory authorities
7. **DOCUMENT**: Create incident report and lessons learned

### **7.2 Data Breach Protocol**

1. **STOP**: Immediately halt all data processing
2. **SECURE**: Change all passwords and revoke access tokens
3. **ASSESS**: Determine what data was compromised
4. **NOTIFY**: Contact legal team and prepare breach notifications
5. **REMEDIATE**: Fix security vulnerabilities
6. **MONITOR**: Increase security monitoring for 90 days

---

## **Section 8: Validation Checklist**

Before any deployment, verify:

- [ ] **Security**: All PII is encrypted, access is audited, inputs are validated
- [ ] **Performance**: No queries >100ms, cache hit rate >95%, bundle size optimized
- [ ] **Compliance**: GDPR consent obtained, audit logs complete, retention policies active
- [ ] **Testing**: Security tests pass, performance benchmarks met, accessibility verified
- [ ] **Documentation**: Security features documented, API endpoints described, deployment guide updated

---

## **Enforcement Protocol**

**If any rule is violated:**
1. **HALT** development immediately
2. **ASSESS** security and compliance impact
3. **REMEDIATE** the violation before proceeding
4. **DOCUMENT** the incident and prevention measures
5. **UPDATE** rules if necessary to prevent recurrence

**Remember: Security and user privacy are not optional. They are the foundation upon which everything else is built.**
