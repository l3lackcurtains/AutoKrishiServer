import Jwt from 'passport-jwt';

import db from '../models';
import config from './config';

const { Strategy, ExtractJwt } = Jwt;
const { User } = db;

const jwtAuth = passport => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  options.secretOrKey = config.secret;
  passport.use(
    new Strategy(options, async (jwtPayload, done) => {
      try {
        const user = await User.findOne({ where: { id: jwtPayload.uid } });
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (e) {
        throw new Error(e);
      }
    })
  );
};

export default jwtAuth;
