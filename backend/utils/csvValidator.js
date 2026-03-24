class CSVValidator {
  static validateProductRow(row, rowIndex) {
    const errors = [];
    
    // Required fields validation
    if (!row.name || row.name.trim() === '') {
      errors.push('Product name is required');
    }
    
    if (!row.price) {
      errors.push('Price is required');
    } else {
      const price = parseFloat(row.price);
      if (isNaN(price) || price < 0) {
        errors.push('Price must be a valid positive number');
      }
    }
    
    if (!row.category || row.category.trim() === '') {
      errors.push('Category is required');
    }
    
    // Optional fields validation
    if (row.stock) {
      const stock = parseInt(row.stock);
      if (isNaN(stock) || stock < 0) {
        errors.push('Stock must be a valid non-negative number');
      }
    }
    
    if (row.sku && row.sku.length > 50) {
      errors.push('SKU must be less than 50 characters');
    }
    
    if (row.description && row.description.length > 500) {
      errors.push('Description must be less than 500 characters');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      rowIndex
    };
  }
  
  static transformRow(row) {
    return {
      name: row.name?.trim(),
      price: parseFloat(row.price),
      category: row.category?.trim(),
      stock: row.stock ? parseInt(row.stock) : 0,
      description: row.description?.trim(),
      sku: row.sku?.trim()
    };
  }
}

module.exports = CSVValidator;