const express = require("express");
const router = express.Router();
const asyncHandler = require("../../utils/asyncHandler");
const auth = require("../../handlers/auth.handler");
const query = require("../../queries");

/**
 * GET /api/social-media
 * Get all social media links (public endpoint for homepage)
 */
router.get(
    "/",
    asyncHandler(async (req, res) => {
        try {
            console.log('🔍 Fetching social media links for homepage');

            const socialMediaLinks = await query.raw(`
                SELECT platform, url, display_order, enabled
                FROM social_media_links
                WHERE enabled = true AND url != ''
                ORDER BY display_order ASC
            `);

            console.log(`✅ Found ${socialMediaLinks.length} enabled social media links`);

            res.json({
                success: true,
                links: socialMediaLinks
            });

        } catch (error) {
            console.error('❌ Error fetching social media links:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch social media links',
                message: error.message
            });
        }
    })
);

/**
 * GET /api/social-media/admin
 * Get all social media links for admin dashboard (requires authentication)
 */
router.get(
    "/admin",
    asyncHandler(auth.jwt),
    asyncHandler(async (req, res) => {
        try {
            console.log('🔍 Fetching all social media links for admin dashboard');

            const socialMediaLinks = await query.raw(`
                SELECT id, platform, url, display_order, enabled, created_at, updated_at
                FROM social_media_links
                ORDER BY display_order ASC
            `);

            console.log(`✅ Found ${socialMediaLinks.length} social media platforms`);

            res.json({
                success: true,
                links: socialMediaLinks
            });

        } catch (error) {
            console.error('❌ Error fetching social media links for admin:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch social media links',
                message: error.message
            });
        }
    })
);

/**
 * PUT /api/social-media/admin
 * Update social media links (requires authentication)
 */
router.put(
    "/admin",
    asyncHandler(auth.jwt),
    asyncHandler(async (req, res) => {
        try {
            console.log('💾 Updating social media links for user:', req.user.id);

            const { links } = req.body;

            if (!Array.isArray(links)) {
                return res.status(400).json({
                    success: false,
                    error: "Links must be an array"
                });
            }

            // Validate each link
            for (const link of links) {
                if (!link.platform || typeof link.platform !== 'string') {
                    return res.status(400).json({
                        success: false,
                        error: "Each link must have a valid platform"
                    });
                }

                // Validate URL format if provided
                if (link.url && link.url.trim() !== '') {
                    try {
                        new URL(link.url);
                    } catch (urlError) {
                        return res.status(400).json({
                            success: false,
                            error: `Invalid URL for ${link.platform}: ${link.url}`
                        });
                    }
                }
            }

            // Update each link
            const updatePromises = links.map(async (link) => {
                const updateData = {
                    url: link.url || '',
                    enabled: Boolean(link.enabled),
                    display_order: parseInt(link.display_order) || 0,
                    updated_at: new Date()
                };

                return await query.raw(`
                    UPDATE social_media_links 
                    SET url = ?, enabled = ?, display_order = ?, updated_at = ?
                    WHERE platform = ?
                `, [updateData.url, updateData.enabled, updateData.display_order, updateData.updated_at, link.platform]);
            });

            await Promise.all(updatePromises);

            console.log('✅ Social media links updated successfully');

            // Return updated links
            const updatedLinks = await query.raw(`
                SELECT id, platform, url, display_order, enabled, created_at, updated_at
                FROM social_media_links
                ORDER BY display_order ASC
            `);

            res.json({
                success: true,
                message: 'Social media links updated successfully',
                links: updatedLinks
            });

        } catch (error) {
            console.error('❌ Error updating social media links:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update social media links',
                message: error.message
            });
        }
    })
);

module.exports = router;
