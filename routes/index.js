const authRoute = require('./authRoute');

const mountRoutes = (app) => {
  app.use('/auth', authRoute);
  app.use('/users', userRoute);
};

module.exports = mountRoutes;
