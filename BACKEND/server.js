const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

// Get __dirname equivalent for CommonJS
const __dirname = path.dirname(require.main.filename);

const app = express();
const PORT = 9678;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Tanakit Inventory API',
    endpoints: [
      'GET /api/products - Get all products',
      'GET /api/namecard - Get user profile'
    ]
  });
});

// API route to fetch products from cloud JSON
app.get('/api/products', async (req, res) => {
  try {
    // TODO: Replace with your actual cloud URL
    const cloudUrl = 'http://nindam.sytes.net/var/www/html/Tanakit_inventory.json';
    
    // For local testing, use local file
    const fs = require('fs');
    const localPath = path.join(__dirname, '../Tanakit_inventory.json');
    
    if (fs.existsSync(localPath)) {
      const data = fs.readFileSync(localPath, 'utf8');
      const products = JSON.parse(data);
      res.json(products);
    } else {
      // Try to fetch from cloud URL
      const response = await axios.get(cloudUrl);
      res.json(response.data);
    }
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch products',
      message: error.message 
    });
  }
});

// API route to fetch namecard from cloud JSON
app.get('/api/namecard', async (req, res) => {
  try {
    // TODO: Replace with your actual cloud URL
    const cloudUrl = 'http://nindam.sytes.net/var/www/html/Tanakit_namecard.json';
    
    // For local testing, use local file
    const fs = require('fs');
    const localPath = path.join(__dirname, '../Tanakit_namecard.json');
    
    if (fs.existsSync(localPath)) {
      const data = fs.readFileSync(localPath, 'utf8');
      const namecard = JSON.parse(data);
      res.json(namecard);
    } else {
      // Try to fetch from cloud URL
      const response = await axios.get(cloudUrl);
      res.json(response.data);
    }
  } catch (error) {
    console.error('Error fetching namecard:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch namecard',
      message: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log(`- GET http://localhost:${PORT}/`);
  console.log(`- GET http://localhost:${PORT}/api/products`);
  console.log(`- GET http://localhost:${PORT}/api/namecard`);
});

module.exports = app;
