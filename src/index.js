import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import passport from 'passport';
import expressValidator from 'express-validator';

import models from './models';
import jwtAuth from './utils/passport';
// import transaction from './routes/transaction';
import user from './routes/user';
import greenhouse from './routes/greenhouse';

const app = express();
const port = process.env.PORT || 3000;

// server setup
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }));
app.use(helmet());
app.use(expressValidator());

// Passport Initialization
app.use(passport.initialize());
jwtAuth(passport);

app.get('/', (req, res) => {
  res.send('This is the webapp.');
});

// All the api endpoints
app.use('/api', user);
app.use('/api', greenhouse);

// Check the connection of database
models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(port, () => {
  console.log(`
    <==============================================>
    [+] Server running on port: ${port}
    <==============================================>
    `);
});
