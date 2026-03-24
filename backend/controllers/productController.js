const Product = require('../models/Product');
const CSVValidator = require('../utils/csvValidator');
const csv = require('csv-parser');
const { Readable } = require('stream');

class ProductController {
  // Get all products
  static async getAllProducts(req, res) {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // Bulk import products from CSV
  static async bulkImport(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      const results = [];
      const errors = [];
      let rowIndex = 0;
      
      // Parse CSV from buffer
      const buffer = req.file.buffer;
      const readableStream = Readable.from(buffer.toString());
      
      await new Promise((resolve, reject) => {
        readableStream
          .pipe(csv())
          .on('data', (row) => {
            rowIndex++;
            
            // Validate row
            const validation = CSVValidator.validateProductRow(row, rowIndex);
            
            if (validation.isValid) {
              const transformedRow = CSVValidator.transformRow(row);
              results.push(transformedRow);
            } else {
              errors.push({
                row: rowIndex,
                errors: validation.errors,
                data: row
              });
            }
          })
          .on('end', resolve)
          .on('error', reject);
      });
      
      // Save valid products to database
      let savedCount = 0;
      const savedProducts = [];
      
      for (const productData of results) {
        try {
          // Check for duplicate SKU
          if (productData.sku) {
            const existingProduct = await Product.findOne({ sku: productData.sku });
            if (existingProduct) {
              errors.push({
                row: 'SKU duplicate',
                errors: [`Product with SKU ${productData.sku} already exists`],
                data: productData
              });
              continue;
            }
          }
          
          const product = new Product(productData);
          await product.save();
          savedCount++;
          savedProducts.push(product);
        } catch (error) {
          errors.push({
            row: 'database',
            errors: [error.message],
            data: productData
          });
        }
      }
      
      res.json({
        success: true,
        summary: {
          total: rowIndex,
          success: savedCount,
          failed: errors.length
        },
        errors: errors,
        products: savedProducts
      });
      
    } catch (error) {
      console.error('Bulk import error:', error);
      res.status(500).json({ error: error.message });
    }
  }
  
  // Create single product
  static async createProduct(req, res) {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  // Delete all products (for testing)
  static async deleteAllProducts(req, res) {
    try {
      await Product.deleteMany({});
      res.json({ message: 'All products deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;