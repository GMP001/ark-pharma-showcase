# ARK Pharma - Pharmacy Management System

## Live Demo
- **Frontend**: https://incandescent-chimera-5ec01a.netlify.app
- **Backend API**: https://ark-pharma-api-vi.onrender.com

## Features

## ✨ Core Features

### For Pharmacy Owners
- **Dashboard Analytics**: Real-time sales, profits, expenses
- **Multi-branch Support**: Manage multiple locations
- **Expiry Management**: Automated alerts for expiring products
- **Supplier Management**: Track orders, payments, history

### For Pharmacists
- **Quick Billing**: POS-style interface for fast checkout
- **Prescription Scanning**: Upload and reference prescriptions
- **Stock Alerts**: Low inventory notifications
- **Customer History**: View purchase history

### For Accountants
- **GST/Tax Calculation**: Automated tax handling
- **Expense Tracking**: Operational cost management
- **Profit Reports**: Daily/Monthly/Yearly reports
- **Audit Logs**: Complete transaction history

## 🛠️ Technology Stack

### Frontend
```json
{
  "framework": "React 18",
  "language": "TypeScript",
  "state": "Context API + React Query",
  "ui": "Material-UI",
  "charts": "Chart.js",
  "http": "Axios"
}

## Tech Stack
- React + TypeScript (Frontend)
- Node.js + Express (Backend)
- PostgreSQL (Database)

## Quick Start
1. Clone the repo
2. Run `npm install` in both frontend and backend folders
3. Configure environment variables
4. Run `npm run dev`


## Screenshots

![Dashboard](screenshots/dashboard.png)
![Inventory](screenshots/inventory.png)

## Demo Access**: Contact us for test credentials
Your Name - golammdpasha@gmail.com
WhatsApp - +8801919063497


## 🎯 Why ARK Pharma?

ARK Pharma is a **complete, production-ready pharmacy management system** trusted by multiple pharmacy businesses. Unlike generic solutions, ARK Pharma is built specifically for:

- ✅ Multi-tenant pharmacy chains
- ✅ Regulatory compliance (prescription tracking)
- ✅ Real-time inventory management
- ✅ Billing & tax calculation (BDT currency)

## 📈 Key Metrics

| Metric | Value |
|--------|-------|
| **Total Sales Processed** | 615,574.7 BDT |
| **Database Tables** | 88 (normalized schema) |
| **Active Tenants** | Multiple (tested) |
| **Response Time** | <200ms average |

## 🏗️ System Architecture


┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ React │────▶│ Node.js │────▶│ PostgreSQL │
│ Frontend │◀────│ Backend │◀────│ Database │
│ (Netlify) │ │ (Render) │ │ (Singapore)│
└─────────────┘ └─────────────┘ └─────────────┘
│
▼
┌─────────────┐
│ JWT Auth │
│ RBAC │
│ CORS │
└─────────────┘


