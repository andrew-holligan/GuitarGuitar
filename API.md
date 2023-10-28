# API Documentation

## Endpoints

- GET /login

  - Description: Login a user
  - Parameters:
    - email: string
    - password: string
  - response:
    - { success: boolean, token:string, errorMessage?: string }

- GET /logout
  - Description: Logout user
  - Parameters:
    - token: string
    - customerId: string
  - response:
    - { success: boolean, errorMessage?: string }
