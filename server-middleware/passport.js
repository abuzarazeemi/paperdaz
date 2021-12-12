const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy
// const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
const cookieSession = require('cookie-session')
const jwt = require('jsonwebtoken')
const env = require('../config')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(
  cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2'],
  })
)
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

const appUrl = (env.APP_URL || '').replace(/\/+$/, '')

passport.use(
  new GoogleStrategy(
    {
      consumerKey:
        '146368006291-l4elgu53dhcntn04iv69rntdjea0u09n.apps.googleusercontent.com',
      consumerSecret: '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',
      // clientID:
      //   '146368006291-l4elgu53dhcntn04iv69rntdjea0u09n.apps.googleusercontent.com',
      // clientSecret: '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',
      callbackURL: `${appUrl}/auth/google/callback`,
      // passReqToCallback: true,
    },
    (token, tokenSecret, profile, done) => {
      console.log('token ', token)
      console.log('tokenSecret ', tokenSecret)
      console.log('profile ', profile)
      return done(null, profile)
    }
  )
)

passport.use(
  new FacebookStrategy(
    {
      // clientID: env.FACEBOOK_APP_ID,
      // clientSecret: env.FACEBOOK_APP_SECRET,
      clientID: '1336136903262227',
      clientSecret: '889a3f0ea3ac171aa5ceca1b04d3d8d5',
      callbackURL: `${appUrl}/auth/facebook/callback`,
      // callbackURL: 'https://996f-41-190-3-24.ngrok.io/auth/facebook/callback',
      profileFields: [
        'id',
        'displayName',
        'name',
        'gender',
        'profileUrl',
        'emails',
        'photos',
      ],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('profile ', profile)
      return done(null, profile)
    }
  )
)

passport.use(
  new TwitterStrategy(
    {
      consumerKey: 'B5IwWw9HlHTPAssRGFXbbOhA3',
      consumerSecret: 'DEaQLnW95AoSkcgxLe34OqHM3SJp6KoPyKnSY983DZ9oLQGgsU',
      // callbackURL: 'http://localhost:3000/auth/twitter/callback',
      callbackURL: `${appUrl}/auth/twitter/callback`,
      includeEmail: true,
    },
    (token, tokenSecret, profile, done) => {
      console.log('profile ', profile)
      return done(null, profile)
    }
  )
)

app.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
)
app.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
)

app.get('/twitter', passport.authenticate('twitter'))

app.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login?error=Login%20Failed',
  }),
  (req, res) => {
    console.log('Requst user', req.user)
    const user = req.user
    const token = jwt.sign(user, env.ENCRYPTION_KEY)
    console.log('Token ', token)
    req.logOut()
    res.redirect(`/login?token=${token}`)
  }
)

app.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login?error=Login%20Failed',
  }),
  (req, res) => {
    console.log('Requst user', req.user)
    const user = req.user
    const token = jwt.sign(user, env.ENCRYPTION_KEY)
    console.log('Token ', token)
    req.logOut()
    res.redirect(`/login?token=${token}`)
  }
)

app.get(
  '/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/login?error=Login%20Failed',
  }),
  (req, res) => {
    console.log('Requst user', req.user)
    const user = req.user
    const token = jwt.sign(user, env.ENCRYPTION_KEY)
    console.log('Token ', token)
    req.logOut()
    res.redirect(`/login?token=${token}`)
  }
)

app.get('/here', function (req, res) {
  res.send('This is just for testing purposes')
})

module.exports = app
