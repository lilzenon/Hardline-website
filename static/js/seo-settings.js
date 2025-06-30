/**
 * SEO Settings Page JavaScript
 * Handles tab switching, form submission, file editing, and validation
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 SEO Settings page loaded');
    
    initializeTabs();
    initializeFormHandlers();
    initializeFileEditor();
    initializeValidation();
});

/**
 * Initialize tab switching functionality
 */
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.querySelector(`[data-tab="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            console.log(`📋 Switched to tab: ${targetTab}`);
        });
    });
}

/**
 * Initialize form handlers
 */
function initializeFormHandlers() {
    const saveButton = document.getElementById('save-settings');
    const resetButton = document.getElementById('reset-form');
    const backupButton = document.getElementById('backup-settings');
    
    if (saveButton) {
        saveButton.addEventListener('click', saveSettings);
    }
    
    if (resetButton) {
        resetButton.addEventListener('click', resetForm);
    }
    
    if (backupButton) {
        backupButton.addEventListener('click', createBackup);
    }
}

/**
 * Initialize file editor functionality
 */
function initializeFileEditor() {
    // File editor is handled by inline functions in the template
    console.log('📝 File editor initialized');
}

/**
 * Initialize form validation
 */
function initializeValidation() {
    const form = document.getElementById('seo-settings-form');
    if (!form) return;
    
    // Real-time validation for required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', clearFieldError);
    });
    
    // Character count for meta fields
    const titleField = document.getElementById('default_title');
    const descriptionField = document.getElementById('default_description');
    
    if (titleField) {
        addCharacterCounter(titleField, 60);
    }
    
    if (descriptionField) {
        addCharacterCounter(descriptionField, 160);
    }
}

/**
 * Save SEO settings
 */
async function saveSettings() {
    console.log('💾 Saving SEO settings...');
    
    const form = document.getElementById('seo-settings-form');
    if (!form) {
        showMessage('Form not found', 'error');
        return;
    }
    
    // Validate form
    if (!validateForm(form)) {
        showMessage('Please fix validation errors before saving', 'error');
        return;
    }
    
    // Show loading
    showLoading(true);
    
    try {
        const formData = new FormData(form);
        
        const response = await fetch('/dashboard/seo-settings', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('SEO settings saved successfully!', 'success');
            console.log('✅ SEO settings saved');
        } else {
            showMessage(result.error || 'Failed to save settings', 'error');
            console.error('❌ Error saving settings:', result.error);
        }
    } catch (error) {
        console.error('❌ Error saving settings:', error);
        showMessage('Network error. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

/**
 * Reset form to original values
 */
function resetForm() {
    console.log('🔄 Resetting form...');
    
    if (confirm('Are you sure you want to reset all changes? This will restore the original values.')) {
        location.reload();
    }
}

/**
 * Create settings backup
 */
async function createBackup() {
    console.log('📦 Creating settings backup...');
    
    try {
        const response = await fetch('/dashboard/seo-settings/backup', {
            method: 'POST'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('Settings backup created successfully!', 'success');
        } else {
            showMessage(result.error || 'Failed to create backup', 'error');
        }
    } catch (error) {
        console.error('❌ Error creating backup:', error);
        showMessage('Failed to create backup', 'error');
    }
}

/**
 * Save file content (llms.txt or robots.txt)
 */
async function saveFile(fileName) {
    console.log(`📝 Saving file: ${fileName}`);
    
    const contentId = fileName === 'llms.txt' ? 'llms-content' : 'robots-content';
    const descriptionId = fileName === 'llms.txt' ? 'llms-description' : 'robots-description';
    
    const contentElement = document.getElementById(contentId);
    const descriptionElement = document.getElementById(descriptionId);
    
    if (!contentElement) {
        showMessage(`Content editor for ${fileName} not found`, 'error');
        return;
    }
    
    const content = contentElement.value;
    const description = descriptionElement ? descriptionElement.value : '';
    
    if (!content.trim()) {
        showMessage(`${fileName} content cannot be empty`, 'error');
        return;
    }
    
    showLoading(true);
    
    try {
        const response = await fetch(`/dashboard/seo-settings/file/${fileName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content,
                description: description
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage(`${fileName} saved successfully!`, 'success');
            
            // Clear description field
            if (descriptionElement) {
                descriptionElement.value = '';
            }
            
            // Refresh backup history
            setTimeout(() => {
                location.reload();
            }, 1500);
        } else {
            showMessage(result.error || `Failed to save ${fileName}`, 'error');
        }
    } catch (error) {
        console.error(`❌ Error saving ${fileName}:`, error);
        showMessage(`Failed to save ${fileName}`, 'error');
    } finally {
        showLoading(false);
    }
}

