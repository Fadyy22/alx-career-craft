const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const companyRoute = require('./companyRoute');

const mountRoutes = (app) => {
  app.use('/auth', authRoute);
  app.use('/users', userRoute);
  app.use('/company', companyRoute);
};

module.exports = mountRoutes;
