import express from 'express';
import morgan from 'morgan';
import articles from './api/articles';
import authMiddleware from './api/security/authMiddleware';
import mongoose from 'mongoose';

const isProduction = process.env.NODE_ENV === 'production';

const server = express();

mongoose.connect('mongodb://localhost/wordcraft', {useNewUrlParser: true});
mongoose.connection.on('open', async () => {
  if (!isProduction) {
    await mongoose.connection.db.dropDatabase();
  }

  require('./models/Article');
  require('./models/User');

  if (!isProduction) {
    require('./initDB').default();
  }
  server.use(morgan('dev'));
  server.use(authMiddleware());
  server.use('/articles', articles);
  server.listen('3000', () => console.log('listening on port 3000'));
});
