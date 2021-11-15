const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE;
//below commented out code used a replace method for security purposes replaceing the <PASSWORD> string with the process.env.PASSWORD but for some reason didn't work correctly so I entered the password manually.
// .replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASWORD
// );

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');
  });

//server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
