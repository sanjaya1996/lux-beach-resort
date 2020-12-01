const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const roomRoutes = require('./routes/roomRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load config
dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Room routes
app.use('/api/rooms', roomRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
