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
    background: 'rgba(22, 22, 22, 0.8)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(56, 56, 56, 0.3)',
    borderRadius: '16px',
    overflow: 'hidden',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  skeletonImage: {
    width: '100%',
    paddingBottom: '100%',
    background: 'linear-gradient(90deg, rgba(40,40,40,0.5) 25%, rgba(60,60,60,0.5) 50%, rgba(40,40,40,0.5) 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  },
  skeletonContent: {
    padding: '16px',
  },
  skeletonTitle: {
    height: '20px',
    width: '70%',
    background: 'rgba(60, 60, 60, 0.5)',
    borderRadius: '4px',
    marginBottom: '8px',
  },
  skeletonPrice: {
    height: '24px',
    width: '40%',
    background: 'rgba(60, 60, 60, 0.5)',
    borderRadius: '4px',
    marginBottom: '12px',
  },
  skeletonButton: {
    height: '44px',
    width: '100%',
    background: 'rgba(60, 60, 60, 0.5)',
    borderRadius: '8px',
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
    grid-template-columns: 1fr;
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

