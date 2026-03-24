# Bulk Import Feature - Product CSV Importer

A full-stack application that enables bulk import of products from CSV files with validation, error reporting, and database persistence. Built with React, Express, MongoDB, and TailwindCSS.

## 🚀 Features

- **CSV File Upload**: Drag-and-drop or click to upload CSV files
- **Row-Level Validation**: Validate each product row with comprehensive rules
- **Error Reporting**: Detailed error messages for invalid rows
- **Duplicate Detection**: Handle duplicate SKUs gracefully
- **Import Summary**: View success/failure counts after import
- **Preview Results**: See recently imported products
- **Responsive Design**: Fully responsive UI with TailwindCSS
- **Real-time Feedback**: Toast notifications and loading states

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or pnpm package manager

## 🛠️ Tech Stack

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Multer** - File upload handling
- **csv-parse** - CSV parsing

### Frontend
- **React.js** - UI library
- **TailwindCSS** - Styling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons
- **Vite** - Build tool

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/bulk-import.git
cd bulk-import

cd backend
npm install

// .env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bulk_import
NODE_ENV=development
npm run dev