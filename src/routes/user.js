import express from 'express';
import passport from 'passport';

import db from '../models';

const router = express.Router();
const { User } = db;

/*
 ***************************************
 * User Registration
 * *************************************
*/

router.post('/register', (req, res) => {
  // Request Validation
  req.check('email', 'Email field is empty.').notEmpty();
  req.check('email', 'Invalid email.').isEmail();
  req.check('password', 'Password field is empty.').notEmpty();
  req.check('password', 'Password length is less than 6.').isLength({ min: 6 });
  req.check('firstname', 'Firstname field is empty.').notEmpty();
  req.check('lastname', 'Lastname field is empty.').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    const messages = [];
    errors.forEach(error => {
      messages.push(error.msg);
    });
    const newErrors = errors.map(err => `${err.msg}`);
    return res.json({
      success: false,
      message: 'Something went wrong.',
      errors: newErrors
    });
  }

  return User.sync().then(() =>
    User.findOne({ where: { email: req.body.email } }).then(user => {
      if (user) {
        return res.json({
          success: false,
          message: 'User with this email already exist.'
        });
      }

      const userData = {
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
      };

      return User.create(userData).then(newUser => {
        if (!newUser) {
          return res.json({
            success: false,
            message: 'Something went wrong, Try again.'
          });
        }

        return res.json({
          success: true,
          message: 'User successfully registered.'
        });
      });
    })
  );
});

/*
 ***************************************
 * User Authentication
 * *************************************
*/
router.post('/authenticate', (req, res) => {
  // Request Validation
  req.check('email', 'Email field is empty.').notEmpty();
  req.check('email', 'Invalid email.').isEmail();
  req.check('password', 'Password field is empty.').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    const messages = [];
    errors.forEach(error => {
      messages.push(error.msg);
    });
    const newErrors = errors.map(err => `${err.msg}`);
    return res.json({
      success: false,
      message: 'Something went wrong.',
      errors: newErrors
    });
  }

  const userData = {
    email: req.body.email,
    password: req.body.password
  };

  return User.sync().then(() =>
    User.findOne({ where: { email: userData.email } }).then(user => {
      if (!user) {
        return res.json({
          success: false,
          message: "User with this email doesn't exist."
        });
      }
      const comparePass = user.comparePassword(userData.password);
      return comparePass.then(pass => {
        if (!pass) {
          return res.json({ success: false, message: 'Incorrect Password.' });
        }
        const token = user.getJWT();
        return res.json({ success: true, token });
      });
    })
  );
});

/*
 ***************************************
 * Get Users List
 * *************************************
*/
router.get('/users', passport.authenticate('jwt', { session: false }), (req, res) =>
  User.sync().then(async () => {
    try {
      const users = await User.findAll();
      if (!users) {
        return res.json({
          success: false,
          message: "Users couldn't be fetched."
        });
      }
      return res.json({
        success: true,
        message: 'Users successfully fetched.',
        data: users
      });
    } catch (e) {
      return res.json({
        success: false,
        message: "Users couldn't be fetched.",
        error: e
      });
    }
  })
);

/*
 ***************************************
 * Get Single Users
 * *************************************
*/
router.get('/users/:id', (req, res) =>
  User.sync().then(async () => {
    try {
      const users = await User.findOne({ where: { id: req.params.id } });
      if (!users) {
        return res.json({
          success: false,
          message: "User couldn't be fetched."
        });
      }
      return res.json({
        success: true,
        message: 'User successfully fetched.',
        data: users
      });
    } catch (e) {
      return res.json({
        success: false,
        message: "User couldn't be fetched.",
        error: e
      });
    }
  })
);

/*
 ***************************************
 * delete user
 * *************************************
*/
router.delete('/users/:id', async (req, res) => {
  try {
    const deleteUser = await User.destroy({ where: { id: req.params.id } });
    if (!deleteUser) {
      return res.json({
        success: false,
        message: "User couldn't be deleted."
      });
    }
    return res.json({
      success: true,
      message: 'User successfully deleted.'
    });
  } catch (e) {
    return res.json({
      success: false,
      message: "User couldn't be deleted.",
      error: e
    });
  }
});

/*
 ***************************************
 * Update user
 * *************************************
*/
router.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.update(
      { firstname: 'Milan Poudel' },
      { where: { id: req.params.id } }
    );
    if (!updatedUser) {
      return res.json({
        success: false,
        message: "User couldn't be updated."
      });
    }
    return User.findOne({ where: { id: req.params.id } }).then(user =>
      res.json({
        success: true,
        message: 'User successfully updated.',
        data: user
      })
    );
  } catch (e) {
    return res.json({
      success: false,
      message: "User couldn't be updated.",
      error: e
    });
  }
});

export default router;
