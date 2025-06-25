const express = require('express');
const router = express.Router();
const sessionManagement = require('../../services/session/session-management.service');
const sessionSecurity = require('../../services/session/session-security.service');
const auth = require('../../handlers/auth.handler');

/**
 * Admin Session Management Routes
 * All routes require admin authentication
 */

/**
 * Get all active sessions
 * GET /api/admin/sessions
 */
router.get('/', auth.jwt, auth.admin, async(req, res) => {
    try {
        const sessions = await sessionManagement.getAllActiveSessions();
        const statistics = await sessionManagement.getSessionStatistics();

        res.json({
            status: 'success',
            data: {
                sessions,
                statistics,
                total: sessions.length
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('🚨 Error getting admin sessions:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve session data',
            error: error.message
        });
    }
});

/**
 * Get session statistics
 * GET /api/admin/sessions/statistics
 */
router.get('/statistics', auth.jwt, auth.admin, async(req, res) => {
    try {
        const statistics = await sessionManagement.getSessionStatistics();
        const securityMetrics = sessionSecurity.getSecurityMetrics();
        const managementMetrics = sessionManagement.getManagementMetrics();

        res.json({
            status: 'success',
            data: {
                session: statistics,
                security: securityMetrics,
                management: managementMetrics
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('🚨 Error getting session statistics:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve session statistics',
            error: error.message
        });
    }
});

/**
 * Get specific session details
 * GET /api/admin/sessions/:sessionId
 */
router.get('/:sessionId', auth.jwt, auth.admin, async(req, res) => {
    try {
        const { sessionId } = req.params;
        const sessionInfo = await sessionManagement.getSessionInfo(sessionId);

        if (!sessionInfo) {
            return res.status(404).json({
                status: 'error',
                message: 'Session not found'
            });
        }

        res.json({
            status: 'success',
            data: sessionInfo,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error(`🚨 Error getting session ${req.params.sessionId}:`, error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve session information',
            error: error.message
        });
    }
});

/**
 * Force destroy a session
 * DELETE /api/admin/sessions/:sessionId
 */
router.delete('/:sessionId', auth.jwt, auth.admin, async(req, res) => {
    try {
        const { sessionId } = req.params;
        const { reason = 'admin_termination' } = req.body;
        const adminUserId = req.user.id;

        const success = await sessionManagement.forceDestroySession(sessionId, adminUserId, reason);

        if (success) {
            res.json({
                status: 'success',
                message: 'Session terminated successfully',
                data: { sessionId, reason },
                timestamp: new Date().toISOString()
            });
        } else {
            res.status(400).json({
                status: 'error',
                message: 'Failed to terminate session'
            });
        }
    } catch (error) {
        console.error(`🚨 Error destroying session ${req.params.sessionId}:`, error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to terminate session',
            error: error.message
        });
    }
});

/**
 * Destroy all sessions for a user
 * DELETE /api/admin/sessions/user/:userId
 */
router.delete('/user/:userId', auth.jwt, auth.admin, async(req, res) => {
    try {
        const { userId } = req.params;
        const { reason = 'admin_user_termination' } = req.body;
        const adminUserId = req.user.id;

        const destroyedCount = await sessionManagement.destroyUserSessions(userId, adminUserId, reason);

        res.json({
            status: 'success',
            message: `${destroyedCount} sessions terminated for user`,
            data: { userId, destroyedCount, reason },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error(`🚨 Error destroying sessions for user ${req.params.userId}:`, error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to terminate user sessions',
            error: error.message
        });
    }
});

/**
 * Get blocked IPs
 * GET /api/admin/sessions/security/blocked-ips
 */
router.get('/security/blocked-ips', auth.jwt, auth.admin, async(req, res) => {
    try {
        const blockedIPs = sessionSecurity.getBlockedIPs();

        res.json({
            status: 'success',
            data: {
                blockedIPs,
                total: blockedIPs.length
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('🚨 Error getting blocked IPs:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve blocked IPs',
            error: error.message
        });
    }
});

/**
 * Unblock an IP address
 * DELETE /api/admin/sessions/security/blocked-ips/:ip
 */
router.delete('/security/blocked-ips/:ip', auth.jwt, auth.admin, async(req, res) => {
    try {
        const { ip } = req.params;
        const adminUserId = req.user.id;

        const wasBlocked = sessionSecurity.unblockIP(ip);

        if (wasBlocked) {
            console.log(`🔓 IP ${ip} unblocked by admin ${adminUserId}`);
            res.json({
                status: 'success',
                message: 'IP address unblocked successfully',
                data: { ip, unblockedBy: adminUserId },
                timestamp: new Date().toISOString()
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'IP address was not blocked'
            });
        }
    } catch (error) {
        console.error(`🚨 Error unblocking IP ${req.params.ip}:`, error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to unblock IP address',
            error: error.message
        });
    }
});

/**
 * Force cleanup expired sessions
 * POST /api/admin/sessions/cleanup
 */
router.post('/cleanup', auth.jwt, auth.admin, async(req, res) => {
    try {
        const adminUserId = req.user.id;
        const cleanedCount = await sessionManagement.cleanupExpiredSessions();

        console.log(`🧹 Manual session cleanup triggered by admin ${adminUserId}: ${cleanedCount} sessions cleaned`);

        res.json({
            status: 'success',
            message: 'Session cleanup completed',
            data: {
                cleanedCount,
                triggeredBy: adminUserId
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('🚨 Error during manual session cleanup:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to cleanup sessions',
            error: error.message
        });
    }
});

/**
 * Get session health status
 * GET /api/admin/sessions/health
 */
router.get('/health', auth.jwt, auth.admin, async(req, res) => {
    try {
        const health = await sessionManagement.healthCheck();

        res.json({
            status: 'success',
            data: health,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('🚨 Error getting session health:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve session health',
            error: error.message
        });
    }
});

/**
 * Export session data (for compliance/audit)
 * GET /api/admin/sessions/export
 */
router.get('/export', auth.jwt, auth.admin, async(req, res) => {
    try {
        const { format = 'json', days = 7 } = req.query;
        const adminUserId = req.user.id;

        const sessions = await sessionManagement.getAllActiveSessions();
        const statistics = await sessionManagement.getSessionStatistics();
        const securityMetrics = sessionSecurity.getSecurityMetrics();

        const exportData = {
            exportedAt: new Date().toISOString(),
            exportedBy: adminUserId,
            period: `${days} days`,
            summary: {
                totalSessions: sessions.length,
                statistics,
                securityMetrics
            },
            sessions: sessions.map(session => ({
                ...session,
                userAgent: session.userAgent ? session.userAgent.substring(0, 200) : '' // Truncate for export
            }))
        };

        if (format === 'csv') {
            // Convert to CSV format
            const csv = convertToCSV(exportData.sessions);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename="sessions-export-${Date.now()}.csv"`);
            res.send(csv);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Disposition', `attachment; filename="sessions-export-${Date.now()}.json"`);
            res.json(exportData);
        }

        console.log(`📊 Session data exported by admin ${adminUserId} (${format} format)`);
    } catch (error) {
        console.error('🚨 Error exporting session data:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to export session data',
            error: error.message
        });
    }
});

/**
 * Convert sessions to CSV format
 */
function convertToCSV(sessions) {
    if (sessions.length === 0) return '';

    const headers = Object.keys(sessions[0]).join(',');
    const rows = sessions.map(session =>
        Object.values(session).map(value =>
            typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
        ).join(',')
    );

    return [headers, ...rows].join('\n');
}

module.exports = router;