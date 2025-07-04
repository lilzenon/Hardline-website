# Social Media Preview Testing Guide

## 🎯 Overview

This guide explains how to properly test and validate social media previews for your events. Social media platforms cache meta tags, so changes require forced cache invalidation to appear.

## ✅ Prerequisites

1. **Public URL Required**: Social platforms only recognize publicly accessible URLs
   - ❌ `localhost:3000` won't work for external validation
   - ✅ `yourdomain.com` or deployed URL required for testing

2. **Proper Image Requirements**:
   - **Recommended Size**: 1200x630px (1.91:1 ratio)
   - **Minimum Size**: 600x315px
   - **Formats**: JPG, PNG, WebP
   - **Max File Size**: 5MB
   - **Hosting**: Must be publicly accessible via HTTPS

## 🛠️ How to Test Social Media Previews

### Step 1: Configure Your Event
1. Navigate to **Dashboard > Events > [Your Event] > Edit**
2. Scroll to **"Sharing & Social Media"** tab
3. Enable **"Custom Social Previews"** toggle
4. Fill out the universal fields:
   - **Title**: 30-60 characters (optimal for all platforms)
   - **Description**: 55-200 characters (optimal for all platforms)
   - **Image URL**: 1200x630px image hosted publicly

### Step 2: Save and Test
1. Click **"Save Event"** to persist your changes
2. Click **"Test Social Previews"** button
3. The system will generate platform-specific debugger links

### Step 3: Force Cache Invalidation
Use the generated debugger links to force each platform to refresh:

#### Facebook/WhatsApp/Messenger
- Click the **Facebook Debugger** link
- Paste your event URL: `https://yourdomain.com/event/your-event-slug`
- Click **"Debug"** or **"Scrape Again"**
- Verify the preview shows your custom title, description, and image

#### Twitter/X
- Click the **Twitter Debugger** link  
- Paste your event URL
- Click **"Preview Card"**
- Verify the large image card displays correctly

#### LinkedIn
- Click the **LinkedIn Debugger** link
- Paste your event URL
- Click **"Inspect"**
- Verify professional preview formatting

## 🔧 Platform-Specific Requirements

### Facebook/WhatsApp
- **Title**: 30-60 characters
- **Description**: 55-200 characters  
- **Image**: 1200x630px minimum
- **Cache**: Updates within 5-10 minutes after debugging

### Twitter/X
- **Card Type**: `summary_large_image`
- **Title**: Up to 70 characters
- **Description**: Up to 200 characters
- **Image**: 1200x630px for large image cards
- **Cache**: Updates immediately after validation

### LinkedIn
- **Title**: 25-150 characters
- **Description**: 100-200 characters
- **Image**: 1200x627px recommended
- **Cache**: Updates within 5-10 minutes

### iMessage (iOS)
- Uses Open Graph tags automatically
- **Title**: Shorter titles work better (30-50 characters)
- **Image**: 1200x630px
- **Cache**: Updates when iOS refreshes link previews

## 🚨 Common Issues & Solutions

### Issue: "Changes not showing up"
**Solution**: 
1. Ensure you've saved the event first
2. Use the debugger tools to force cache refresh
3. Wait 5-10 minutes for changes to propagate
4. Clear your browser cache and test again

### Issue: "Image not displaying"
**Solutions**:
- Verify image URL is publicly accessible (test in incognito browser)
- Ensure image is HTTPS (not HTTP)
- Check image dimensions (minimum 600x315px)
- Verify file size is under 5MB
- Use JPG or PNG format (avoid GIF for static images)

### Issue: "Localhost URLs don't work"
**Solution**: 
- Deploy to a public domain for testing
- Use ngrok or similar tunneling service for temporary testing
- Social platforms cannot access localhost URLs

### Issue: "Title/Description cut off"
**Solutions**:
- Keep titles under 60 characters for optimal display
- Keep descriptions under 200 characters
- Test across multiple platforms as limits vary
- Use the character counters in the admin interface

## 📊 Validation Tools

### Official Platform Debuggers
- **Facebook**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: https://www.linkedin.com/post-inspector/
- **Pinterest**: https://developers.pinterest.com/tools/url-debugger/

### Third-Party Tools
- **OpenGraph.xyz**: https://www.opengraph.xyz/
- **Social Share Preview**: Various online tools available

## 🎯 Best Practices

1. **Design for Mobile**: Most social sharing happens on mobile devices
2. **High Contrast**: Ensure text is readable on the image background
3. **Brand Consistency**: Use consistent styling across all events
4. **Test Early**: Validate previews before major announcements
5. **Monitor Performance**: Track click-through rates from social platforms

## 🔄 Workflow Summary

1. **Create/Edit Event** → Configure social preview fields
2. **Save Event** → Persist changes to database  
3. **Test Previews** → Use built-in debugging tool
4. **Force Refresh** → Use platform debuggers to invalidate cache
5. **Verify Results** → Check previews across platforms
6. **Monitor Performance** → Track engagement metrics

## 📞 Support

If you encounter issues not covered in this guide:
1. Check the browser console for JavaScript errors
2. Verify all URLs are publicly accessible
3. Ensure images meet size and format requirements
4. Contact support with specific error messages and screenshots
