const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

//server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
