# 🛒 Shopping-List-APP

![Testing workflow](https://github.com/MiinaMagdy/Shopping-List-APP/actions/workflows/test.yml/badge.svg) [![pages-build-deployment](https://github.com/MiinaMagdy/Shopping-List-APP/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/MiinaMagdy/Shopping-List-APP/actions/workflows/pages/pages-build-deployment)

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

---

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

---

### Shopping List Endpoints

#### 🗄️ Get Shopping List

- **Path**: `/shopping-list`
- **Method**: `GET`
- **Description**: Retrieve all products in the shopping list.
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/200-a?style=plastic&color=rgb(55%2C%20239%2C%200)>)
- **Response**:
  ```json
  {
  	"shoppingList": [
  		{
  			"id": "e7cd280d-779a-4a41-8b58-621d85beb4e2",
  			"name": "Strawberry 🍓",
  			"price": 20.95,
  			"stock": 11,
  			"quantity": 19
  		},
  		{
  			"id": "3bcabc5f-cb92-4cce-8e59-1df921871d8b",
  			"name": "Meat 🥩",
  			"price": 205,
  			"stock": 2,
  			"quantity": 2
  		}
  	],
  	"totalPrice": 808.05
  }
  ```

#### ➕ Add a Product to Shopping List

- **Path**: `/shopping-list/:productId`
- **Method**: `POST`
- **Description**: Add a product to the shopping list by product ID.
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/201-a?style=plastic&color=rgb(55%2C%20239%2C%200)>)
- **Response**:
  ```json
  {
  	"message": "Product added to shopping list"
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
  	"errors": ["params.id Invalid uuid"]
  }
  ```

#### ❌ Remove a Product from Shopping List

- **Path**: `/shopping-list/:productId`
- **Method**: `DELETE`
- **Description**: Remove a product from the shopping list by product ID.
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/204-a?style=plastic&color=rgb(55%2C%20239%2C%200)>)
- **Response**:

  ```json

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
  	"errors": ["params.id Invalid uuid"]
  }
  ```

#### 🛍️ Apply Promo Code

- **Path**: `/shopping-list/promocodes/:name`
- **Method**: `POST`
- **Description**: Apply a promo code with a specific name to the shopping list.
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/200-a?style=plastic&color=rgb(55%2C%20239%2C%200)>)
- **Response**:
  ```json
  {
  	"message": "Promo code applied"
  }
  ```
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/404-a?style=plastic&color=rgb(239%2C%2055%2C%200)>)
- **Response**:
  ```json
  {
  	"status": "fail",
  	"message": "Promo code with name NOT_FOUND_PROMO_CODE not found",
  	"errors": []
  }
  ```
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/422-a?style=plastic&color=rgb(239%2C%2055%2C%200)>)
- **Response**:
  ```json
  {
  	"status": "fail",
  	"message": "Invalid input.",
  	"errors": ["params.name Name must be at least 2 characters long."]
  }
  ```

#### ❌ Remove Applied Promo Code

- **Path**: `/shopping-list/promocodes`
- **Method**: `DELETE`
- **Description**: Remove the currently applied promo code from the shopping list.
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/204-a?style=plastic&color=rgb(55%2C%20239%2C%200)>)
- **Response**:

  ```json

  ```

---

### Promo Codes Endpoints

#### 🗄️ Get All Promo Codes

- **Path**: `/promocodes`
- **Method**: `GET`
- **Description**: Retrieve all available promo codes.
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/200-a?style=plastic&color=rgb(55%2C%20239%2C%200)>)
- **Response**:
  ```json
  [
  	{
  		"id": "e7cd280d-779a-4a41-8b58-621d85beb4e2",
  		"name": "10OFF",
  		"percentage": 0.1
  	},
  	{
  		"id": "3bcabc5f-cb92-4cce-8e59-1df921871d8b",
  		"name": "20OFF",
  		"percentage": 0.2
  	}
  ]
  ```

#### 🗃️ Get a Promo Code

- **Path**: `/promocodes/:name`
- **Method**: `GET`
- **Description**: Retrieve a promo code by name.
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/200-a?style=plastic&color=rgb(55%2C%20239%2C%200)>)
- **Response**:
  ```json
  {
  	"id": "e7cd280d-779a-4a41-8b58-621d85beb4e2",
  	"name": "10OFF",
  	"percentage": 0.1
  }
  ```
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/404-a?style=plastic&color=rgb(239%2C%2055%2C%200)>)
- **Response**:
  ```json
  {
  	"status": "fail",
  	"message": "Promo code with name NOT_FOUND_PROMO_CODE not found",
  	"errors": []
  }
  ```
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/422-a?style=plastic&color=rgb(239%2C%2055%2C%200)>)
- **Response**:
  ```json
  {
  	"status": "fail",
  	"message": "Invalid input.",
  	"errors": [
  		"body.name Name must only contain uppercase letters and numbers."
  	]
  }
  ```

#### ➕ Add a Promo Code

- **Path**: `/promocodes`
- **Method**: `POST`
- **Description**: Add a new promo code.
- **Request Body**:
  ```json
  {
  	"name": "30OFF",
  	"percentage": 0.3
  }
  ```
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/201-a?style=plastic&color=rgb(55%2C%20239%2C%200)>)
- **Response**:
  ```json
  {
  	"message": "Promo code created"
  }
  ```
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/422-a?style=plastic&color=rgb(239%2C%2055%2C%200)>)
- **Response**:
  ```json
  {
  	"status": "fail",
  	"message": "Invalid input.",
  	"errors": [
  		"body.name Name must only contain uppercase letters and numbers."
  	]
  }
  ```
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/409-a?style=plastic&color=rgb(239%2C%2055%2C%200)>)
- **Response**:
  ```json
  {
  	"status": "fail",
  	"message": "Promo code with name 30OFF already exists",
  	"errors": []
  }
  ```

#### ❌ Remove a Promo Code

- **Path**: `/promocodes/:name`
- **Method**: `DELETE`
- **Description**: Remove a promo code by name.
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/204-a?style=plastic&color=rgb(55%2C%20239%2C%200)>)
- **Response**:

  ```json

  ```

- **Status Code**: ![Static Badge](<https://img.shields.io/badge/404-a?style=plastic&color=rgb(239%2C%2055%2C%200)>)
- **Response**:
  ```json
  {
  	"status": "fail",
  	"message": "Promo code with name 'NOT_FOUND_PROMO_CODE not found",
  	"errors": []
  }
  ```
- **Status Code**: ![Static Badge](<https://img.shields.io/badge/422-a?style=plastic&color=rgb(239%2C%2055%2C%200)>)
- **Response**:
  ```json
  {
  	"status": "fail",
  	"message": "Invalid input.",
  	"errors": [
  		"body.name String must contain at least 2 character(s)",
  		"body.name Name must only contain uppercase letters and numbers."
  	]
  }
  ```
