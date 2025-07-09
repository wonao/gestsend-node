require('dotenv').config();
const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const prospectRoutes = require('./routes/prospectRoutes');
const clientRoutes = require('./routes/clientRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const statsRoutes = require('./routes/statsRoutes');
const logRoutes = require('./routes/logRoutes');
const logMiddleware = require('./middlewares/logMiddleware');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

app.use(express.json());
app.use(logMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/prospects', prospectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/logs', logRoutes);
app.use(errorHandler);

const publicDir = path.resolve(__dirname, '../public');
app.use(express.static(publicDir));
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

