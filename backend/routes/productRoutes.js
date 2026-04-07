const express = require('express');
const multer = require('multer');
const ProductController = require('../controllers/productController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', ProductController.getAllProducts);
router.post('/', ProductController.createProduct);
router.post('/bulk-import', upload.single('file'), ProductController.bulkImport);
router.delete('/all', ProductController.deleteAllProducts);

module.exports = router;