const { User } = require("../models");
require("dotenv").config();
// config passport jwt
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const passport = require("passport");
//config jwt strategy option
const option = {
  secretOrKey: process.env.JWT_SECRET_KEY, //define secret key to verify token
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // define where to extract jwt from
};

//verify token
//if success excute callback faction (payload, done) => payload is token payload, done is call back function
//if invalid token sent response with status 401 and message Unauthorized
const jwtStrategy = new JwtStrategy(option, async (payload, done) => {
  // console.log(payload);
  const user = await User.findOne({ where: { id: payload.id } });
  if (!user) {
    return done(null, false);
  }
  // done has 2 parameters: err, user (req.user)
  done(null, user); // req.user = 'Success Token Verification'; next()
});

// apply strategy to passport
passport.use("jwt", jwtStrategy);
