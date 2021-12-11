const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const GoogleStrategy = require('passport-google-oauth2').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
// const GoogleStrategy = require('passport-google-oauth').OAuthStrategy
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
      // consumerKey:
      //   '568264793203-bt6todb2a2iraaogv4vl03u6v58u7cb3.apps.googleusercontent.com',
      // consumerSecret: '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',
      // consumerKey:
      //   '146368006291-l4elgu53dhcntn04iv69rntdjea0u09n.apps.googleusercontent.com',
      // consumerSecret: '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',
      clientID:
        '146368006291-l4elgu53dhcntn04iv69rntdjea0u09n.apps.googleusercontent.com',
      clientSecret: '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',
      // callbackURL: 'https://cbda-105-112-150-193.ngrok.io/auth/google/callback',
      // callbackURL: `${appUrl}/auth/google/callback`,
      // callbackURL: 'https://paperdaz-dev.herokuapp.com/auth/google/callback',
      callbackURL: `http://localhost:3000/auth/google/callback`,
      passReqToCallback: true,
    },
    (request, token, tokenSecret, profile, done) => {
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
      callbackURL: 'https://996f-41-190-3-24.ngrok.io/auth/facebook/callback',
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

app.get('/here', function (req, res) {
  res.send('This is just for testing purposes')
})

module.exports = app
