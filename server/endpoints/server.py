import http.server
import json

from utils.get_modules import *
from utils.orders_modules import *
from utils.valid_arguments import *
from authorisation.auth import *
from endpoints.gg_endpoints import *


class RequestHandler(http.server.BaseHTTPRequestHandler):
    def handle_GET_login(self, arguments):
        # arguments = {
        #   "email"     :   string
        #   "password"  :   string
        #  }

        # arguments parse and validation
        arguments, successful_parse = parse_arguments(
            self, arguments, ("email", str), ("password", str)
        )
        if not successful_parse:
            return

        customers = GGEndpoints.get_customers()
        customers_emails = get_values_by_field(customers, "email")

        # email validation
        if arguments["email"] not in customers_emails:
            response = {
                "success": False,
                "errorMessage": "Account with that email does not exist",
            }
            self.wfile.write(json.dumps(response).encode())
            return

        # we know email is a unique field hence [0] (it will only return single customer)
        customer = filter_by_field(customers, "email", arguments["email"])[0]
        # generate and store token
        Auth.create_token(customer["Id"])

        response = {
            "success": True,
            "token": Auth.get_token(customer["Id"]),
            "customerId": customer["Id"],
        }
        self.wfile.write(json.dumps(response).encode())

    def handle_GET_logout(self, arguments):
        # arguments = {
        #   "token"       :   string
        #   "customerId"  :   integer
        # }

        # arguments parse and validation
        arguments, successful_parse = parse_arguments(
            self, arguments, ("token", str), ("customerId", int)
        )
        if not successful_parse:
            return

        # check token authorisation
        if not Auth.is_authorised(self, arguments["token"], arguments["customerId"]):
            return

        # delete token
        Auth.delete_token(arguments["customerId"])

        response = {"success": True}
        self.wfile.write(json.dumps(response).encode())

    def handle_GET_customer(self, arguments):
        # arguments = {
        #   "token"       :   string
        #   "customerId"  :   integer
        # }

        # arguments parse and validation
        arguments, successful_parse = parse_arguments(
            self, arguments, ("token", str), ("customerId", int)
        )
        if not successful_parse:
            return

        # check token authorisation
        if not Auth.is_authorised(self, arguments["token"], arguments["customerId"]):
            return

        customers = GGEndpoints.get_customers()
        # we know customerId is a unique field hence [0] (it will only return single customer)
        customer = filter_by_field(customers, "Id", arguments["customerId"])[0]

        response = {"success": True, "customer": customer}
        self.wfile.write(json.dumps(response).encode())

    def handle_GET_orders(self, arguments):
        # arguments = {
        #   "token"             :   string
        #   "customerId"        :   integer
        #   "sortField"     :   string
        #   "sortDirection"   :   string
        #   "filterOrderStatus" :   integer
        # }

        # arguments parse and validation
        arguments, successful_parse = parse_arguments(
            self,
            arguments,
            ("token", str),
            ("CustomerId", int),
            ("sortField", str),
            ("sortDirection", str),
            ("filterOrderStatus", int),
        )
        if not successful_parse:
            return

        # arguments values validation
        successful_values = validate_arguments_values(
            self,
            arguments,
            ("sortField", ["DateCreated", "OrderTotal"]),
            ("sortDirection", ["asc", "desc"]),
            ("filterOrderStatus", [0, 1, 2, 3, 4, 5, 6]),
        )
        if not successful_values:
            return

        # check token authorisation
        if not Auth.is_authorised(self, arguments["token"], arguments["CustomerId"]):
            return

        # get customer orders, filter and sort them
        all_orders = GGEndpoints.get_orders()
        customer_orders = filter_by_field(
            all_orders, "CustomerId", arguments["CustomerId"]
        )
        filtered_customer_orders = filter_orders_by_OrderStatus(
            customer_orders, arguments["filterOrderStatus"]
        )
        sorted_customer_orders = sort_orders(
            filtered_customer_orders, arguments["sortField"], arguments["sortDirection"]
        )

        response = {"success": True, "orders": sorted_customer_orders}
        self.wfile.write(json.dumps(response).encode())

    GET_endpoints = {
        "/login": handle_GET_login,
        "/logout": handle_GET_logout,
        "/customer": handle_GET_customer,
        "/orders": handle_GET_orders,
    }

    def do_GET(self):
        # Send a response header
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()

        # handle query
        endpoint, query = parse_path_string(self.path)
        arguments = parse_query_string(query)

        # call endpoint handler
        self.GET_endpoints[endpoint](self, arguments)
