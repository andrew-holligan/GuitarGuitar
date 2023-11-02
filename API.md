# API Documentation

## Endpoints

- GET /login

  - Description: Login a user
  - Parameters:
    - email: string
    - password: string
  - Response:
    - { success: boolean, token?:string, errorMessage?: string }

- GET /logout

  - Description: Logout user
  - Parameters:
    - token: string
    - customerId: integer
  - Response:
    - { success: boolean, errorMessage?: string }

- GET /customer

  - Description: Get customer info
  - Parameters:
    - token: string
    - customerId: integer
  - Response:
    - { success: boolean, customer?: Customer, errorMessage?: string }

- GET /orders

  - Description: Get customer orders
  - Parameters:
    - token: string
    - CustomerId: integer
    - sortField: string ("DateCreated"/"OrderTotal")
    - sortDirection: string ("asc"/"desc")
    - filterOrderStatus: integer (0-6 inclusive)
  - Response:
    - { success: boolean, orders?: Orders, errorMessage?: string }

- GET /products/recommended

  - Description: Get recommended products
  - Parameters:
    - token: string
    - customerId: integer
  - Response:
    - { success: boolean, products?: Products, errorMessage?: string }
