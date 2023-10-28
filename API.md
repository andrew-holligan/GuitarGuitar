# API Documentation

## Endpoints

- GET /login

  - Description: Login a user
  - Parameters:
    - email: string
    - password: string
  - response:
    - { success: boolean, token:string, errorMessage?: string }

- GET /orders
  - Description: Display users orders
  - Parameters:
    -
