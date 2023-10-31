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
    - customerId: integer
    - fieldToSortBy: string
  - Response:
    - { success: boolean, orders?: Orders, errorMessage?: string }
