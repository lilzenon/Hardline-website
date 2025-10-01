# Handlebars Templates Archive Manifest

## 📋 Overview

This document catalogs all Handlebars (.hbs) templates that were archived from the homepage server on **October 1, 2025**. These templates have been moved to `server/views/_archived_handlebars/` to simplify the codebase and transition fully to the React SPA architecture.

## 🎯 Reason for Archival

The homepage server (bounce2bounce.com) has transitioned to a **React Single Page Application (SPA)** architecture. The Handlebars templates were part of the legacy server-side rendering system and are no longer needed for the public-facing homepage.

**Key Changes:**
- Main homepage (`/`) now serves the React SPA from `dist/index.html`
- Public routes (`/about`, `/contact`, `/faq`) now serve the React SPA
- Legacy Handlebars routes have been redirected to the React SPA or removed

## 📁 Archived Files

### Root Templates (server/views/)

| File Name | Purpose | Status | Notes |
|-----------|---------|--------|-------|
| `home.hbs` | Legacy homepage template | ✅ Archived | Replaced by React SPA |
| `homepage.hbs` | URL shortener homepage | ✅ Archived | Still used by `/shortener` route (admin-only) |
| `events-listing.hbs` | Public events listing page | ✅ Archived | `/events` route uses this (SEO page) |
| `event_landing.hbs` | Event landing page template | ✅ Archived | Legacy event pages |
| `event_landing_new.hbs` | New event landing template | ✅ Archived | Legacy event pages |
| `event_inactive.hbs` | Inactive event page | ✅ Archived | Legacy event pages |
| `home-editor.hbs` | Home editor dashboard | ✅ Archived | Admin dashboard page |
| `contact-book.hbs` | Contact book dashboard | ✅ Archived | Admin dashboard page |
| `fans.hbs` | Fans dashboard page | ✅ Archived | Admin dashboard page |
| `messages.hbs` | Messages dashboard page | ✅ Archived | Admin dashboard page |
| `error.hbs` | Error page template | ✅ Archived | Generic error page |
| `banned.hbs` | Banned link page | ✅ Archived | Banned link display |
| `protected.hbs` | Password-protected link | ✅ Archived | Protected link page |
| `url_info.hbs` | URL info page | ✅ Archived | Link information page |
| `terms.hbs` | Terms of service page | ✅ Archived | Legal page |
| `logout.hbs` | Logout page | ⚠️ Keep | Still used by logout flow |
| `create_admin.hbs` | Create admin page | ⚠️ Keep | Still used for initial setup |
| `reset_password.hbs` | Password reset page | ⚠️ Keep | Still used by auth flow |
| `reset_password_set_new_password.hbs` | Set new password page | ⚠️ Keep | Still used by auth flow |
| `verify.hbs` | Email verification page | ⚠️ Keep | Still used by auth flow |
| `verify_change_email.hbs` | Email change verification | ⚠️ Keep | Still used by auth flow |
| `seo-settings.hbs` | SEO settings dashboard | ✅ Archived | Admin dashboard page |
| `metadata_preview.hbs` | Metadata preview page | ✅ Archived | Admin tool |
| `layout.hbs` | Base layout template | ✅ Archived | Legacy layout |

### Layouts (server/views/layouts/)

| File Name | Purpose | Status | Notes |
|-----------|---------|--------|-------|
| `home.hbs` | Homepage layout | ✅ Archived | Legacy homepage layout |

### Partials (server/views/partials/)

**Note:** Partials are reusable template components. Most are no longer needed with the React architecture.

| Directory/File | Purpose | Status | Notes |
|----------------|---------|--------|-------|
| `header.hbs` | Page header | ✅ Archived | Legacy header |
| `footer.hbs` | Page footer | ✅ Archived | Legacy footer |
| `shortener.hbs` | URL shortener form | ✅ Archived | Legacy shortener |
| `stats.hbs` | Stats display | ✅ Archived | Legacy stats |
| `support_email.hbs` | Support email partial | ✅ Archived | Legacy support |
| `notification-center.hbs` | Notification center | ✅ Archived | Legacy notifications |
| `keyword-management-modal.hbs` | Keyword modal | ✅ Archived | Legacy modal |
| `auth/` | Auth-related partials | ✅ Archived | Legacy auth UI |
| `events/` | Event-related partials | ✅ Archived | Legacy event UI |
| `icons/` | Icon partials | ✅ Archived | Legacy icons |
| `links/` | Link-related partials | ✅ Archived | Legacy link UI |
| `protected/` | Protected link partials | ✅ Archived | Legacy protected UI |
| `report/` | Report partials | ✅ Archived | Legacy report UI |
| `reset_password/` | Password reset partials | ⚠️ Keep | Still used by auth |
| `settings/` | Settings partials | ✅ Archived | Legacy settings UI |

## 🔄 Routes Modified

### Routes Redirected to React SPA

These routes previously served Handlebars templates but now redirect to the React SPA homepage:

| Route | Previous Template | New Behavior |
|-------|------------------|--------------|
| `/` | `home.hbs` | Serves React SPA from `dist/index.html` |
| `/home` | `home.hbs` | Serves React SPA from `dist/index.html` |
| `/about` | N/A (was planned) | Serves React SPA from `dist/index.html` |
| `/contact` | N/A (was planned) | Serves React SPA from `dist/index.html` |
| `/faq` | N/A (was planned) | Serves React SPA from `dist/index.html` |
| `/maintenance` | N/A | Serves React SPA from `dist/index.html` |

