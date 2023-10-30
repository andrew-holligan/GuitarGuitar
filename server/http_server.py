import http.server
import json

from utils.get_modules import *
from utils.valid_arguments import *
from auth import *
from endpoints.guitarguitar_endpoints import *


class RequestHandler(http.server.BaseHTTPRequestHandler):
    def handle_GET_login(self, arguments):
        # arguments format:
        #       arguments = {
        #           "email",
        #           "password"
        #       }

        arguments, successful_parse = parse_arguments(
            self, arguments, ("email", str), ("password", str)
        )
        if not successful_parse:
            return

        email = arguments["email"]

        customers = get_customers()
        customers_emails = get_customers_values_by_field(customers, "email")

        if email not in customers_emails:
            response = {
                "success": False,
                "errorMessage": "Account with that email does not exist",
            }
            self.wfile.write(json.dumps(response).encode())
            return

        # we know email is a unique field
        customer = filter_customers_by_field(customers, "email", email)[0]
        # generate and store token
        Auth.create_token(customer["Id"])

        response = {
            "success": True,
            "token": Auth.get_token(customer["Id"]),
            "customerId": customer["Id"],
        }
        self.wfile.write(json.dumps(response).encode())

    def handle_GET_logout(self, arguments):
        # arguments format:
        #       arguments = {
        #           "token",
        #           "customerId"
        #       }

        arguments, successful_parse = parse_arguments(
            self, arguments, ("token", str), ("customerId", int)
        )
        if not successful_parse:
            return

        token = arguments["token"]
        customer_id = arguments["customerId"]

        # check token authorisation
        if not Auth.is_authorised(self, token, customer_id):
            return

        # delete token
        Auth.delete_token(customer_id)

        response = {"success": True}
        self.wfile.write(json.dumps(response).encode())

    def handle_GET_orders(self, arguments):
        pass

    def handle_GET_customer(self, arguments):
        pass

    GET_endpoints = {
        "/login": handle_GET_login,
        "/logout": handle_GET_logout,
        "/orders": handle_GET_orders,
        "/customer": handle_GET_customer,
    }

    def do_GET(self):
        # Send a response header
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()

        endpoint, query = parse_path_string(self.path)
        arguments = parse_query_string(query)

        self.GET_endpoints[endpoint](self, arguments)

        # Send the response
        # self.wfile.write(json.dumps(response).encode())
