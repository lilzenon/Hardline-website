/**
 * PostCSS Configuration for Production Optimization
 * Optimizes CSS for minimal bundle size and maximum performance
 */

const plugins = [
  require('tailwindcss'),
  require('autoprefixer')
];

// Add production optimizations
if (process.env.NODE_ENV === 'production') {
  plugins.push(
    require('cssnano')({
      preset: 'default'
    })
  );
}

module.exports = {
  plugins: plugins
};
