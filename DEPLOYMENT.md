# 🚀 Deployment Guide

## Automated Production File Management

This project now includes automated systems to ensure production files are always included in git commits.

### 🔧 Quick Commands

```bash
# Build and automatically commit production files
npm run build:commit

# Build everything and prepare for deployment
npm run deploy:prep

# Manual build (if needed)
npm run build
```

### 📦 Critical Production Files

These files **MUST** be included in every deployment:

- `static/react/bundle.js` - Main React application bundle
- `static/react/index.html` - React app entry point
- `static/react/*.chunk.js` - Code-split chunks
- `build-info.json` - Build metadata and version info

### 🛡️ Automated Safeguards

#### Pre-Push Hook
- Automatically checks for missing production files before push
- Warns if React source files changed but bundle wasn't updated
- Prevents accidental deployment of outdated bundles

#### Build & Commit Script
- Builds React bundle with latest changes
- Automatically commits production files
- Generates descriptive commit messages with build info

### 📋 Deployment Checklist

#### Before Making Changes:
- [ ] Pull latest changes: `git pull origin main`
- [ ] Install dependencies: `npm install`

#### During Development:
- [ ] Make your React/frontend changes
- [ ] Test locally: `npm run dev`
- [ ] Verify changes work as expected

#### Before Committing:
- [ ] Run build: `npm run build:commit`
- [ ] Verify bundle.js was updated
- [ ] Check git status shows production files staged

#### Deployment Process:
1. **Commit source changes:**
   ```bash
   git add src/react/
   git commit -m "feat: your feature description"
   ```

2. **Build and commit production files:**
   ```bash
   npm run build:commit
   ```

3. **Push to production:**
   ```bash
   git push origin main
   ```

### 🔍 Verification Commands

```bash
# Check if production files are up to date
git status

# Verify bundle contains latest changes
ls -la static/react/bundle.js

# Check recent commits include production files
git log --oneline -5

# Verify build info is current
cat build-info.json
```

### ⚠️ Troubleshooting

#### Bundle Not Updating?
```bash
cd src/react
npm run build
cd ../..
git add static/react/bundle.js build-info.json
git commit -m "build: Update production bundle"
```

#### Pre-push Hook Warnings?
- Run `npm run build:commit` to update production files
- Or manually build and commit as shown above

#### Missing Production Files?
- Check `.gitignore` doesn't exclude production files
- Verify build process completed successfully
- Ensure all chunks and assets are committed

### 🎯 Best Practices

1. **Always use `npm run build:commit`** after React changes
2. **Never manually edit bundle.js** - it's auto-generated
3. **Include production files in same commit** as source changes when possible
4. **Verify deployment** on staging before production
5. **Monitor build-info.json** for version tracking

### 📊 File Size Monitoring

Keep an eye on bundle sizes:
- `bundle.js` should be ~287KB (minified)
- Chunk files should be ~5KB each
- Significant size changes may indicate issues

### 🔄 Automated Workflows

The system automatically:
- ✅ Builds React bundle when source changes
- ✅ Updates build-info.json with timestamps
- ✅ Commits production files with descriptive messages
- ✅ Warns about missing or outdated files
- ✅ Prevents incomplete deployments
