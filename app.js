const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const stockRoutes = require('./routes/stock');
const transactionRoutes = require('./routes/transactions');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/transactions', transactionRoutes);

module.exports = app;