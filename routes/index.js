const express = require('express');
const router = express.Router();
const lazada_product = require('../models/lazada-product');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/product', function (req, res) {
    const productURL = req.body.productURL;
    lazada_product.getProductLazada(productURL).then((product) => {
        res.json(product);
    }).catch((err) => {
        res.status(200).end(err);
    });

});
module.exports = router;
