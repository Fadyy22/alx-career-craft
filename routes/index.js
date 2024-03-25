const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const companyRoute = require('./companyRoute');
const jobRoute = require('./jobRoute');

const mountRoutes = (app) => {
  app.use('/auth', authRoute);
  app.use('/users', userRoute);
  app.use('/company', companyRoute);
  app.use('/jobs', jobRoute);
};

module.exports = mountRoutes;
