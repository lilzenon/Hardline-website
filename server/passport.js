const { Strategy: LocalAPIKeyStrategy } = require("passport-localapikey-update");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { Strategy: AppleStrategy } = require("passport-apple");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const query = require("./queries");
const env = require("./env");

const jwtOptions = {
    jwtFromRequest: req => req.cookies && req.cookies.token,
    secretOrKey: env.JWT_SECRET
};

passport.use(
    new JwtStrategy(jwtOptions, async(payload, done) => {
        try {
            // 'sub' used to be the email address
            // this check makes sure to invalidate old JWTs where the sub is still the email address
            if (typeof payload.sub === "string" || !payload.sub) {
                return done(null, false);
            }
            const user = await query.user.find({ id: payload.sub });
            if (!user) return done(null, false);
            return done(null, user, payload);
        } catch (err) {
            return done(err);
        }
    })
);

const localOptions = {
    usernameField: "email"
};

passport.use(
    new LocalStrategy(localOptions, async(email, password, done) => {
        try {
            console.log(`🔍 Passport local strategy - email: ${email}, password length: ${password.length}`);
            console.log(`🔑 Password received: "${password}" (showing for debugging)`);

            const user = await query.user.find({ email });
            if (!user) {
                console.log(`❌ User not found for email: ${email}`);
                return done(null, false);
            }

            console.log(`✅ User found: ${user.email}, role: ${user.role}, verified: ${user.verified}`);
            console.log(`🔑 Comparing password with hash (length: ${user.password.length})`);

            const isMatch = await bcrypt.compare(password, user.password);
            console.log(`🧪 Password comparison result: ${isMatch}`);

            if (!isMatch) {
                console.log(`❌ Password mismatch for user: ${email}`);
                return done(null, false);
            }

            console.log(`✅ Authentication successful for user: ${email}`);
            return done(null, user);
        } catch (err) {
            console.error(`❌ Passport local strategy error:`, err);
            return done(err);
        }
    })
);

const localAPIKeyOptions = {
    apiKeyField: "apikey",
    apiKeyHeader: "x-api-key"
};

passport.use(
    new LocalAPIKeyStrategy(localAPIKeyOptions, async(apikey, done) => {
        try {
            const user = await query.user.find({ apikey });
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

// Google OAuth Strategy
if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
    passport.use(
        new GoogleStrategy({
            clientID: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback"
        }, async(accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists with this Google ID
                let user = await query.user.find({ google_id: profile.id });

                if (user) {
                    return done(null, user);
                }

                // Check if user exists with same email
                user = await query.user.find({ email: profile.emails[0].value });

                if (user) {
                    // Link Google account to existing user
                    await query.user.update({ id: user.id }, {
                        google_id: profile.id,
                        provider: user.provider ? `${user.provider},google` : 'google'
                    });
                    return done(null, user);
                }

                // Create new user (admin only for this login)
                const newUser = await query.user.add({
                    email: profile.emails[0].value,
                    google_id: profile.id,
                    first_name: profile.name.givenName,
                    last_name: profile.name.familyName,
                    provider: 'google',
                    verified: true,
                    role: 'admin'
                });

                return done(null, newUser);
            } catch (err) {
                return done(err);
            }
        })
    );
}

// Apple Sign-In Strategy
if (env.APPLE_CLIENT_ID && env.APPLE_TEAM_ID && env.APPLE_KEY_ID && env.APPLE_PRIVATE_KEY) {
    passport.use(
        new AppleStrategy({
            clientID: env.APPLE_CLIENT_ID,
            teamID: env.APPLE_TEAM_ID,
            keyID: env.APPLE_KEY_ID,
            privateKey: env.APPLE_PRIVATE_KEY,
            callbackURL: "/api/auth/apple/callback",
            scope: ['name', 'email']
        }, async(accessToken, refreshToken, idToken, profile, done) => {
            try {
                // Check if user already exists with this Apple ID
                let user = await query.user.find({ apple_id: profile.id });

                if (user) {
                    return done(null, user);
                }

                // Check if user exists with same email
                if (profile.email) {
                    user = await query.user.find({ email: profile.email });

                    if (user) {
                        // Link Apple account to existing user
                        await query.user.update({ id: user.id }, {
                            apple_id: profile.id,
                            provider: user.provider ? `${user.provider},apple` : 'apple'
                        });
                        return done(null, user);
                    }
                }

                // Create new user (admin only for this login)
                const newUser = await query.user.add({
                    email: profile.email,
                    apple_id: profile.id,
                    first_name: profile.name && profile.name.firstName,
                    last_name: profile.name && profile.name.lastName,
                    provider: 'apple',
                    verified: true,
                    role: 'admin'
                });

                return done(null, newUser);
            } catch (err) {
                return done(err);
            }
        })
    );
}