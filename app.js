const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use(expressLayouts);
app.set('view engine', 'ejs');

const port = 3000;
const db = require('./models');
const ProductController = require("./controllers/ProductController");

// Initializing DB connection, and starting API
db.sequelize.sync()
.then((req) => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}...`);
    });
})
.catch((err)=>{
    console.log(err);
});

// I normally use Routes, and Controllers in different folders, but now there are 3 endpoints I will only seperate controller.
app.get('/', (req, res) => res.redirect('/all-products'));

app.get('/all-products', ProductController.getAll);

app.get('/product/:id', ProductController.getParticular);

app.get('/add-product', ProductController.addView);
app.post('/add-product', ProductController.add);