const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

//middlewares
// Set security http headers
app.use(helmet());

//development logging

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//rate limiter, limiting API requests

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP please try again in one hour',
});

app.use('/api', limiter);

// Body parser, reading data from body

app.use(express.json({ limit: '10kb' }));

// Data sanitazation agains NoSQL query injection
app.use(mongoSanitize());

// Data sanitaization against XSS
app.use(xss());

// Prevent parameter polluction
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAvergae',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

//serving static files

app.use(express.static(`${__dirname}/public`));

//test middleware

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);

  next();
});

//mounting routers

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
