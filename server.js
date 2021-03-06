const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
require('dotenv').config();

// port config
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// add after Express middleware Use API routes
app.use('/api', apiRoutes);

// default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
