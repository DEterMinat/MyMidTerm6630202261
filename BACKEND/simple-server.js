const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9678;

// Simple server without external dependencies
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  const url = req.url;
  
  if (url === '/') {
    res.writeHead(200);
    res.end(JSON.stringify({ 
      message: 'Welcome to Tanakit Inventory API',
      endpoints: [
        'GET /api/products - Get all products',
        'GET /api/namecard - Get user profile'
      ]
    }));
  }
  else if (url === '/api/products') {
    try {
      const localPath = path.join(__dirname, '../Tanakit_inventory.json');
      
      if (fs.existsSync(localPath)) {
        const data = fs.readFileSync(localPath, 'utf8');
        res.writeHead(200);
        res.end(data);
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Products file not found' }));
      }
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Failed to read products file' }));
    }
  }
  else if (url === '/api/namecard') {
    try {
      const localPath = path.join(__dirname, '../Tanakit_namecard.json');
      
      if (fs.existsSync(localPath)) {
        const data = fs.readFileSync(localPath, 'utf8');
        res.writeHead(200);
        res.end(data);
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Namecard file not found' }));
      }
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Failed to read namecard file' }));
    }
  }
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Simple server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log(`- GET http://localhost:${PORT}/`);
  console.log(`- GET http://localhost:${PORT}/api/products`);
  console.log(`- GET http://localhost:${PORT}/api/namecard`);
});

module.exports = server;
