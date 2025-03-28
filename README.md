# *8E-commerce Admin Panel - Product Module**

This project is an Admin Panel for managing products in an E-commerce platform. It allows administrators to perform CRUD (Create, Read, Update, Delete) operations on product details such as SKU, Name, Price, and Images.
 --- 

> #Technologies Used
Frontend: Angular (17/18), TypeScript

Backend: Node.js, TypeScript, Express.js, TypeORM

Database: PostgreSQL

Other: HTML, CSS (Bootstrap for styling)


## **📌 Step 1: Clone the GitHub Repository**
To clone the repository, run the following command:

```bash
git clone https://github.com/AGuptaWorks01/E_commerce_Ts_MEAN
```
```bash
cd E_commerce_Ts_MEAN
```

Installing Dependencies
For Backend (Node.js + TypeORM)
Navigate to the backend folder and install the dependencies:

cd backend
```bash
npm install
```

For Frontend (Angular)
Navigate to the frontend folder and install the dependencies:


cd frontend
```bash
npm install
```
Frontend Setup
The frontend of the Admin Panel is built using Angular 17/18. It includes components for:

Listing products

Adding new products

Editing existing products

Deleting products

Backend Setup
The backend is built using Node.js and Express.js, with TypeORM for interacting with the PostgreSQL database. The backend exposes API endpoints to perform CRUD operations on products.

Database Setup
PostgreSQL Setup
Create a PostgreSQL database named ecommerce_admin_panel.

-- Set up the database connection in the backend (ormconfig.json):

{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "your_db_username",
  "password": "your_db_password",
  "database": "ecommerce_admin_panel",
  "entities": ["src/entity/**/*.ts"],
  "synchronize": true,
  "logging": true
}
`
``` 
---
Running the Application
1. **Running the Backend**
To start the backend server, navigate to the backend folder and run:


```bash
cd backend

npm run dev:watch
The backend will be running at `http://localhost:3000`.
```

2. **Running the Frontend**:
To start the Angular frontend, navigate to the frontend folder and run:

```bash
cd frontend
ng serve
The frontend will be running at `http://localhost:4200`.
```

> **API Routes**   
Method   	Endpoint			Description   
GET			/products			Fetch all products  
GET			/products/:id		View One Product  
POST		/products			Create a new product   
PUT			/products/:id		Update an existing product   
DELETE		/products/:id		Delete a product   
