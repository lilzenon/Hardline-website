const knex = require("../../knex");

/**
 * Analytics Reset Service
 * Provides comprehensive analytics data reset functionality with safety measures
 */
class AnalyticsResetService {
    constructor() {
        this.resetActions = [];
        this.isResetting = false;
    }

    /**
     * Get analytics data summary before reset
     */
    async getAnalyticsSummary() {
        try {
            const summary = {};

            // Count homepage analytics data (defensive: handle missing tables gracefully)
            try {
                const [pageViewsCount] = await knex('homepage_page_views').count('* as count');
                summary.homepage_page_views = parseInt(pageViewsCount.count) || 0;
            } catch (err) {
                console.log('ℹ️ homepage_page_views table not found, defaulting to 0');
                summary.homepage_page_views = 0;
            }

            try {
                const [sessionsCount] = await knex('homepage_sessions').count('* as count');
                summary.homepage_sessions = parseInt(sessionsCount.count) || 0;
            } catch (err) {
                console.log('ℹ️ homepage_sessions table not found, defaulting to 0');
                summary.homepage_sessions = 0;
            }

            // Count event analytics data
            try {
                const [eventSignupsCount] = await knex('event_signups').count('* as count');
                summary.event_signups = parseInt(eventSignupsCount.count) || 0;
            } catch (err) {
                console.log('ℹ️ event_signups table not found, skipping...');
                summary.event_signups = 0;
            }

            // Count general analytics events
            try {
                const [analyticsEventsCount] = await knex('analytics_events').count('* as count');
                summary.analytics_events = parseInt(analyticsEventsCount.count) || 0;
            } catch (err) {
                console.log('ℹ️ analytics_events table not found, skipping...');
                summary.analytics_events = 0;
            }

            // Get date range of data
            try {
                const [oldestPageView] = await knex('homepage_page_views')
                    .select('view_timestamp')
                    .orderBy('view_timestamp', 'asc')
                    .limit(1);

                const [newestPageView] = await knex('homepage_page_views')
                    .select('view_timestamp')
                    .orderBy('view_timestamp', 'desc')
                    .limit(1);

                if (oldestPageView && newestPageView) {
                    summary.data_range = {
                        oldest: oldestPageView.view_timestamp,
                        newest: newestPageView.view_timestamp
                    };
                }
            } catch (err) {
                console.log('ℹ️ Could not determine data range');
            }

            // Calculate total records
            summary.total_records = Object.values(summary)
                .filter(val => typeof val === 'number')
                .reduce((sum, count) => sum + count, 0);

            return summary;
        } catch (error) {
            console.error('❌ Error getting analytics summary:', error);
            throw error;
        }
    }

    /**
     * Reset all analytics data with comprehensive logging
     */
    async resetAllAnalytics(adminUserId, confirmationToken) {
        if (this.isResetting) {
            throw new Error('Analytics reset already in progress');
        }

        // Validate confirmation token
        const expectedToken = `RESET_ANALYTICS_${new Date().toISOString().substring(0, 10)}`;
        if (confirmationToken !== expectedToken) {
            throw new Error('Invalid confirmation token. Reset cancelled for safety.');
        }

        this.isResetting = true;
        this.resetActions = [];

        try {
            console.log('🚨 STARTING ANALYTICS RESET - ALL DATA WILL BE DELETED');
            console.log(`👤 Initiated by admin user ID: ${adminUserId}`);
            console.log(`🕒 Reset started at: ${new Date().toISOString()}`);

            // Get summary before reset
            const beforeSummary = await this.getAnalyticsSummary();
            console.log('📊 Data before reset:', beforeSummary);

            // Start transaction for safety
            await knex.transaction(async(trx) => {
                // Reset homepage analytics
                await this.resetHomepageAnalytics(trx);

                // Reset event analytics
                await this.resetEventAnalytics(trx);

                // Reset general analytics
                await this.resetGeneralAnalytics(trx);

                // Reset Redis counters
                await this.resetRedisCounters();

                // Log the reset action
                await this.logResetAction(trx, adminUserId, beforeSummary);
            });

            console.log('✅ ANALYTICS RESET COMPLETED SUCCESSFULLY');
            console.log('📋 Reset actions performed:', this.resetActions);

            return {
                success: true,
                message: 'Analytics data reset successfully',
                beforeSummary,
                resetActions: this.resetActions,
                resetAt: new Date().toISOString()
            };

        } catch (error) {
            console.error('❌ ANALYTICS RESET FAILED:', error);
            throw error;
        } finally {
            this.isResetting = false;
        }
    }

    /**
     * Reset homepage analytics tables
     */
    async resetHomepageAnalytics(trx) {
        try {
            // Delete homepage page views
            const pageViewsDeleted = await trx('homepage_page_views').del();
            this.resetActions.push(`Deleted ${pageViewsDeleted} homepage page views`);
            console.log(`🗑️ Deleted ${pageViewsDeleted} homepage page views`);

            // Delete homepage sessions
            const sessionsDeleted = await trx('homepage_sessions').del();
            this.resetActions.push(`Deleted ${sessionsDeleted} homepage sessions`);
            console.log(`🗑️ Deleted ${sessionsDeleted} homepage sessions`);

        } catch (error) {
            console.error('❌ Error resetting homepage analytics:', error);
            throw error;
        }
    }

