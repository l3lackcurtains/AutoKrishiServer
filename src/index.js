import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import transaction from './routes/transaction';

const app = express();
const port = process.env.PORT || 3000;

// server setup
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }));
app.use(helmet());

app.get('/', (req, res) => {
  res.send('This is the webapp.');
});

app.use('/api', transaction);

require('./model');

app.listen(port, () => {
  console.log(`
==============================================
[+] Server running on port: ${port}
==============================================
    `);
});
