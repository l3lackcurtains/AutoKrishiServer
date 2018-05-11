import Jwt from 'passport-jwt';

import { User } from '../models';
import config from './config';

const { Strategy, ExtractJwt } = Jwt;

const jwtAuth = passport => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  options.secretOrKey = config.secret;
  passport.use(
    new Strategy(options, async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (e) {
        throw new Error(e);
      }
    })
  );
};

export default jwtAuth;
