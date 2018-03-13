import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './router';

// Connect to MongoDB
mongoose.connect('mongodb://localhost/markers');

// Initialize http server
const app = express();

// Logger that outputs all requests into the console
app.use(morgan('combined'));
// Use v1 as prefix for all API endpoints
app.use('/v1', router);

import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
// Import Facebook and Google OAuth apps configs
import { facebook, google } from '../Config';

// Transform Facebook profile because Facebook and Google profile objects look different
// and we want to transform them into user objects that have the same set of attributes
const transformFacebookProfile = (profile, accessToken) => ({
    name: profile.name,
    avatar: profile.picture.data.url,
    accessToken: accessToken,
});

// Transform Google profile into user object
const transformGoogleProfile = (profile, accessToken) => ({
    name: profile.displayName,
    avatar: profile.image.url,
    accessToken: accessToken,
});

// Register Facebook Passport strategy
passport.use(new FacebookStrategy(facebook,
    // Gets called when user authorizes access to their profile
    async (accessToken, refreshToken, profile, done)
    // Return done callback and pass transformed user object
        => done(null, transformFacebookProfile(profile._json, accessToken, refreshToken))
));

// Register Google Passport strategy
passport.use(new GoogleStrategy(google,
    async (accessToken, refreshToken, profile, done)
        => done(null, transformGoogleProfile(profile._json, accessToken, refreshToken))
));

// Serialize user into the sessions
passport.serializeUser((user, done) => done(null, user));

// Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Set up Facebook auth routes
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),
    // Redirect user back to the mobile app using Linking with a custom protocol OAuthLogin
    (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));

// Set up Google auth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/google' }),
    (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));


const server = app.listen(3000, () => {
    const { address, port } = server.address();
    console.log(`Listening at http://${address}:${port}`);
});