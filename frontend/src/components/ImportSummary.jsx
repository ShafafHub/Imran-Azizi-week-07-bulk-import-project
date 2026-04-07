import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const ImportSummary = ({ summary, errors, onClose }) => {
  const { total, success, failed } = summary;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Import Summary</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-700">{total}</div>
          <div className="text-sm text-gray-500">Total Rows</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{success}</div>
          <div className="text-sm text-green-600">Successful</div>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{failed}</div>
          <div className="text-sm text-red-600">Failed</div>
        </div>
      </div>
      
      {errors.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            Errors Details
          </h4>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {errors.map((error, index) => (
              <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-start">
                  <XCircle className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-red-800">
                      Row {error.row}
                    </div>
                    <ul className="mt-1 text-sm text-red-700 list-disc list-inside">
                      {error.errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                    {error.data && (
                      <details className="mt-2">
                        <summary className="text-xs text-red-600 cursor-pointer">
                          View row data
                        </summary>
                        <pre className="mt-1 text-xs bg-red-100 p-2 rounded overflow-x-auto">
                          {JSON.stringify(error.data, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {success > 0 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-green-700">
              Successfully imported {success} product{success !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportSummary;