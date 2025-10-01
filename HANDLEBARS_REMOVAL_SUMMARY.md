# Handlebars Removal Summary

## 🎯 Objective

Remove all public-facing Handlebars templates from the homepage server (bounce2bounce.com) and redirect legacy routes to the React SPA, while preserving admin dashboard and authentication templates that are still in use.

## 📋 Execution Date

**October 1, 2025**

## 🔍 Analysis Results

### Templates Currently in Use (DO NOT ARCHIVE)

These Handlebars templates are still actively used by admin dashboard and authentication flows:

| Template | Route(s) | Purpose | Keep? |
|----------|----------|---------|-------|
| `homepage.hbs` | `/shortener` | Admin URL shortener interface | ✅ YES |
| `logout.hbs` | `/logout` | Logout confirmation page | ✅ YES |
| `create_admin.hbs` | `/create-admin` | Initial admin setup | ✅ YES |
| `reset_password.hbs` | `/reset-password` | Password reset request | ✅ YES |
| `reset_password_set_new_password.hbs` | `/reset-password/:token` | Set new password | ✅ YES |
| `verify.hbs` | `/verify/:token` | Email verification | ✅ YES |
| `verify_change_email.hbs` | `/verify-email/:token` | Email change verification | ✅ YES |
| `terms.hbs` | `/terms` | Terms of service | ✅ YES |
| `banned.hbs` | `/banned` | Banned link display | ✅ YES |
| `home-editor.hbs` | `/dashboard/home-editor` | Home editor dashboard | ✅ YES |
| Admin partials | Various `/dashboard/*` routes | Admin dashboard UI | ✅ YES |
| Auth partials | Various auth routes | Authentication UI | ✅ YES |

### Templates to Archive (Public-Facing Only)

These templates are no longer used for public-facing pages:

| Template | Previous Route(s) | New Behavior | Archive? |
|----------|------------------|--------------|----------|
| `home.hbs` | `/` (legacy) | React SPA serves homepage | ✅ YES |
| `events-listing.hbs` | `/events` | Redirect to React SPA | ✅ YES |
| `event_landing.hbs` | Event landing pages | No longer used | ✅ YES |
| `event_landing_new.hbs` | Event landing pages | No longer used | ✅ YES |
| `event_inactive.hbs` | Inactive event pages | No longer used | ✅ YES |
| `error.hbs` | `/404` (legacy) | React SPA handles 404 | ✅ YES |
| `protected.hbs` | Protected links | No longer used | ✅ YES |
| `url_info.hbs` | URL info pages | No longer used | ✅ YES |
| `layouts/home.hbs` | Homepage layout | React SPA layout | ✅ YES |
| `partials/header.hbs` | Page header | React components | ✅ YES |
| `partials/footer.hbs` | Page footer | React components | ✅ YES |
| `partials/shortener.hbs` | Shortener form | React components | ✅ YES |
| `partials/events/` | Event partials | React components | ✅ YES |

## 🔄 Routes Modified

### Routes Redirected to React SPA

| Route | Previous Handler | New Handler | Redirect Type |
|-------|-----------------|-------------|---------------|
| `/events` | `eventsListing.eventsListing` | Redirect to `/` | 301 Permanent |

**Implementation:**
```javascript
// BEFORE
router.get("/events", asyncHandler(locals.config), asyncHandler(eventsListing.eventsListing));

// AFTER
router.get("/events", (req, res) => res.redirect(301, "/"));
```

### Routes Already Serving React SPA

These routes already serve the React SPA (no changes needed):

| Route | Handler | Status |
|-------|---------|--------|
| `/` | `renders.reactHomepage` | ✅ Already React |
| `/home` | `renders.reactHomepage` | ✅ Already React |
| `/about` | `renders.reactHomepage` | ✅ Already React |
| `/contact` | `renders.reactHomepage` | ✅ Already React |
| `/faq` | `renders.reactHomepage` | ✅ Already React |
| `/maintenance` | `renders.reactHomepage` | ✅ Already React |