    /**
     * Reset event analytics tables
     */
    async resetEventAnalytics(trx) {
        try {
            // Reset event signup counts
            const eventsUpdated = await trx('events').update({ signup_count: 0 });
            this.resetActions.push(`Reset signup counts for ${eventsUpdated} events`);
            console.log(`🔄 Reset signup counts for ${eventsUpdated} events`);

            // Delete event signups (if table exists)
            try {
                const signupsDeleted = await trx('event_signups').del();
                this.resetActions.push(`Deleted ${signupsDeleted} event signups`);
                console.log(`🗑️ Deleted ${signupsDeleted} event signups`);
            } catch (err) {
                console.log('ℹ️ event_signups table not found, skipping...');
            }

        } catch (error) {
            console.error('❌ Error resetting event analytics:', error);
            throw error;
        }
    }

    /**
     * Reset general analytics tables
     */
    async resetGeneralAnalytics(trx) {
        try {
            // Delete analytics events (if table exists)
            try {
                const analyticsDeleted = await trx('analytics_events').del();
                this.resetActions.push(`Deleted ${analyticsDeleted} analytics events`);
                console.log(`🗑️ Deleted ${analyticsDeleted} analytics events`);
            } catch (err) {
                console.log('ℹ️ analytics_events table not found, skipping...');
            }

            // Delete hourly aggregates (if table exists)
            try {
                const hourlyDeleted = await trx('analytics_hourly').del();
                this.resetActions.push(`Deleted ${hourlyDeleted} hourly aggregates`);
                console.log(`🗑️ Deleted ${hourlyDeleted} hourly aggregates`);
            } catch (err) {
                console.log('ℹ️ analytics_hourly table not found, skipping...');
            }

        } catch (error) {
            console.error('❌ Error resetting general analytics:', error);
            throw error;
        }
    }

    /**
     * Reset Redis counters and hot data
     */
    async resetRedisCounters() {
        try {
            // Try to reset hot counters if Redis is available
            try {
                const { resetHotCounters } = require('./hot');
                await resetHotCounters();
                this.resetActions.push('Reset Redis hot counters');
                console.log('🔄 Reset Redis hot counters');
            } catch (importError) {
                // Try alternative Redis reset approach
                const redis = require('../../redis');
                if (redis) {
                    const keys = await redis.keys('active:*');
                    const pipeline = redis.pipeline();

                    if (keys.length > 0) {
                        pipeline.del(...keys);
                    }

                    // Reset common counter keys
                    pipeline.del('total:events');
                    pipeline.del('events:permin');
                    pipeline.del('top:referrers:5m');
                    pipeline.del('top:pages:5m');
                    pipeline.del('top:countries:5m');
                    pipeline.del('top:devices:5m');
                    pipeline.del('top:browsers:5m');

                    await pipeline.exec();
                    this.resetActions.push('Reset Redis counters manually');
                    console.log('🔄 Reset Redis counters manually');
                } else {
                    throw new Error('Redis not available');
                }
            }
        } catch (error) {
            console.log('ℹ️ Redis not available or hot counters reset failed:', error.message);
            this.resetActions.push('Redis counters reset skipped (not available)');
        }
    }

    /**
     * Log the reset action for audit trail
     */
    async logResetAction(trx, adminUserId, beforeSummary) {
        try {
            // Create admin_actions table if it doesn't exist
            const hasTable = await trx.schema.hasTable('admin_actions');
            if (!hasTable) {
                await trx.schema.createTable('admin_actions', (table) => {
                    table.increments('id').primary();
                    table.integer('admin_user_id').references('id').inTable('users');
                    table.string('action_type', 100).notNullable();
                    table.text('description');
                    table.jsonb('metadata');
                    table.timestamp('created_at').defaultTo(trx.fn.now());
                });
            }

            // Log the reset action
            await trx('admin_actions').insert({
                admin_user_id: adminUserId,
                action_type: 'ANALYTICS_RESET',
                description: 'Complete analytics data reset performed',
                metadata: {
                    beforeSummary,
                    resetActions: this.resetActions,
                    resetAt: new Date().toISOString()
                }
            });

            console.log('📝 Reset action logged to admin_actions table');
        } catch (error) {
            console.error('⚠️ Could not log reset action:', error);
            // Don't throw - logging failure shouldn't stop the reset
        }
    }

    /**
     * Generate confirmation token for reset
     */
    generateConfirmationToken() {
        return `RESET_ANALYTICS_${new Date().toISOString().substring(0, 10)}`;
    }

    /**
     * Check if reset is currently in progress
     */
    isResetInProgress() {
        return this.isResetting;
    }
}

module.exports = AnalyticsResetService;