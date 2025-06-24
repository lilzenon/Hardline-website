/**
 * Address Component System
 * Universal maps integration with cross-platform compatibility
 * Handles address display and interactive maps functionality
 */

console.log('🗺️ Address Component system loaded successfully');

class AddressComponent {
    constructor() {
        this.initialized = false;
        this.components = new Map();
        this.init();
    }
    
    init() {
        console.log('🗺️ Initializing Address Component system...');
        
        // Initialize existing address components
        this.initializeExistingComponents();
        
        // Set up mutation observer for dynamic content
        this.setupMutationObserver();
        
        this.initialized = true;
        console.log('✅ Address Component system initialized successfully');
    }
    
    initializeExistingComponents() {
        const addressElements = document.querySelectorAll('.address-component');
        console.log(`🔍 Found ${addressElements.length} existing address components`);
        
        addressElements.forEach(element => {
            this.enhanceAddressElement(element);
        });
    }
    
    setupMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if the added node is an address component
                        if (node.classList && node.classList.contains('address-component')) {
                            this.enhanceAddressElement(node);
                        }
                        
                        // Check for address components within the added node
                        const addressComponents = node.querySelectorAll && node.querySelectorAll('.address-component');
                        if (addressComponents) {
                            addressComponents.forEach(element => {
                                this.enhanceAddressElement(element);
                            });
                        }
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        console.log('👀 Mutation observer set up for dynamic address components');
    }
    
    enhanceAddressElement(element) {
        // Skip if already enhanced
        if (this.components.has(element)) {
            return;
        }
        
        const addressText = element.textContent.trim();
        const coordinates = this.extractCoordinates(element);
        
        if (!addressText && !coordinates) {
            console.warn('⚠️ Address component has no text or coordinates:', element);
            return;
        }
        
        // Store component data
        const componentData = {
            element,
            addressText,
            coordinates,
            enhanced: true
        };
        
        this.components.set(element, componentData);
        
        // Add click handler
        this.addClickHandler(element, componentData);
        
        // Add accessibility attributes
        this.addAccessibilityAttributes(element, addressText);
        
        console.log('✅ Enhanced address component:', addressText);
    }
    
    extractCoordinates(element) {
        // Try to get coordinates from data attributes
        const lat = element.dataset.latitude || element.dataset.lat;
        const lng = element.dataset.longitude || element.dataset.lng;
        
        if (lat && lng) {
            return {
                latitude: parseFloat(lat),
                longitude: parseFloat(lng)
            };
        }
        
        // Try to get coordinates from nearby hidden inputs (from autocomplete system)
        const container = element.closest('.figma-event-info') || element.closest('.carousel-slide');
        if (container) {
            const latInput = container.querySelector('input[name*="latitude"], [id*="latitude"]');
            const lngInput = container.querySelector('input[name*="longitude"], [id*="longitude"]');
            
            if (latInput && lngInput && latInput.value && lngInput.value) {
                return {
                    latitude: parseFloat(latInput.value),
                    longitude: parseFloat(lngInput.value)
                };
            }
        }
        
        return null;
    }
    
    addClickHandler(element, componentData) {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            this.openMaps(componentData);
        });
        
        // Add keyboard support
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.openMaps(componentData);
            }
        });
    }
    
    addAccessibilityAttributes(element, addressText) {
        // Make it focusable and accessible
        element.setAttribute('role', 'button');
        element.setAttribute('tabindex', '0');
        element.setAttribute('aria-label', `Open ${addressText} in maps`);
        
        // Add title for additional context
        element.setAttribute('title', `Click to open ${addressText} in maps`);
    }
    
    openMaps(componentData) {
        const { addressText, coordinates } = componentData;
        
        console.log('🗺️ Opening maps for:', addressText, coordinates);
        
        // Determine the best URL to use
        let mapsUrl;
        
        if (coordinates && coordinates.latitude && coordinates.longitude) {
            // Use coordinates for precise location (most reliable)
            mapsUrl = this.buildCoordinatesMapsUrl(coordinates, addressText);
            console.log('📍 Using coordinates-based maps URL');
        } else if (addressText) {
            // Use address text search
            mapsUrl = this.buildAddressMapsUrl(addressText);
            console.log('📍 Using address-based maps URL');
        } else {
            console.error('❌ No valid address or coordinates available');
            return;
        }
        
        // Open maps with error handling
        this.openMapsUrl(mapsUrl, addressText);
    }
    
    buildCoordinatesMapsUrl(coordinates, addressText = '') {
        const { latitude, longitude } = coordinates;
        
        // Use Google Maps universal URL with coordinates
        // This works across all platforms and provides the most accurate location
        const baseUrl = 'https://www.google.com/maps/search/';
        const params = new URLSearchParams({
            api: '1',
            query: `${latitude},${longitude}`
        });
        
        // Add UTM parameters for analytics (as recommended by Google)
        params.set('utm_source', 'bounce2bounce');
        params.set('utm_campaign', 'address_navigation');
        
        return `${baseUrl}?${params.toString()}`;
    }
    
    buildAddressMapsUrl(addressText) {
        // Use Google Maps universal URL with address search
        // This provides the best cross-platform compatibility
        const baseUrl = 'https://www.google.com/maps/search/';
        const params = new URLSearchParams({
            api: '1',
            query: addressText.trim()
        });
        
        // Add UTM parameters for analytics
        params.set('utm_source', 'bounce2bounce');
        params.set('utm_campaign', 'address_search');
        
        return `${baseUrl}?${params.toString()}`;
    }
    
    openMapsUrl(url, addressText) {
        try {
            // Use window.open for better compatibility and user control
            const mapWindow = window.open(url, '_blank', 'noopener,noreferrer');
            
            if (!mapWindow) {
                // Popup blocked - try direct navigation
                console.warn('⚠️ Popup blocked, trying direct navigation');
                window.location.href = url;
            } else {
                console.log('✅ Maps opened successfully for:', addressText);
            }
        } catch (error) {
            console.error('❌ Failed to open maps:', error);
            
            // Fallback: try direct navigation
            try {
                window.location.href = url;
            } catch (fallbackError) {
                console.error('❌ Fallback navigation also failed:', fallbackError);
                this.showError('Unable to open maps. Please try again.');
            }
        }
    }
    
    showError(message) {
        // Simple error notification - can be enhanced with a proper notification system
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, 'error');
        } else {
            console.error('Maps Error:', message);
            // Fallback to alert for now
            alert(`Maps Error: ${message}`);
        }
    }
    
    // Public method to create address components programmatically
    createAddressComponent(addressText, coordinates = null, options = {}) {
        const element = document.createElement('a');
        element.className = 'address-component';
        element.href = '#';
        
        // Add coordinates as data attributes if provided
        if (coordinates) {
            element.dataset.latitude = coordinates.latitude;
            element.dataset.longitude = coordinates.longitude;
        }
        
        // Create the SVG icon
        const icon = this.createLocationIcon();
        
        // Create the text element
        const textElement = document.createElement('span');
        textElement.className = 'address-text';
        textElement.textContent = addressText;
        
        // Assemble the component
        element.appendChild(icon);
        element.appendChild(textElement);
        
        // Enhance the element
        this.enhanceAddressElement(element);
        
        return element;
    }
    
    createLocationIcon() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'address-icon');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z');
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '12');
        circle.setAttribute('cy', '10');
        circle.setAttribute('r', '3');
        
        svg.appendChild(path);
        svg.appendChild(circle);
        
        return svg;
    }
    
    // Public method to get component data
    getComponentData(element) {
        return this.components.get(element);
    }
    
    // Public method to update component coordinates
    updateCoordinates(element, coordinates) {
        const componentData = this.components.get(element);
        if (componentData) {
            componentData.coordinates = coordinates;
            element.dataset.latitude = coordinates.latitude;
            element.dataset.longitude = coordinates.longitude;
            console.log('✅ Updated coordinates for address component');
        }
    }
}

// Initialize the address component system when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.AddressComponentSystem = new AddressComponent();
});

// Export for use in other scripts
window.AddressComponent = AddressComponent;
