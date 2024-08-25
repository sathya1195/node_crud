const express = require('express');
const productController = require('../controllers/productController');
const upload = require('../middleware/multer');
const { validateProduct, validateFileUpload } = require('../middleware/validation');

const router = express.Router();

router.post('/products',
    upload.single('image'),
    validateProduct,    
    productController.createProduct
);


router.get('/products', productController.getProducts);


router.get('/products/:id', productController.getProductById);


router.put('/products/:id',
    upload.single('image'),
    validateProduct,    
    productController.updateProduct
);


router.delete('/products/:id', productController.deleteProduct);

router.post('/products/:id/upload',
    upload.single('image'),
    validateFileUpload,
    productController.uploadProductImage
);

module.exports = router;
