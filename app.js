const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Function to generate 1000 sample products with random images
function generateProducts() {
    const categories = ['Electronics', 'Clothing', 'Home', 'Books', 'Toys'];
    const subCategories = {
        'Electronics': ['Phones', 'Laptops', 'Cameras'],
        'Clothing': ['Men\'s Wear', 'Women\'s Wear', 'Kids'],
        'Home': ['Furniture', 'Kitchen', 'Decor'],
        'Books': ['Fiction', 'Non-Fiction', 'Comics'],
        'Toys': ['Educational', 'Action Figures', 'Puzzles']
    };
    const imageUrls = [
        'https://m.media-amazon.com/images/I/71pcz1kOvxL._AC_SY741_.jpg',
        'https://m.media-amazon.com/images/I/71iMDzwyy7L._AC_UL320_.jpg',
        'https://m.media-amazon.com/images/I/71CAFNHIM2L._AC_SY395_.jpg',
        'https://m.media-amazon.com/images/I/615WsJuy5jL._AC_UL320_.jpg'
    ];
    const products = [];

    for (let i = 1; i <= 1000; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const subCategory = subCategories[category][Math.floor(Math.random() * subCategories[category].length)];
        const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

        products.push({
            id: i,
            name: `Product ${i}`,
            category: category,
            subCategory: subCategory,
            price: (Math.random() * 100).toFixed(2),
            imageUrl: imageUrl
        });
    }
    return products;
}

// Generate 1000 products and store them in memory
const products = generateProducts();

// REST API endpoint to get products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Route for gridwall page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/gridwall.html');
});

// Route for cart page
app.get('/cart', (req, res) => {
    res.sendFile(__dirname + '/views/cart.html');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
