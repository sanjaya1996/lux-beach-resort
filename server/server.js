const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const roomRoutes = require('./routes/roomRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load config
dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Room routes
app.use('/api/rooms', roomRoutes);

// File upload routes
app.use('/api/upload', uploadRoutes);

// Make uploads folder static
app.use('/uploads', express.static('/uploads'));

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
