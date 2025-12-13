/**
 * ProductGrid - Responsive grid layout for product cards
 * 1 column on mobile, 2 on tablet, 3 on desktop
 * 
 * @example
 * <ProductGrid products={products} loading={isLoading} />
 */

import React from 'react';
import ProductCard from './ProductCard';

// Grid styles with responsive breakpoints via CSS-in-JS
const gridStyles = {
  container: {
    display: 'grid',
    gap: '24px',
    width: '100%',
  },
  // Loading skeleton styles
  skeleton: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
    // Removed card background/border for minimalist look
  },
  skeletonImage: {
    width: '100%',
    aspectRatio: '3/4', // Match ProductCard aspect ratio
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '0', // Sharp corners or minimal radius
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  skeletonContent: {
    padding: '0 4px', // Minimal padding
  },
  skeletonTitle: {
    height: '14px',
    width: '70%',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '2px',
    marginBottom: '8px',
  },
  skeletonPrice: {
    height: '14px',
    width: '30%',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '2px',
    marginBottom: '0',
  },
  skeletonButton: {
    display: 'none', // No button in minimalist skeleton
  },
  emptyState: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '48px 24px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'Inter, sans-serif',
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  emptyTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#FFFFFF',
    marginBottom: '8px',
  },
  emptyText: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)',
  },
};

// CSS for animations and responsive grid
// Responsive breakpoints:
// - Mobile (320-767px): 1 column
// - Tablet (768-1023px): 2 columns
// - Desktop (1024-1439px): 3 columns
// - Large Desktop (1440px+): 4 columns
const gridCSS = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  .shop-product-grid {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 12px;
    row-gap: 24px; /* Increased row gap for separation without cards */
  }

  @media (min-width: 768px) {
    .shop-product-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .shop-product-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1440px) {
    .shop-product-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

/**
 * Loading skeleton component
 */
function ProductSkeleton() {
  return (
    <div style={gridStyles.skeleton}>
      <div style={gridStyles.skeletonImage} />
      <div style={gridStyles.skeletonContent}>
        <div style={gridStyles.skeletonTitle} />
        <div style={gridStyles.skeletonPrice} />
        <div style={gridStyles.skeletonButton} />
      </div>
    </div>
  );
}

/**
 * Empty state component
 */
function EmptyState() {
  return (
    <div style={gridStyles.emptyState}>
      <div style={gridStyles.emptyIcon}>🛍️</div>
      <h3 style={gridStyles.emptyTitle}>No products available</h3>
      <p style={gridStyles.emptyText}>Check back soon for new items!</p>
    </div>
  );
}

export default function ProductGrid({ products = [], loading = false, onAddToCart }) {
  return (
    <>
      <style>{gridCSS}</style>
      <div
        className="shop-product-grid"
        style={gridStyles.container}
        role="list"
        aria-label="Products"
      >
        {loading ? (
          // Show 6 skeleton cards while loading
          Array.from({ length: 6 }).map((_, index) => (
            <ProductSkeleton key={`skeleton-${index}`} />
          ))
        ) : products.length === 0 ? (
          <EmptyState />
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))
        )}
      </div>
    </>
  );
}

