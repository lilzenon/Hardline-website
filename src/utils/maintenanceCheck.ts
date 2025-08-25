/**
 * Maintenance Mode Utility Functions
 * Handles checking maintenance status and IP allowlist
 */

export interface MaintenanceSettings {
  maintenance_mode: boolean
  maintenance_message: string
  estimated_downtime: string
  contact_information: string
  allowed_ips: string
}

/**
 * Get the client's IP address
 */
export const getClientIP = (): string => {
  // In a real implementation, this would get the actual client IP
  // For development, we'll return localhost
  return '127.0.0.1'
}

/**
 * Check if an IP address is in the allowed list
 */
export const isIPAllowed = (clientIP: string, allowedIPs: string): boolean => {
  if (!allowedIPs || allowedIPs.trim() === '') {
    return false
  }

  const allowedList = allowedIPs
    .split(',')
    .map(ip => ip.trim())
    .filter(ip => ip.length > 0)

  return allowedList.includes(clientIP)
}

/**
 * Check if maintenance mode is active and if the current user should see it
 */
export const shouldShowMaintenance = (settings: MaintenanceSettings): boolean => {
  if (!settings.maintenance_mode) {
    return false
  }

  const clientIP = getClientIP()
  const isAllowed = isIPAllowed(clientIP, settings.allowed_ips)

  // If IP is allowed, don't show maintenance page
  return !isAllowed
}

/**
 * Fetch maintenance settings from the API
 */
export const fetchMaintenanceSettings = async (): Promise<MaintenanceSettings | null> => {
  try {
    const response = await fetch('/api/settings/maintenance')
    if (response.ok) {
      const data = await response.json()
      return data.settings
    }
  } catch (error) {
    console.error('Error fetching maintenance settings:', error)
  }
  return null
}

/**
 * Default maintenance settings
 */
export const defaultMaintenanceSettings: MaintenanceSettings = {
  maintenance_mode: false,
  maintenance_message: 'We are currently performing scheduled maintenance. Please check back soon.',
  estimated_downtime: '2 hours',
  contact_information: 'support@bounce2bounce.com',
  allowed_ips: '127.0.0.1,::1'
}
