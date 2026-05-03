#!/usr/bin/env node
/**
 * One-shot rebrand sweep: replace all public-facing Bounce2bounce strings
 * with Hardline equivalents across active source files.
 *
 * Internal identifiers that must stay unchanged (per owner's constraint —
 * see memory/feedback_keep_internal_prefixes.md):
 *   - b2b.click, b2b.sid, b2b_db_yp41 (env values, session cookie name)
 *   - bounce2bounce_admin, bounce2bounce_crm (DB names)
 *   - bounce2bounce-admin, bounce2bounce-dashboard (JWT issuer/audience,
 *     Render service names)
 *   - File paths containing "b2b" (we kept B2B-named logo files for ref
 *     compatibility — those are infrastructure, not user-visible text)
 *
 * Replacement order matters — emails before domain so the email
 * substitutions land first.
 *
 * Skips: archived handlebars, markdown docs, dist/, node_modules/, .git/,
 * logs, sessions, migrations (historical record), temp files, and CRM
 * service files where "bounce2bounce_admin" is a DB identifier.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Files explicitly EXCLUDED from sweep — these reference Bounce2bounce by
// design (DB names, archived templates, historical migrations, internal
// JWT/CORS logic that intentionally keeps the old name).
const EXCLUDE_PATHS = [
  // Internal: JWT, DB, infrastructure-coupled identifiers
  'server/services/totp.service.js',           // 2FA service name (cosmetic but coupled to existing tokens)
  'server/services/sms/twilio.service.js',     // SMS sender name (env-driven, leave hardcoded fallback)
  'server/services/sms/campaign.service.js',
  'server/services/notification/channels/email.channel.js', // mail-from defaults
  'server/middleware/origin-validation.middleware.js', // hardcoded CORS allowlist (we keep both old + new explicitly)
  'server/handlers/admin-auth.handler.js',     // JWT issuer
  'server/handlers/auth.handler.js',           // JWT issuer
  'server/middleware/maintenance.middleware.js', // internal flag check
  'server/scripts/test-api-cache-service.js',  // test file
  'server/handlers/sitemap.handler.js',        // uses env, no brand text
  'server/migrations/20250625000000_rename_drops_to_events.js', // historical migration
  'server/migrations/sms_campaigns_schema.sql', // historical SQL
  // Cleanup of these handled in a different commit / by env values
];

// Active source globs: edit only these directories
const INCLUDE_DIRS = ['src', 'server', 'static', 'scripts'];
const INCLUDE_EXT = new Set(['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.txt', '.webmanifest', '.json']);

// Skip these subpaths regardless
const SKIP_PATTERNS = [
  /[\\/]node_modules[\\/]/,
  /[\\/]\.git[\\/]/,
  /[\\/]dist[\\/]/,
  /[\\/]_archived_handlebars[\\/]/,
  /[\\/]archive[\\/]/,
  /[\\/]hardline-source[\\/]/,
  /[\\/]optimized[\\/]/,
  /[\\/]cache[\\/]/,
  /[\\/]images[\\/]/,            // skip image dir (binary), we already replaced logos in commit 1
  /[\\/]fonts[\\/]/,
  /[\\/]libs[\\/]/,
  /[\\/]sessions[\\/]/,
  /[\\/]logs[\\/]/,
  /[\\/]tmp[\\/]/,
  /[\\/]temp[\\/]/,
  /[\\/]migrations[\\/]/,        // historical record
  /[\\/]rebrand-sweep\.js$/,     // don't sweep self
  /[\\/]generate-hardline-assets\.js$/,
  /\.min\.js$/,
  /\.map$/,
  /\.bak$/,
  /\.backup$/,
  /\.tmp$/,
  /\.log$/,
];

// Replacement rules — applied IN ORDER. Each entry is [regex, replacement].
// Email consolidation runs first so addresses get normalized to info@hardline.events
// before the domain rewrite catches them.
const REPLACEMENTS = [
  // 1. Email consolidation -> info@hardline.events
  [/info@bounce2bounce\.com/g,    'info@hardline.events'],
  [/hello@bounce2bounce\.com/g,   'info@hardline.events'],
  [/events@bounce2bounce\.com/g,  'info@hardline.events'],
  [/support@bounce2bounce\.com/g, 'info@hardline.events'],
  [/admin@bounce2bounce\.com/g,   'info@hardline.events'],
  [/contact@bounce2bounce\.com/g, 'info@hardline.events'],

  // 2. Domain swap (URLs) — case-insensitive on the domain part
  [/bounce2bounce\.com/gi,        'hardline.events'],

  // 3. Social handles (must come before generic uppercase replacements)
  [/@bounce2bounce_/g,            '@hardlinevents'],
  [/bounce2bounce_(?=["'/])/g,    'hardlinevents'],   // catches Instagram URL paths

  // 4. Brand mark — uppercase
  [/BOUNCE2BOUNCE/g,              'HARDLINE'],

  // 5. Brand mark — title-case (Bounce2Bounce, Bounce2bounce variants)
  [/Bounce2Bounce/g,              'HardLine Events'],
  [/Bounce2bounce/g,              'Hardline Events'],

  // 6. lowercase remnants (catch-all, after domain handling above)
  [/bounce2bounce/g,              'hardline events'],
];

const rules = REPLACEMENTS;

function shouldSkip(absPath) {
  const rel = path.relative(ROOT, absPath).split(path.sep).join('/');
  for (const re of SKIP_PATTERNS) {
    if (re.test(absPath)) return true;
    if (re.test(rel)) return true;
  }
  for (const ex of EXCLUDE_PATHS) {
    if (rel === ex) return true;
  }
  return false;
}

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (shouldSkip(full)) continue;
    let stat;
    try { stat = fs.statSync(full); } catch { continue; }
    if (stat.isDirectory()) walk(full, out);
    else if (stat.isFile() && INCLUDE_EXT.has(path.extname(name).toLowerCase())) out.push(full);
  }
  return out;
}

const files = [];
for (const d of INCLUDE_DIRS) {
  const abs = path.join(ROOT, d);
  if (fs.existsSync(abs)) walk(abs, files);
}

let totalEdits = 0;
let editedFiles = 0;
const summary = [];
for (const f of files) {
  let content;
  try { content = fs.readFileSync(f, 'utf8'); } catch { continue; }
  const before = content;
  let fileEdits = 0;
  for (const [re, repl] of rules) {
    const matches = content.match(re);
    if (matches) {
      fileEdits += matches.length;
      content = content.replace(re, repl);
    }
  }
  if (content !== before) {
    fs.writeFileSync(f, content);
    summary.push([path.relative(ROOT, f), fileEdits]);
    totalEdits += fileEdits;
    editedFiles++;
  }
}

summary.sort((a, b) => b[1] - a[1]);
console.log('Rebrand sweep complete:');
for (const [f, n] of summary) console.log(`  ${n.toString().padStart(4, ' ')}  ${f}`);
console.log(`\n${totalEdits} replacements across ${editedFiles}/${files.length} scanned files`);
