/**
 * Address Autocomplete System using Photon API
 * Provides intelligent address autocomplete with validation and coordinate capture
 */

console.log('🏠 Address Autocomplete script loaded successfully');

class AddressAutocomplete {
    constructor(inputElement, options = {}) {
        this.input = inputElement;
        this.options = {
            apiUrl: 'https://photon.komoot.io/api',
            minLength: 3,
            debounceMs: 300,
            maxResults: 5,
            placeholder: 'Start typing an address...',
            enableValidation: true,
            enableCoordinates: true,
            ...options
        };

        this.dropdown = null;
        this.debounceTimer = null;
        this.currentRequest = null;
        this.selectedIndex = -1;
        this.results = [];
        this.isValidated = false;
        this.coordinates = null;
        this.addressData = null;

        this.init();
    }

    init() {
        this.createDropdown();
        this.attachEventListeners();
        this.addValidationIndicator();

        // Set placeholder if provided
        if (this.options.placeholder) {
            this.input.placeholder = this.options.placeholder;
        }
    }

    createDropdown() {
        this.dropdown = document.createElement('div');
        this.dropdown.className = 'address-autocomplete-dropdown';
        this.dropdown.style.display = 'none';

        // Insert dropdown after input
        this.input.parentNode.insertBefore(this.dropdown, this.input.nextSibling);
    }

    addValidationIndicator() {
        if (!this.options.enableValidation) return;

        const indicator = document.createElement('div');
        indicator.className = 'address-validation-indicator';
        indicator.innerHTML = `
            <span class="validation-icon loading" style="display: none;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                </svg>
            </span>
            <span class="validation-icon success" style="display: none;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20,6 9,17 4,12"/>
                </svg>
            </span>
            <span class="validation-icon error" style="display: none;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
            </span>
        `;

        this.input.parentNode.appendChild(indicator);
        this.validationIndicator = indicator;
    }

    attachEventListeners() {
        // Input events
        this.input.addEventListener('input', (e) => this.handleInput(e));
        this.input.addEventListener('keydown', (e) => this.handleKeydown(e));
        this.input.addEventListener('blur', (e) => this.handleBlur(e));
        this.input.addEventListener('focus', (e) => this.handleFocus(e));

        // Document click to close dropdown
        document.addEventListener('click', (e) => {
            if (!this.input.contains(e.target) && !this.dropdown.contains(e.target)) {
                this.hideDropdown();
            }
        });
    }

