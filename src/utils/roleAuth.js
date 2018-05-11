import db from '../models';

const { User } = db;
const roleAuth = roles => {
  const roleAuthorization = async (req, res, next) => {
    const { user } = req;
    const foundUser = await User.findOne({ where: { id: user.id } });
    if (!foundUser) {
      return res.status(422).json({ error: 'No user found.' });
    }
    if (roles.indexOf(foundUser.role) > -1) {
      return next();
    }

    return res
      .status(401)
      .json({ status: false, error: 'You are not authorized to view this content' });
  };
  return roleAuthorization;
};

export default roleAuth;
