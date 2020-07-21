const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const Student = require('../models/student')

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        const newStudent = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          image: profile.photos[0].value
        }
        try {
          let student = await Student.find({googleId: profile.id})
          if(student) {
            done(null, student)
          } else {
            student = await Student.create(newStudent)
            done(null, student)
          }
        }
        catch (err) {
          console.log(err)
        }
    }))

    passport.serializeUser(function(user, done) {
      done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
      done(null, user);
    });
}