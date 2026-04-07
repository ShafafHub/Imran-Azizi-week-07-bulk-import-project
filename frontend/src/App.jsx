import React, { useState, useEffect } from "react";
import FileUploader from "./components/FileUploader";
import ImportSummary from "./components/ImportSummary";
import ProductList from "./components/ProductList";
import { productService } from "./services/api";
import { Upload, RefreshCw, AlertCircle } from "lucide-react";

function App() {
  const [products, setProducts] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts();
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    setError(null);

    try {
      const response = await productService.bulkImport(formData);
      setUploadResult(response.data);

      // Refresh product list after successful import
      if (response.data.summary.success > 0) {
        await fetchProducts();
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to import file");
      console.error("Error uploading file:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClearImport = () => {
    setUploadResult(null);
  };

  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete all products?")) {
      try {
        await productService.deleteAllProducts();
        await fetchProducts();
        setError(null);
      } catch (err) {
        setError("Failed to delete products");
        console.error("Error deleting products:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bulk Product Import
          </h1>
          <p className="mt-2 text-gray-600">
            Upload CSV files to import products in bulk
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Import Products
            </h2>
            {products.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Delete All Products
              </button>
            )}
          </div>

          <FileUploader
            onFileSelect={handleFileUpload}
            isUploading={isUploading}
          />

          {isUploading && (
            <div className="mt-4 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Processing CSV file...</span>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
        </div>

        {/* Import Summary */}
        {uploadResult && (
          <div className="mb-8">
            <ImportSummary
              summary={uploadResult.summary}
              errors={uploadResult.errors}
              onClose={handleClearImport}
            />
          </div>
        )}

        {/* Product List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Products ({products.length})
            </h2>
            <button
              onClick={fetchProducts}
              className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : (
            <ProductList products={products} />
          )}
        </div>

        {/* CSV Format Example */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            CSV Format Example
          </h3>
          <pre className="text-xs text-blue-800 overflow-x-auto">
            {`name,price,category,stock,description,sku
Wireless Mouse,29.99,Electronics,150,Ergonomic wireless mouse,WM-001
Mechanical Keyboard,89.99,Electronics,75,RGB mechanical keyboard,MK-001
USB-C Cable,12.99,Accessories,500,Durable USB-C cable,UC-001`}
          </pre>
          <p className="text-xs text-blue-700 mt-2">
            Note: Name, price, and category are required fields. Stock defaults
            to 0 if not provided.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
