const express = require('express');
const app = express();
const port = 3000;

// Sample in-memory product data
const products = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Smartphone', price: 699 },
  { id: 3, name: 'Headphones', price: 199 }
];

// List all products
app.get('/products', (req, res) => {
  res.json(products);
});

// View a single product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Product service running at http://localhost:${port}`);
});
