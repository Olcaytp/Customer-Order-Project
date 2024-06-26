# Customer Order Project

This project is available on [GitHub](https://github.com/). It is a customer order management system application.

## Table of Contents

- [Project Description](#project-description)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Database](#database)
- [Pages](#pages)
- [CRUD Operations](#crud-operations)
- [PDF Operations](#pdf-operations)
- [Contribution](#contribution)
- [License](#license)

## Project Description

This project is a customer order management system application. It provides an interface where customers can view their orders, create new orders, update existing orders, and delete orders.

## Technologies Used

This project uses the following technologies:
- React.js
- Node.js
- Express.js
- MySql

## Installation

To get a local copy of the project, follow these steps:
- git clone https://github.com/Olcaytp/Customer-Order-Project.git
- cd customer/order/project

## Usage

### Running Backend

To run the backend server, navigate to the `backend` directory and run the following commands:
- cd backend
- npm install
- npm start

The backend server will run on [http://localhost:8080](http://localhost:8080) by default.

### Running Frontend

To run the frontend application, navigate to the `frontend` directory and run the following commands:
- cd client
- npm install
- npm run dev

## Database

The Customer Order Management System uses MySQL as its database. It consists of the following schemas:
- customer_orders
- orderItems
- users table with roles

## Pages

This application includes the following pages:
- List of Customer Orders
- List of Order Items
- Customer Order Details
- Edit Customer Order
- Create Customer Order with Multiple Items
- Welcome Page
- Signin & Sign Up Pages

## CRUD Operations

The application supports the following CRUD (Create, Read, Update, Delete) operations:
- Create new customer order
- View customer order details
- Edit existing customer order
- Delete customer order
- Create new order item
- View order item details
- Delete order item
- Create PDF dynamically and download

## Screenshots

## Screenshots
<div style="display: flex; flex-wrap: wrap;">
    <img src="https://github.com/Olcaytp/Customer-Order-Project/blob/main/client/src/assets/customer-order-list.png" alt="Create Customer Order" width="300"/>
    <img src="https://github.com/Olcaytp/Customer-Order-Project/blob/main/client/src/assets/order-item-list.png" alt="Create Customer Order" width="300"/>
    <img src="https://github.com/Olcaytp/Customer-Order-Project/blob/main/client/src/assets/customer-order-details.png" alt="Create Customer Order" width="300"/>
    <img src="https://github.com/Olcaytp/Customer-Order-Project/blob/main/client/src/assets/add-customer-order.png" alt="Create Customer Order" width="300"/>
    <img src="https://github.com/Olcaytp/Customer-Order-Project/blob/main/client/src/assets/add-item-with-customer.png" alt="Create Customer Order" width="300"/>
    <img src="https://github.com/Olcaytp/Customer-Order-Project/blob/main/client/src/assets/add-new-order-item.png" alt="Create Customer Order" width="300"/>
    <img src="https://github.com/Olcaytp/Customer-Order-Project/blob/main/client/src/assets/update-order-item.png" alt="Create Customer Order" width="300"/>
    <img src="https://github.com/Olcaytp/Customer-Order-Project/blob/main/client/src/assets/authenticated-page.png" alt="Create Customer Order" width="300"/>
    <img src="https://github.com/Olcaytp/Customer-Order-Project/blob/main/client/src/assets/welcome-page.png" alt="Create Customer Order" width="300"/>
</div>
<img src="https://github.com/Olcaytp/Customer-Order-Project/blob/main/client/src/assets/dynamic-pdf-create.png" alt="Create Customer Order" width="300"/>
</div>

## PDF Operations

The Customer Order Management System also supports PDF generation for customer orders and order items. Here's how you can utilize this feature:

### Generating PDF Documents

To generate a PDF document for a customer order or order items, follow these steps:

- Navigate to the Customer Order Details page or Order Items page in the application by clicking the view button.
- Click on the "Create PDF Dynamically" button to initiate the PDF generation process.
- The application will generate the PDF document based on the displayed information.
- Once the PDF generation is complete, a generate pdf button will be provided.
- Click on the generate pdf button to save the generated PDF document to your local machine.
