const mongoose = require('mongoose');

const dbConnection = async (app) => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`Database connected ${conn.connection.host}`);
    await app.listen(process.env.PORT);
    console.log(`Listening on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  };
};

module.exports = dbConnection;
