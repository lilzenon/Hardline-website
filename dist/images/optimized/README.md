# Optimized Images Directory

This directory contains optimized versions of images for better performance.

## Current Optimizations Needed

### Hero Image (Priority: HIGH - 459.7 KiB savings)
- **Original**: `hero-left-image.png` (2,168.3 KiB)
- **Target**: `hero-left-image.webp` (should be ~1,708 KiB)
- **Savings**: 459.7 KiB (21% reduction)

### How to Optimize

1. **Online Tools** (Recommended):
   - Use https://squoosh.app/ or https://tinypng.com/
   - Upload `static/images/figma-exact/hero-left-image.png`
   - Convert to WebP with 85% quality
   - Save as `hero-left-image.webp` in this directory

2. **Command Line** (if available):
   ```bash
   # Using cwebp (if installed)
   cwebp -q 85 ../figma-exact/hero-left-image.png -o hero-left-image.webp
   
   # Using ImageMagick (if installed)
   magick ../figma-exact/hero-left-image.png -quality 85 hero-left-image.webp
   ```

3. **Photoshop/GIMP**:
   - Open the original PNG
   - Export as WebP with 85% quality
   - Save in this directory

## Expected Results

Once optimized:
- ✅ **1,976 KiB total savings** across all images
- ✅ **Faster page load times**
- ✅ **Better Core Web Vitals scores**
- ✅ **Improved Pingdom performance**

## File Structure

```
static/images/optimized/
├── hero-left-image.webp          # Main hero image (WebP)
├── hero-left-image-640w.webp     # Responsive 640px width
├── hero-left-image-768w.webp     # Responsive 768px width
├── hero-left-image-1024w.webp    # Responsive 1024px width
├── hero-right-video.webp         # Right hero image
└── manifest.json                 # Optimization manifest
```

## Implementation Status

- ✅ **Image optimization middleware**: Active
- ✅ **WebP fallback system**: Implemented
- ✅ **Responsive image serving**: Ready
- ⏳ **WebP files**: Need manual creation
- ⏳ **Testing**: Pending WebP creation

## Performance Impact

The image optimization system is already implemented and will automatically:

1. **Detect browser support** for WebP/AVIF
2. **Serve optimized images** when available
3. **Fallback to original** if optimized version missing
4. **Cache images** for 1 year with immutable headers
5. **Provide responsive sizing** with srcset support

Once the WebP files are created, the performance improvements will be immediate and significant.
