// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);  // Print the error stack trace to the console for debugging
  
  const statusCode = err.statusCode || 500;  // If the error has a status code, use it; otherwise, default to 500
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error'
  });
};

export default errorHandler;
