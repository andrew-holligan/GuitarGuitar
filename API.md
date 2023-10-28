# API Documentation

## Endpoints

- GET /login
  - Description: Login a user
  - Parameters:
    - email: string
    - password: string
  - response:
    - { success: boolean, errorMessage?: string }