/**
 * Restore file from backup
 */
async function restoreBackup(backupId) {
    console.log(`🔄 Restoring backup: ${backupId}`);
    
    if (!confirm('Are you sure you want to restore this backup? This will overwrite the current file content.')) {
        return;
    }
    
    showLoading(true);
    
    try {
        const response = await fetch(`/dashboard/seo-settings/restore/${backupId}`, {
            method: 'POST'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('File restored from backup successfully!', 'success');
            
            // Refresh page to show restored content
            setTimeout(() => {
                location.reload();
            }, 1500);
        } else {
            showMessage(result.error || 'Failed to restore backup', 'error');
        }
    } catch (error) {
        console.error('❌ Error restoring backup:', error);
        showMessage('Failed to restore backup', 'error');
    } finally {
        showLoading(false);
    }
}

/**
 * Download file content
 */
function downloadFile(fileName) {
    console.log(`📥 Downloading file: ${fileName}`);
    
    const contentId = fileName === 'llms.txt' ? 'llms-content' : 'robots-content';
    const contentElement = document.getElementById(contentId);
    
    if (!contentElement) {
        showMessage(`Content for ${fileName} not found`, 'error');
        return;
    }
    
    const content = contentElement.value;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showMessage(`${fileName} downloaded successfully!`, 'success');
}

/**
 * Show backup history modal (placeholder)
 */
function showBackupHistory(fileName) {
    console.log(`📋 Showing backup history for: ${fileName}`);
    // This would open a modal with backup history
    // For now, just scroll to the backup section
    const backupSection = document.querySelector('.backup-history');
    if (backupSection) {
        backupSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Validate form
 */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Validate individual field
 */
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Specific field validations
    if (field.id === 'default_title' && value.length > 60) {
        isValid = false;
        errorMessage = 'Title should be 60 characters or less';
    }
    
    if (field.id === 'default_description' && value.length > 160) {
        isValid = false;
        errorMessage = 'Description should be 160 characters or less';
    }
    
    if (field.type === 'url' && value && !isValidUrl(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid URL';
    }
    
    // Show/hide error
    showFieldError(field, isValid ? '' : errorMessage);
    
    return isValid;
}

/**
 * Clear field error
 */
function clearFieldError(event) {
    const field = event.target;
    showFieldError(field, '');
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    // Remove existing error
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error if message provided
    if (message) {
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.75rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
        field.style.borderColor = '#ef4444';
    } else {
        field.style.borderColor = '';
    }
}

/**
 * Add character counter to field
 */
function addCharacterCounter(field, maxLength) {
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.style.fontSize = '0.75rem';
    counter.style.color = 'rgba(255, 255, 255, 0.6)';
    counter.style.marginTop = '0.25rem';
    counter.style.textAlign = 'right';
    
    const updateCounter = () => {
        const length = field.value.length;
        counter.textContent = `${length}/${maxLength}`;
        
        if (length > maxLength) {
            counter.style.color = '#ef4444';
        } else if (length > maxLength * 0.8) {
            counter.style.color = '#f59e0b';
        } else {
            counter.style.color = 'rgba(255, 255, 255, 0.6)';
        }
    };
    
    field.addEventListener('input', updateCounter);
    field.parentNode.appendChild(counter);
    updateCounter();
}

/**
 * Validate URL
 */
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

/**
 * Show message
 */
function showMessage(message, type = 'info') {
    const container = document.getElementById('message-container');
    const content = document.getElementById('message-content');
    
    if (!container || !content) return;
    
    content.textContent = message;
    container.className = `message-container ${type}`;
    container.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        container.style.display = 'none';
    }, 5000);
}

/**
 * Show/hide loading overlay
 */
function showLoading(show) {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.display = show ? 'flex' : 'none';
    }
}
