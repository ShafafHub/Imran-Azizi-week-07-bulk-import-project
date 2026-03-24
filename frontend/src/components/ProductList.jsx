import React from 'react';
import { Package, DollarSign, Archive, Tag } from 'lucide-react';

const ProductList = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
        <p className="mt-1 text-sm text-gray-500">
          Import products using the CSV uploader above.
        </p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SKU
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                    {product.description && (
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {product.description}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <Tag className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900">{product.category}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-900">
                    {product.price.toFixed(2)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <Archive className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900">{product.stock}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {product.sku || 'N/A'}
                </code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;