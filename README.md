# 🛒 Shopping-List-APP

## 📄 Description

A simple application to manage your shopping list. You can add, remove, and view products in your shopping list.

## 📋 Requirements

- Node.js
- npm

## 🚀 Getting Started

1. Clone the repository:
   ```sh
   git clone https://github.com/MiinaMagdy/Shopping-List-APP.git
   ```
2. Navigate to the project directory:
   ```sh
   cd Shopping-List-APP
   ```
3. Copy the `.env.example` file and rename it to `.env` and set the environment variables.
   ```sh
    cp .env.example .env
   ```
4. Install the dependencies:
   ```sh
   npm install
   ```
5. Build the project:
   ```sh
    npm run build
   ```
6. Start the server:
   ```sh
    npm start
   ```

## 📚 API Specifications

**API URL** = `http://localhost:3000/api`

### Products Endpoints

#### 🗄️ Get All Products

- **Path**: `/products`
- **Method**: `GET`
- **Description**: Retrieve all available products.
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/200-a?style=plastic&color=rgb(55%2C%20239%2C%200)>)
- **Response**:
  ```json
  [
  	{
  		"id": "c2662547-f442-427d-82ca-cf26e2ac5d7b",
  		"name": "Milk 🥛",
  		"stock": 2,
  		"price": 12.5
  	},
  	{
  		"id": "f95cefea-a589-4c70-8a92-e17a6cfbade2",
  		"name": "Bread 🍞",
  		"stock": 1,
  		"price": 5
  	}
  ]
  ```

#### 🗃️ Get a Product

- **Path**: `/products/:id`
- **Method**: `GET`
- **Description**: Retrieve a product from the available products by ID.
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/200-a?style=plastic&color=rgb(55%2C%20239%2C%200)>)
- **Response**:
  ```json
  {
  	"id": "c2662547-f442-427d-82ca-cf26e2ac5d7b",
  	"name": "Milk 🥛",
  	"stock": 2,
  	"price": 12.5
  }
  ```
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/404-a?style=plastic&color=rgb(239%2C%2055%2C%200)>)
- **Response**:
  ```json
  {
  	"status": "fail",
  	"message": "Product with id f95cefea-a589-4c70-8a92-e17a6cfbade2 not found",
  	"errors": []
  }
  ```

#### ➕ Add a Product

- **Path**: `/products`
- **Method**: `POST`
- **Description**: Add a new product to the available products.
- **Request Body**:
  ```json
  {
  	"name": "Eggs 🥚",
  	"stock": 12,
  	"price": 2.5
  }
  ```
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/201-a?style=plastic&color=rgb(55%2C%20239%2C%200)>)
- **Response**:
  ```json
  {
  	"id": "1311a25a-4e08-4518-b0c5-dfe6e9385926",
  	"name": "Eggs 🥚",
  	"stock": 12,
  	"price": 2.5
  }
  ```
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/422-a?style=plastic&color=rgb(239%2C%2055%2C%200)>)
- **Response**:
  ```json
  {
  	"status": "fail",
  	"message": "Invalid input.",
  	"errors": ["body.name Name must be at least 2 characters long."]
  }
  ```

#### ❌ Remove a Product

- **Path**: `/products/:id`
- **Method**: `DELETE`
- **Description**: Remove a product from the available products by ID.
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/204-a?style=plastic&color=rgb(55%2C%20239%2C%200)>)
- **Response**:
  ```json
  {
  	"message": "Product deleted successfully"
  }
  ```
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/404-a?style=plastic&color=rgb(239%2C%2055%2C%200)>)
- **Response**:
  ```json
  {
  	"status": "fail",
  	"message": "Product with id f95cefea-a589-4c70-8a92-e17a6cfbade2 not found",
  	"errors": []
  }
  ```

#### 🔄 Update a Product

- **Path**: `/products/:id`
- **Method**: `PUT`
- **Description**: Update a product in the available products by ID.
- **Request Body**:
  ```json
  {
  	"name": "Butter 🧈",
  	"stock": 2,
  	"price": 3.5
  }
  ```
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/200-a?style=plastic&color=rgb(55%2C%20239%2C%200)>)
- **Response**:
  ```json
  {
  	"id": "f33bda3a-c7fa-42f1-ad95-5692d0abe35d",
  	"name": "Butter 🧈",
  	"stock": 2,
  	"price": 3.5
  }
  ```
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/404-a?style=plastic&color=rgb(239%2C%2055%2C%200)>)
- **Response**:
  ```json
  {
  	"status": "fail",
  	"message": "Product with id f95cefea-a589-4c70-8a92-e17a6cfbade2 not found",
  	"errors": []
  }
  ```
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/422-a?style=plastic&color=rgb(239%2C%2055%2C%200)>)
- **Response**:
  ```json
  {
  	"status": "fail",
  	"message": "Invalid input.",
  	"errors": ["body.name Name must be at least 2 characters long."]
  }
  ```
