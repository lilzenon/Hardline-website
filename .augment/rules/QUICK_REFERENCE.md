---
type: "manual"
---

# KUTT B2B Development Quick Reference
## Essential Rules for Every Development Session

### 🚨 **CRITICAL SECURITY RULES**

**Database Security:**
- ✅ **ENCRYPT** all PII with AES-256 (email, phone, names, custom fields)
- ✅ **HASH** searchable fields with SHA-256 (email_hash, phone_hash)
- ✅ **AUDIT** every data access with user context and access reason (min 10 chars)
- ✅ **VALIDATE** all inputs with secure functions before database insertion
- ✅ **ENFORCE** row-level security (RLS) policies on sensitive tables

**API Security:**
- ✅ **AUTHENTICATE** all requests with JWT in HttpOnly cookies
- ✅ **RATE LIMIT** sensitive endpoints (50 req/15min for PII, 100 req/15min general)
- ✅ **SANITIZE** all inputs to prevent XSS and SQL injection
- ✅ **REQUIRE** access reasons for all sensitive data operations

**Frontend Security:**
- ✅ **PURIFY** user content with DOMPurify before rendering
- ✅ **MASK** sensitive data in UI (last 4 digits, partial email)
- ✅ **VALIDATE** forms on both client and server side

---

### ⚡ **PERFORMANCE RULES**

**Database:**
- ✅ **LIMIT** files to 500 LOC max - refactor if exceeded
- ✅ **INDEX** foreign keys, WHERE clauses, JOIN conditions, ORDER BY fields
- ✅ **AVOID** N+1 queries - use JOINs or batch operations
- ✅ **MONITOR** slow queries (>100ms) and optimize immediately

**Frontend:**
- ✅ **OPTIMIZE** images: 85% quality heroes, 80% cards, responsive variants
- ✅ **USE** React.memo(), useMemo(), useCallback() for expensive operations
- ✅ **LAZY LOAD** images and components below the fold
- ✅ **CODE SPLIT** routes and heavy components

---

### 🎨 **DESIGN SYSTEM RULES**

**Layout & Spacing:**
- ✅ **FOLLOW** 8px grid system for all spacing and sizing
- ✅ **USE** glassmorphism: backdrop-filter, transparency, shadows
- ✅ **MAINTAIN** black background with grey glassmorphism cards
- ✅ **ENSURE** 44px minimum touch targets for mobile

**Responsive Design:**
- ✅ **DESIGN** mobile-first (320px-767px → 768px-1023px → 1024px+)
- ✅ **USE** side-by-side layouts at 1024px+ breakpoints
- ✅ **CENTER** content with margin: 0 auto, flexbox, or CSS Grid
- ✅ **SCALE** proportionally using CSS transform or viewport units

**Navigation & Interaction:**
- ✅ **IMPLEMENT** hamburger → X icon transformation with full-screen overlay
- ✅ **CREATE** dynamic navigation that shrinks/grows on scroll
- ✅ **USE** icon-only buttons with color states (red=delete, green=success)
- ✅ **ADD** aria-labels and respect prefers-reduced-motion

---

### 📋 **COMPLIANCE RULES**

**GDPR/CCPA:**
- ✅ **OBTAIN** explicit consent before collecting personal data
- ✅ **DOCUMENT** lawful basis for all data processing
- ✅ **IMPLEMENT** right to be forgotten functionality
- ✅ **SET** automatic deletion dates for personal data
- ✅ **MAINTAIN** audit logs for all personal data access

---

### 🔧 **CODE QUALITY RULES**

**Python:**
- ✅ **FORMAT** with black and sort imports with isort
- ✅ **ADD** type hints to all function signatures
- ✅ **WRITE** Google-style docstrings with examples
- ✅ **REMOVE** commented code, unused imports, dead code

**Testing:**
- ✅ **WRITE** unit tests for all security functions
- ✅ **TEST** input validation and sanitization
- ✅ **VERIFY** encryption/decryption functions
- ✅ **ACHIEVE** >80% coverage for security components

---

### 🚨 **EMERGENCY PROTOCOLS**

**Security Incident:**
1. **STOP** - Isolate affected systems immediately
2. **ASSESS** - Determine scope and impact
3. **CONTAIN** - Prevent further unauthorized access
4. **INVESTIGATE** - Analyze logs and root cause
5. **REMEDIATE** - Fix vulnerabilities
6. **NOTIFY** - Inform users and authorities
7. **DOCUMENT** - Create incident report

**Data Breach:**
1. **HALT** all data processing immediately
2. **SECURE** - Change passwords, revoke tokens
3. **ASSESS** - Determine compromised data
4. **NOTIFY** - Contact legal team
5. **REMEDIATE** - Fix vulnerabilities
6. **MONITOR** - Increase security for 90 days

---

### ✅ **PRE-DEPLOYMENT CHECKLIST**

**Security:**
- [ ] All PII encrypted with AES-256
- [ ] All data access audited with context
- [ ] All inputs validated and sanitized
- [ ] Rate limiting configured on sensitive endpoints
- [ ] GDPR consent and lawful basis documented

**Performance:**
- [ ] No queries >100ms
- [ ] Cache hit rate >95%
- [ ] Bundle size optimized
- [ ] Images compressed and responsive
- [ ] Core Web Vitals passing

**Compliance:**
- [ ] GDPR consent obtained
- [ ] Audit logs complete
- [ ] Data retention policies active
- [ ] Right to be forgotten implemented
- [ ] Security monitoring enabled

**Testing:**
- [ ] Security tests passing
- [ ] Performance benchmarks met
- [ ] Accessibility verified (WCAG compliance)
- [ ] Cross-browser testing completed
- [ ] Mobile device testing done

---

### 🔗 **Key File Locations**

**Security Implementation:**
- `database/security/` - All secure database schemas and policies
- `server/models/secure-contact.model.js` - Encrypted data access layer
- `server/routes/secure-contacts.routes.js` - Protected API endpoints

**Performance Optimization:**
- `database/migrations/` - Database performance optimizations
- `database/monitoring/` - Performance monitoring tools

**Documentation:**
- `.augment/rules/DEVELOPMENT_CONSTITUTION.md` - Complete development rules
- `.augment/rules/B2B STYLING.md` - UI/UX and workflow rules
- `docs/USER_DATABASE_SECURITY_AUDIT.md` - Security implementation guide

---

### 💡 **Quick Commands**

**Security Testing:**
```bash
npm test -- tests/security/secure-database.test.js
```

**Database Security Deployment:**
```bash
psql -d user_information -f database/security/001_secure_schema_migration.sql
```

**Performance Monitoring:**
```bash
psql -d kutt -f database/monitoring/performance-dashboard.sql
```

**Code Quality:**
```bash
black server/ && isort server/
npm run lint && npm run test
```

---

**Remember: Security and user privacy are not optional. They are the foundation upon which everything else is built.**
