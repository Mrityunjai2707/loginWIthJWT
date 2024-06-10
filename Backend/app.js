const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const userRouter = require('./routes/userRoutes');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const app = express();
const monoSanitize=require('express-mongo-sanitize');
const xss = require('xss-clean');
//set security http request
app.use(helmet())
//set limit on api
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again in 15 minutes!'
});
app.use('/api', limiter);
app.use(monoSanitize());
app.use(xss());

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Custom Middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});+

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/api/v1/users', userRouter);


// Error Handling Middleware
app.all('*', (req, res, next) => {
  next(new AppErorr(`Can't find ${req.originalUrl} on this server`));
});



module.exports = app;
