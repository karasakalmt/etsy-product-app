const Product = require('../models').Product;
const etsyScraper = require('../utils/scraper');

//Normally I make end points for front-end and return objects but for the ease of developing front-end I passed the data and rendered.

exports.getAll = async (req, res) => {
    const productsObjArr = await Product.findAll()
    const products = productsObjArr.map((p) => p.dataValues)
    res.render('products', { products });
}

exports.getParticular = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findAll({ where: { id: id } });
    res.render('product', { product: product[0].dataValues});
}

exports.addView = async (req, res) => {
    res.render('addProduct');
}

exports.add = async (req, res) => {
    const {url} = req.body;
    const data = await etsyScraper(url);
    const product = await Product.create(data);
    res.render('product', { product: product.dataValues });
}
