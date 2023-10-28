import http.server
import requests
import json

from utils.get_modules import *
from utils.token import *
from guitarguitar_endpoints import *


class RequestHandler(http.server.BaseHTTPRequestHandler):
    tokens = {}

    def handle_GET_login(self, arguments):
        # arguments format:
        #       arguments = {
        #           "email",
        #           "password"
        #       }

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

        # generate and store token
        token = generate_token()
        # we know email is a unique field
        customer = filter_customers_by_field(customers, "email", email)[0]
        self.tokens[customer["Id"]] = token

        response = {"success": True, "token": token, "customer_id": customer["Id"]}
        self.wfile.write(json.dumps(response).encode())

        print(self.tokens)

    def handle_GET_logout(self, arguments):
        pass

    def handle_GET_orders(self, arguments):
        pass

    GET_endpoints = {
        "/login": handle_GET_login,
        "/logout": handle_GET_logout,
        "/orders": handle_GET_orders,
    }

    def do_GET(self):
        # Send a response header
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()

        endpoint, query = parse_path_string(self.path)
        arguments = parse_query_string(query)

        self.GET_endpoints[endpoint](self, arguments)

        # Send the response
        # self.wfile.write(json.dumps(response).encode())
