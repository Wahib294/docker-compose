const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');


const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:password@db:5432/mydatabase'
});


// Serve static files from the React app
app.use(express.static(path.join(__dirname, './../../frontend/dist')));

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.get('/staff', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM staff');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Catch-all handler for any request that doesn't match the above routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './../../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