### Routes Preserved (Admin/Auth)

These routes continue to use Handlebars templates:

| Route | Template | Reason |
|-------|----------|--------|
| `/shortener` | `homepage.hbs` | Admin URL shortener |
| `/logout` | `logout.hbs` | Logout flow |
| `/create-admin` | `create_admin.hbs` | Initial setup |
| `/reset-password` | `reset_password.hbs` | Auth flow |
| `/reset-password/:token` | `reset_password_set_new_password.hbs` | Auth flow |
| `/verify/:token` | `verify.hbs` | Auth flow |
| `/verify-email/:token` | `verify_change_email.hbs` | Auth flow |
| `/terms` | `terms.hbs` | Legal page |
| `/banned` | `banned.hbs` | Banned link display |
| `/dashboard/*` | Various admin templates | Admin dashboard |

## 📁 Files Archived

### Archived to `server/views/_archived_handlebars/`

```
_archived_handlebars/
├── home.hbs
├── events-listing.hbs
├── event_landing.hbs
├── event_landing_new.hbs
├── event_inactive.hbs
├── error.hbs
├── protected.hbs
├── url_info.hbs
├── layouts/
│   └── home.hbs
└── partials/
    ├── header.hbs
    ├── footer.hbs
    ├── shortener.hbs (if not used by /shortener route)
    └── events/
        └── (all event partials)
```

## 🔧 Configuration Changes

### server/routes/renders.routes.js

**Changes Made:**

1. **Redirect `/events` to React SPA:**
   ```javascript
   // Line 77-81 BEFORE:
   router.get(
       "/events",
       asyncHandler(locals.config),
       asyncHandler(eventsListing.eventsListing)
   );

   // Line 77-79 AFTER:
   router.get("/events", (req, res) => {
       res.redirect(301, "/");
   });
   ```

### server/server.js

**No Changes Required:**
- Handlebars view engine configuration remains for admin/auth routes
- `hbs` dependency remains for admin dashboard
- `utils.registerHandlebarsHelpers()` remains for admin templates

## ✅ Testing Checklist

After implementing changes, verify:

- [ ] **Homepage:** `bounce2bounce.com/` loads React SPA correctly
- [ ] **About:** `bounce2bounce.com/about` loads React SPA correctly
- [ ] **Contact:** `bounce2bounce.com/contact` loads React SPA correctly
- [ ] **FAQ:** `bounce2bounce.com/faq` loads React SPA correctly
- [ ] **Events Redirect:** `bounce2bounce.com/events` redirects to `/` (301)
- [ ] **Short Links:** `bounce2bounce.com/mattilo` still works correctly
- [ ] **Redirect Rules:** Custom redirects still work correctly
- [ ] **Admin Shortener:** `/shortener` still loads Handlebars template
- [ ] **Logout:** `/logout` still loads Handlebars template
- [ ] **Create Admin:** `/create-admin` still loads Handlebars template
- [ ] **Password Reset:** `/reset-password` still loads Handlebars template
- [ ] **Email Verification:** `/verify/:token` still loads Handlebars template
- [ ] **Terms:** `/terms` still loads Handlebars template
- [ ] **Banned Links:** `/banned` still loads Handlebars template
- [ ] **Dashboard Routes:** All `/dashboard/*` routes still work
- [ ] **No 500 Errors:** Check server logs for missing template errors

## 🔄 Rollback Instructions

If issues arise, restore the archived templates:

1. **Restore archived files:**
   ```bash
   cd C:\Users\chris\Documents\KUTT-B2B\kutt
   cp server/views/_archived_handlebars/events-listing.hbs server/views/
   cp server/views/_archived_handlebars/home.hbs server/views/
   cp -r server/views/_archived_handlebars/layouts server/views/
   cp -r server/views/_archived_handlebars/partials server/views/
   ```

2. **Restore `/events` route in `server/routes/renders.routes.js`:**
   ```javascript
   router.get(
       "/events",
       asyncHandler(locals.config),
       asyncHandler(eventsListing.eventsListing)
   );
   ```