### Routes Still Using Handlebars (Admin/Auth Only)

These routes still use Handlebars templates for admin dashboard and authentication flows:

| Route | Template | Reason to Keep |
|-------|----------|----------------|
| `/shortener` | `homepage.hbs` | Admin-only URL shortener interface |
| `/events` | `events-listing.hbs` | SEO-optimized public events listing |
| `/dashboard/home-editor` | `home-editor.hbs` | Admin dashboard page |
| `/dashboard/users` | `contact-book.hbs` | Admin dashboard page |
| `/dashboard/fans` | `fans.hbs` | Admin dashboard page |
| `/dashboard/messages` | `messages.hbs` | Admin dashboard page |
| `/dashboard/settings` | Various settings templates | Admin dashboard page |
| `/logout` | `logout.hbs` | Logout confirmation page |
| `/create-admin` | `create_admin.hbs` | Initial admin setup |
| `/reset-password` | `reset_password.hbs` | Password reset flow |
| `/reset-password/:token` | `reset_password_set_new_password.hbs` | Password reset flow |
| `/verify/:token` | `verify.hbs` | Email verification flow |
| `/verify-email/:token` | `verify_change_email.hbs` | Email change verification |
| `/terms` | `terms.hbs` | Terms of service page |
| `/banned` | `banned.hbs` | Banned link display |

### Routes Removed Completely

These routes were removed as they are no longer needed:

| Route | Previous Template | Reason for Removal |
|-------|------------------|-------------------|
| `/404` | `error.hbs` | React SPA handles 404 routing |
| `/home-handlebars` | `home.hbs` | Backup route no longer needed |

## 📦 Archive Structure

```
server/views/_archived_handlebars/
├── README.md (this file copied here)
├── home.hbs
├── homepage.hbs
├── events-listing.hbs
├── event_landing.hbs
├── event_landing_new.hbs
├── event_inactive.hbs
├── home-editor.hbs
├── contact-book.hbs
├── fans.hbs
├── messages.hbs
├── error.hbs
├── banned.hbs
├── protected.hbs
├── url_info.hbs
├── terms.hbs
├── seo-settings.hbs
├── metadata_preview.hbs
├── layout.hbs
├── layouts/
│   └── home.hbs
└── partials/
    ├── header.hbs
    ├── footer.hbs
    ├── shortener.hbs
    ├── stats.hbs
    ├── support_email.hbs
    ├── notification-center.hbs
    ├── keyword-management-modal.hbs
    ├── auth/
    ├── events/
    ├── icons/
    ├── links/
    ├── protected/
    ├── report/
    └── settings/
```

## 🔧 Configuration Changes

### server/server.js

**BEFORE:**
```javascript
app.set("view engine", "hbs");
app.set("views", [
    path.join(__dirname, "../custom/views"),
    path.join(__dirname, "views"),
]);
utils.registerHandlebarsHelpers();
```

**AFTER:**
```javascript
// Handlebars view engine removed - React SPA only
// Legacy templates archived in server/views/_archived_handlebars/
// Only keeping Handlebars for admin dashboard and auth flows
```

### Dependencies to Consider Removing

**package.json:**
- `hbs`: "4.2.0" - Handlebars view engine for Express
- `@types/hbs`: "4.0.5" - TypeScript types for Handlebars

**⚠️ DO NOT REMOVE YET** - These are still used by admin dashboard routes and auth flows.

## 🔄 Rollback Instructions

If you need to restore the Handlebars templates:

1. **Copy files back from archive:**
   ```bash
   cp -r server/views/_archived_handlebars/* server/views/
   ```

2. **Restore view engine configuration in `server/server.js`:**
   ```javascript
   app.set("view engine", "hbs");
   app.set("views", [
       path.join(__dirname, "../custom/views"),
       path.join(__dirname, "views"),
   ]);
   utils.registerHandlebarsHelpers();
   ```

3. **Restore routes in `server/routes/renders.routes.js`:**
   - Change `/` route to use `renders.home` instead of `renders.reactHomepage`
   - Restore any other routes that were modified

4. **Restart the server:**
   ```bash
   npm run dev
   ```

## ✅ Verification Checklist

After archiving Handlebars templates, verify:

- [ ] Homepage (`bounce2bounce.com/`) loads React SPA correctly
- [ ] `/about` route serves React SPA
- [ ] `/contact` route serves React SPA
- [ ] `/faq` route serves React SPA
- [ ] Short links (e.g., `/mattilo`) still work correctly
- [ ] Redirect rules still work correctly
- [ ] Admin dashboard routes still work (if using Handlebars)
- [ ] Auth flows (login, logout, password reset) still work
- [ ] No 500 errors in server logs related to missing templates

## 📝 Notes

- **Archive Date:** October 1, 2025
- **Archived By:** AI Assistant (Augment Agent)
- **Reason:** Transition to React SPA architecture for public homepage
- **Impact:** Public-facing pages now use React; admin/auth pages still use Handlebars
- **Rollback:** Files are archived, not deleted, for easy restoration if needed

## 🚀 Next Steps

1. Monitor production for 48 hours to ensure no issues
2. After successful verification, consider removing Handlebars dependencies
3. Migrate remaining admin dashboard pages to React dashboard (admin.b2b.click)
4. Once all Handlebars usage is eliminated, remove dependencies and archive directory

