const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up static file serving for other assets
app.use(express.static(path.join(__dirname, 'public')));

// Sample legal information data
const legalData = require('./legalData');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes
app.get('/api/laws', (req, res) => {
  res.json(legalData);
});

app.get('/api/laws/:id', (req, res) => {
  const lawId = parseInt(req.params.id);
  const law = legalData.find((item) => item.id === lawId);

  if (!law) {
    return res.status(404).json({ error: 'Law not found' });
  }

  res.json(law);
});

app.get('/api/search', (req, res) => {
  const query = req.query.q.toLowerCase();

  // Logging for debugging purposes
  console.log("Query:", query);

  const results = legalData.filter((item) => {
    console.log("Item:", item);
    console.log("Item Title:", item.title); // Check if item.title is defined
    console.log("Item Content:", item.content); // Check if item.content is defined
    console.log("Item Article Number:", item.articleNumber);

    return (item.title && item.title.toLowerCase().includes(query)) || 
           (item.content && item.content.toLowerCase().includes(query))||
           (item.articleNumber && item.articleNumber.toString().toLowerCase().includes(query));
  });

  res.json(results);
});


// Serve the single HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