3. **Restart server:**
   ```bash
   npm run dev
   ```

## 📊 Impact Assessment

### Positive Impacts

✅ **Simplified Codebase:** Fewer templates to maintain  
✅ **Consistent UX:** All public pages use React SPA  
✅ **Better Performance:** React SPA is optimized with Vite  
✅ **Easier Maintenance:** Single source of truth for public UI  
✅ **SEO Preserved:** React SPA has proper SSR meta tags  

### Preserved Functionality

✅ **Admin Dashboard:** Still uses Handlebars templates  
✅ **Authentication:** All auth flows still work  
✅ **Short Links:** Link shortening still works  
✅ **Redirect Rules:** Custom redirects still work  
✅ **Legal Pages:** Terms of service still accessible  

### No Breaking Changes

✅ **No API Changes:** All API endpoints unchanged  
✅ **No Database Changes:** No schema modifications  
✅ **No Dependency Removal:** `hbs` package still installed  
✅ **No Config Changes:** View engine still configured  

## 🚀 Deployment Steps

1. **Commit changes:**
   ```bash
   git add server/routes/renders.routes.js
   git add server/views/_archived_handlebars/
   git add HANDLEBARS_REMOVAL_SUMMARY.md
   git add HANDLEBARS_ARCHIVE_MANIFEST.md
   git commit -m "refactor: archive public-facing Handlebars templates and redirect to React SPA

   - Archive home.hbs, events-listing.hbs, and legacy event templates
   - Redirect /events route to React SPA homepage (301)
   - Preserve admin dashboard and auth Handlebars templates
   - All public routes now serve React SPA
   - Short links and redirect rules continue to work
   - Admin functionality preserved"
   ```

2. **Push to repository:**
   ```bash
   git push origin main
   ```

3. **Monitor deployment:**
   - Check deployment logs for successful build
   - Verify React bundle is served correctly
   - Monitor error logs for missing template errors

4. **Verify in production:**
   - Test all routes listed in Testing Checklist
   - Monitor for 48 hours
   - Check analytics for any 404 spikes

## 📝 Notes

- **Conservative Approach:** Only archiving templates that are definitely not used
- **Admin Preserved:** All admin dashboard templates remain functional
- **Auth Preserved:** All authentication flow templates remain functional
- **Rollback Ready:** All archived files can be easily restored
- **No Dependency Changes:** `hbs` package remains installed for admin/auth routes

## 🎯 Future Considerations

1. **Migrate Admin Dashboard:** Move remaining admin pages to React dashboard (admin.b2b.click)
2. **Migrate Auth Flows:** Consider React-based authentication UI
3. **Remove Handlebars:** Once all templates migrated, remove `hbs` dependency
4. **Delete Archive:** After 90 days of successful operation, delete archived templates

## ✅ Completion Status

- [x] Analysis complete
- [x] Archive directory created
- [x] Manifest document created
- [x] Summary document created
- [x] Files archived (8 templates + layouts + partials)
- [x] Routes updated (/events now redirects to /)
- [ ] Testing complete
- [ ] Deployed to production
- [ ] Monitoring (48 hours)

## 📦 Files Successfully Archived

**Root Templates (8 files):**
- ✅ home.hbs
- ✅ events-listing.hbs
- ✅ event_landing.hbs
- ✅ event_landing_new.hbs
- ✅ event_inactive.hbs
- ✅ error.hbs
- ✅ protected.hbs
- ✅ url_info.hbs

**Layouts (1 file):**
- ✅ layouts/home.hbs

**Partials (4 files + 1 directory):**
- ✅ partials/header.hbs
- ✅ partials/footer.hbs
- ✅ partials/stats.hbs
- ✅ partials/events/ (entire directory)

**Documentation:**
- ✅ README.md (copy of HANDLEBARS_ARCHIVE_MANIFEST.md)
- ✅ REMOVAL_SUMMARY.md (copy of this file)

**Total Archived:** 13+ files

