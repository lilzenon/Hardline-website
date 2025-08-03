/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./server/views/**/*.hbs",
        "./server/**/*.js",
        "./static/**/*.js",
        "./static/**/*.html",
        "./custom/views/**/*.hbs",
        "./custom/**/*.js",
        "./src/react/**/*.{js,jsx}",
        "./src/react/**/*.html",
        "./test-tailwind.html"
    ],
    safelist: [
        // Common utility classes used in the dashboard
        'h-full', 'bg-gray-50', 'font-sans', 'antialiased',
        'fixed', 'inset-0', 'z-40', 'bg-black', 'bg-opacity-50', 'hidden', 'lg:hidden',
        'inset-y-0', 'left-0', 'z-50', 'w-64', 'bg-white', 'shadow-xl', 'transform', '-translate-x-full',
        'transition-transform', 'duration-300', 'ease-in-out',
        'flex', 'items-center', 'justify-between', 'h-16', 'px-4', 'border-b', 'border-gray-200',
        'ml-2', 'text-xl', 'font-bold', 'text-gray-900',
        'p-2', 'rounded-md', 'text-gray-400', 'hover:text-gray-500', 'hover:bg-gray-100', 'touch-target',
        'h-6', 'w-6', 'fill-none', 'stroke-currentColor',
        'mt-5', 'px-2', 'space-y-1', 'group', 'py-2', 'text-base', 'font-medium',
        'text-gray-600', 'hover:bg-gray-50', 'hover:text-gray-900', 'bg-gray-100',
        'mr-4', 'text-gray-500', 'text-gray-400', 'group-hover:text-gray-500',
        'lg:flex', 'lg:w-64', 'lg:flex-col', 'lg:fixed',
        'flex-col', 'flex-grow', 'pt-5', 'pb-4', 'overflow-y-auto', 'custom-scrollbar',
        'flex-shrink-0', 'h-8', 'w-auto',
        'flex-1', 'space-x-1', 'text-sm',
        'border-t', 'p-4', 'w-full', 'block',
        'ml-3', 'text-red-600', 'group-hover:text-red-500',
        'lg:pl-64', 'sticky', 'top-0', 'z-10', 'shadow',
        'border-r', 'focus:outline-none', 'focus:ring-2', 'focus:ring-inset', 'focus:ring-primary-500',
        'sr-only', 'justify-between', 'md:ml-6',
        'relative', 'max-w-xs', 'rounded-full', 'focus:ring-offset-2',
        'rounded-full', 'bg-primary-500', 'justify-center',
        'font-medium', 'text-white',
        'lg:flex-shrink-0', 'w-full',
        'sm:px-6', 'lg:px-8', 'text-2xl',
        'bg-primary-600', 'hover:bg-primary-700', 'px-4', 'py-2', 'text-sm', 'mr-4', 'transition-colors', 'duration-200',
        'main', 'relative', 'focus:outline-none', 'py-6', 'max-w-7xl', 'mx-auto',
        'mb-4', 'bg-green-50', 'border', 'border-green-200', 'text-green-700', 'px-4', 'py-3', 'rounded-md',
        'bg-red-50', 'border-red-200', 'text-red-700',
        'h-5', 'w-5', 'text-green-400', 'text-red-400'
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eff6ff',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    900: '#1e3a8a'
                }
            },
            fontFamily: {
                'inter': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                'clash': ['ClashGrotesk-Variable', 'Clash Grotesk', 'Inter', 'system-ui', 'sans-serif'],
                'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
            }
        }
    },
    plugins: []
}