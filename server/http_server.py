import http.server
import requests
import json

from utils.get_modules import *
from guitarguitar_endpoints import *


class RequestHandler(http.server.BaseHTTPRequestHandler):
    def handle_GET_login(self, arguments):
        # arguments format:
        #       arguments = {
        #           "email",
        #           "password"
        #       }

        email = arguments["email"]

        customers = get_customers()
        customers_emails = get_customers_value_by_field(customers, "email")

        if email not in customers_emails:
            response = {
                "success": False,
                "errorMessage": "Account with that email does not exist",
            }
            self.wfile.write(json.dumps(response).encode())
        else:
            response = {
                "success": True,
            }
            self.wfile.write(json.dumps(response).encode())

    def handle_GET_orders(arguments):
        pass

    GET_endpoints = {"/login": handle_GET_login, "/orders": handle_GET_orders}

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
