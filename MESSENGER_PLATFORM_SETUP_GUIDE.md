# Messenger Platform Setup Guide for Instagram Messaging

## 🎯 **CURRENT STATUS ANALYSIS**

Based on Meta App Dashboard screenshots (App ID: 2364553920613507):

### ✅ **Correctly Configured:**
- App ID: 2364553920613507
- App Type: Business
- Messenger Platform: Added
- Instagram Messaging: Added
- Facebook Login for Business: Configured

### ❌ **Issues to Fix:**
1. Instagram webhook URL incorrect
2. Webhook subscriptions need verification
3. Page Access Token generation needed
4. Database corruption needs repair

## 🔧 **STEP-BY-STEP FIX PROCESS**

### **STEP 1: Fix Webhook URLs**

**Current Configuration:**
- Messenger webhook: `https://b2b.click/api/webhooks/messenger` ✅ CORRECT
- Instagram webhook: `https://b2b.click/documents/messenger` ❌ WRONG

**Required Fix:**
Change Instagram webhook URL to: `https://b2b.click/api/webhooks/messenger`

**How to Fix:**
1. Go to Meta App Dashboard → Instagram → Webhooks
2. Change Callback URL to: `https://b2b.click/api/webhooks/messenger`
3. Use same verify token as Messenger Platform

### **STEP 2: Verify Webhook Subscriptions**

**Required Subscriptions for Instagram Messaging:**
- `messages` (for DM events)
- `messaging_postbacks` (for button interactions)
- `message_deliveries` (for delivery confirmations)
- `message_reads` (for read receipts)

**How to Verify:**
1. Check webhook fields in both Messenger and Instagram sections
2. Ensure all messaging-related fields are subscribed
3. Test webhook verification

### **STEP 3: Environment Variables Check**

**Required Environment Variables:**
```
FACEBOOK_APP_ID=2364553920613507
FACEBOOK_APP_SECRET=[Your Facebook App Secret]
FACEBOOK_REDIRECT_URI=https://b2b.click/api/integrations/instagram/callback
MESSENGER_WEBHOOK_VERIFY_TOKEN=[Your verify token]
```

**Critical:** Use FACEBOOK_APP_SECRET (not INSTAGRAM_APP_SECRET) for Messenger Platform

### **STEP 4: Database Repair**

**Fix Corrupted Metadata:**
1. Visit: `https://b2b.click/api/webhooks/instagram/force-fix-metadata`
2. This clears `[object Object]` corruption
3. Prepares for fresh reconnection

### **STEP 5: Reconnect Instagram with Correct Permissions**

**OAuth Flow:**
1. Visit: `https://b2b.click/api/integrations/instagram/auth`
2. Grant permissions:
   - `instagram_basic`
   - `instagram_manage_messages`
   - `pages_manage_metadata` (CRITICAL for Page Access Tokens)
   - `pages_messaging` (CRITICAL for Messenger Platform)
3. This will generate Page Access Tokens

### **STEP 6: Verify Complete Setup**

**Readiness Check:**
1. Visit: `https://b2b.click/api/webhooks/instagram/readiness-check`
2. Should show: "✅ READY FOR INSTAGRAM MESSAGING VIA MESSENGER PLATFORM"

**Test DM Sending:**
1. Visit: `https://b2b.click/api/webhooks/instagram/test-dm?recipient_id=17841402340165773&message=Test`
2. Should work without "(#3) Application does not have capability" error

## 🔍 **WEBHOOK SIGNATURE VERIFICATION**

**Current Issue:** Signature mismatch
**Root Cause:** Using wrong app secret

**Fix Applied:**
- Updated code to use FACEBOOK_APP_SECRET for Messenger Platform webhooks
- Added proper signature verification to `/api/webhooks/messenger` endpoint

## 📊 **EXPECTED RESULTS**

After completing all steps:

1. **Webhook Verification:** ✅ Success
2. **Signature Verification:** ✅ Success  
3. **Page Access Tokens:** ✅ Stored correctly
4. **Database Metadata:** ✅ Valid JSON
5. **Instagram DM Sending:** ✅ Working
6. **Readiness Check:** ✅ 5/5 passed

## 🚨 **CRITICAL NEXT ACTIONS**

1. **Fix Instagram webhook URL** in Meta App Dashboard
2. **Run database repair** endpoint
3. **Reconnect Instagram** with new permissions
4. **Test complete flow**

## 📞 **SUPPORT ENDPOINTS**

- Database repair: `/api/webhooks/instagram/force-fix-metadata`
- Readiness check: `/api/webhooks/instagram/readiness-check`
- OAuth reconnect: `/api/integrations/instagram/auth`
- DM test: `/api/webhooks/instagram/test-dm`
