# Dome Gallery Component Documentation

## Overview

The Dome Gallery is a custom 3D carousel component inspired by React Bits, featuring a cylindrical arrangement of images that can be rotated through mouse drag, touch gestures, or automatic rotation. It follows our glassmorphism design system and is fully responsive.

## Features

- **3D Cylindrical Layout**: Images arranged in a dome/cylinder formation with CSS 3D transforms
- **Interactive Controls**: Mouse drag and touch gesture support for rotation
- **Auto-Rotation**: Optional automatic rotation with configurable speed
- **Responsive Design**: Adapts to mobile, tablet, and desktop viewports
- **Glassmorphism Styling**: Consistent with our design system
- **Accessibility**: Keyboard navigation and ARIA labels
- **Performance Optimized**: Image preloading and React optimization techniques

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Array` | `[]` | Array of image objects |
| `radius` | `number` | `300` | Radius of the dome cylinder in pixels |
| `itemWidth` | `number` | `200` | Width of each gallery item in pixels |
| `itemHeight` | `number` | `300` | Height of each gallery item in pixels |
| `autoRotate` | `boolean` | `false` | Enable automatic rotation |
| `autoRotateSpeed` | `number` | `20` | Speed of auto-rotation in seconds per full rotation |
| `enableMouseControl` | `boolean` | `true` | Enable mouse drag to rotate |
| `enableTouchControl` | `boolean` | `true` | Enable touch gestures |
| `perspective` | `string` | `'1000px'` | CSS perspective value for 3D effect |

## Item Object Structure

Each item in the `items` array should have the following structure:

```javascript
{
  id: string,           // Unique identifier
  img: string,          // Image URL
  url?: string,         // Optional link URL (opens in new tab when clicked)
  title?: string,       // Optional title text
  description?: string  // Optional description text
}
```

## Usage Examples

### Basic Usage

```jsx
import DomeGallery from './ui/DomeGallery';

const galleryItems = [
  {
    id: "1",
    img: "https://example.com/image1.jpg",
    url: "https://example.com/link1",
    title: "Image Title",
    description: "Image description"
  },
  // ... more items
];

<DomeGallery items={galleryItems} />
```

### Advanced Configuration

```jsx
<DomeGallery
  items={galleryItems}
  radius={400}
  itemWidth={250}
  itemHeight={350}
  autoRotate={true}
  autoRotateSpeed={30}
  enableMouseControl={true}
  enableTouchControl={true}
  perspective="1200px"
/>
```

### Mobile Optimized

```jsx
<DomeGallery
  items={galleryItems}
  radius={200}
  itemWidth={160}
  itemHeight={240}
  autoRotate={true}
  autoRotateSpeed={25}
  perspective="800px"
/>
```

## Responsive Behavior

The component automatically adjusts its dimensions based on viewport size:

- **Mobile (≤767px)**: 60% of specified dimensions
- **Tablet (≤1023px)**: 80% of specified dimensions  
- **Desktop (>1023px)**: Full specified dimensions

## Styling

The component uses our established design system:

- **Background**: `rgba(22, 22, 22, 0.8)` with glassmorphism blur
- **Border**: `rgba(56, 56, 56, 0.3)`
- **Border Radius**: `16px`
- **Font**: Inter family
- **Accent Color**: `#319DFF` for active indicators
- **Shadow**: `0 8px 32px rgba(0, 0, 0, 0.3)`

## Accessibility Features

- **ARIA Labels**: Navigation indicators have descriptive labels
- **Keyboard Navigation**: Click indicators to navigate
- **Screen Reader Support**: Proper semantic structure
- **Touch Friendly**: 44px minimum touch targets on mobile

## Performance Optimizations

- **Image Preloading**: All images are preloaded before display
- **React Optimization**: Uses `useMemo`, `useCallback`, and proper dependency arrays
- **GPU Acceleration**: CSS 3D transforms for smooth animations
- **Throttled Events**: Optimized mouse and touch event handling

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **CSS 3D Transforms**: Required for 3D effects
- **Touch Events**: For mobile gesture support
- **Backdrop Filter**: For glassmorphism effects

## Integration Notes

### Replacing Masonry Component

When replacing the existing Masonry component:

1. Update imports:
   ```jsx
   // Old
   import Masonry from './ui/Masonry';
   
   // New
   import DomeGallery from './ui/DomeGallery';
   ```

2. Update component usage:
   ```jsx
   // Old
   <Masonry
     items={items}
     ease="power3.out"
     duration={0.6}
     // ... other props
   />
   
   // New
   <DomeGallery
     items={items}
     radius={320}
     itemWidth={220}
     itemHeight={320}
     autoRotate={true}
     // ... other props
   />
   ```

3. Update item structure (remove `height` property, add `title` and `description` if needed)

### Container Requirements

The component should be placed in a container with:
- Sufficient height (recommended: 400px+ for mobile, 600px+ for desktop)
- Proper overflow handling
- Adequate horizontal space for the dome radius

## Troubleshooting

### Common Issues

1. **Images not loading**: Check image URLs and CORS policies
2. **3D effects not working**: Ensure browser supports CSS 3D transforms
3. **Touch gestures not responding**: Check `touch-action` CSS property on parent elements
4. **Performance issues**: Reduce number of items or image sizes

### Debug Mode

Add console logging to track component state:

```jsx
// Add to component for debugging
console.log('Dome Gallery State:', {
  rotation,
  selectedIndex,
  imagesLoaded,
  itemPositions: itemPositions.length
});
```

## Future Enhancements

Potential improvements for future versions:

- **Vertical Dome**: Support for vertical cylinder arrangement
- **Custom Animations**: Configurable transition easing and duration
- **Lazy Loading**: Load images as they come into view
- **Zoom Feature**: Click to zoom into selected image
- **Fullscreen Mode**: Expand gallery to fullscreen view
- **Keyboard Controls**: Arrow key navigation support

## Dependencies

- **React**: ^18.0.0
- **react-use**: For media queries and responsive behavior

## File Structure

```
src/react/components/ui/
├── DomeGallery.jsx     # Main component
├── DomeGallery.md      # This documentation
└── ...
```

## Related Components

- **Masonry**: Previous gallery component (being replaced)
- **SocialMediaButtons**: Uses similar responsive patterns
- **MobileNavigation**: Similar touch gesture handling