    handleInput(e) {
        const query = e.target.value.trim();

        // Clear validation state when user types
        this.setValidationState('none');
        this.isValidated = false;
        this.coordinates = null;
        this.addressData = null;

        if (query.length < this.options.minLength) {
            this.hideDropdown();
            return;
        }

        // Debounce API calls
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.searchAddresses(query);
        }, this.options.debounceMs);
    }

    handleKeydown(e) {
        if (!this.dropdown || this.dropdown.style.display === 'none') return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.selectedIndex = Math.min(this.selectedIndex + 1, this.results.length - 1);
                this.updateSelection();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
                this.updateSelection();
                break;
            case 'Enter':
                e.preventDefault();
                if (this.selectedIndex >= 0) {
                    this.selectResult(this.results[this.selectedIndex]);
                }
                break;
            case 'Escape':
                this.hideDropdown();
                break;
        }
    }

    handleBlur(e) {
        // Delay hiding to allow for dropdown clicks
        setTimeout(() => {
            if (!this.dropdown.matches(':hover')) {
                this.hideDropdown();
            }
        }, 150);
    }

    handleFocus(e) {
        if (this.results.length > 0) {
            this.showDropdown();
        }
    }

    async searchAddresses(query) {
        // Cancel previous request
        if (this.currentRequest) {
            this.currentRequest.abort();
        }

        this.setValidationState('loading');

        try {
            const controller = new AbortController();
            this.currentRequest = controller;

            const params = new URLSearchParams({
                q: query,
                limit: this.options.maxResults,
                lang: 'en'
            });

            const response = await fetch(`${this.options.apiUrl}?${params}`, {
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            this.handleSearchResults(data.features || []);

        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Address search error:', error);
                this.setValidationState('error');
                this.showError('Failed to search addresses. Please try again.');
            }
        } finally {
            this.currentRequest = null;
        }
    }

    handleSearchResults(features) {
        this.results = features.map(feature => ({
            display_name: feature.properties.name || 'Unknown Location',
            formatted: this.formatAddress(feature.properties),
            coordinates: feature.geometry.coordinates,
            properties: feature.properties,
            raw: feature
        }));

        if (this.results.length > 0) {
            this.renderDropdown();
            this.showDropdown();
            this.setValidationState('none');
        } else {
            this.hideDropdown();
            this.setValidationState('error');
        }
    }

    formatAddress(properties) {
        const parts = [];

        if (properties.housenumber) parts.push(properties.housenumber);
        if (properties.street) parts.push(properties.street);
        if (properties.city) parts.push(properties.city);
        if (properties.state) parts.push(properties.state);
        if (properties.postcode) parts.push(properties.postcode);
        if (properties.country) parts.push(properties.country);

        return parts.join(', ') || properties.name || 'Unknown Location';
    }

    renderDropdown() {
        this.dropdown.innerHTML = this.results.map((result, index) => `
            <div class="address-result" data-index="${index}">
                <div class="address-name">${this.escapeHtml(result.display_name)}</div>
                <div class="address-formatted">${this.escapeHtml(result.formatted)}</div>
            </div>
        `).join('');

        // Add click listeners
        this.dropdown.querySelectorAll('.address-result').forEach((item, index) => {
            item.addEventListener('click', () => this.selectResult(this.results[index]));
        });
    }

    updateSelection() {
        this.dropdown.querySelectorAll('.address-result').forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedIndex);
        });
    }

    selectResult(result) {
        this.input.value = result.formatted;
        this.isValidated = true;
        this.coordinates = {
            latitude: result.coordinates[1],
            longitude: result.coordinates[0]
        };
        this.addressData = result.raw;

        this.hideDropdown();
        this.setValidationState('success');

        // Trigger custom event
        this.input.dispatchEvent(new CustomEvent('addressSelected', {
            detail: {
                formatted: result.formatted,
                coordinates: this.coordinates,
                data: this.addressData,
                components: this.extractComponents(result.properties)
            }
        }));
    }

    extractComponents(properties) {
        return {
            street: properties.street || null,
            housenumber: properties.housenumber || null,
            city: properties.city || null,
            state: properties.state || null,
            postcode: properties.postcode || null,
            country: properties.country || null,
            countrycode: properties.countrycode || null
        };
    }

    showDropdown() {
        this.dropdown.style.display = 'block';
        this.selectedIndex = -1;
    }

    hideDropdown() {
        this.dropdown.style.display = 'none';
        this.selectedIndex = -1;
    }

    setValidationState(state) {
        if (!this.validationIndicator) return;

        const icons = this.validationIndicator.querySelectorAll('.validation-icon');
        icons.forEach(icon => icon.style.display = 'none');

        if (state !== 'none') {
            const targetIcon = this.validationIndicator.querySelector(`.validation-icon.${state}`);
            if (targetIcon) targetIcon.style.display = 'inline-block';
        }

        // Update input styling
        this.input.classList.remove('address-valid', 'address-invalid', 'address-loading');
        if (state !== 'none') {
            this.input.classList.add(`address-${state === 'success' ? 'valid' : state}`);
        }
    }

    showError(message) {
        // You can customize this to show errors in your preferred way
        console.warn('Address Autocomplete:', message);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Public methods
    getValidationState() {
        return {
            isValidated: this.isValidated,
            coordinates: this.coordinates,
            addressData: this.addressData
        };
    }

    destroy() {
        if (this.dropdown) {
            this.dropdown.remove();
        }
        if (this.validationIndicator) {
            this.validationIndicator.remove();
        }
        clearTimeout(this.debounceTimer);
        if (this.currentRequest) {
            this.currentRequest.abort();
        }
    }
}

// Export for use in other scripts
window.AddressAutocomplete = AddressAutocomplete;