import http.server
import requests
import json

from utils.get_modules import *


class RequestHandler(http.server.BaseHTTPRequestHandler):
    def handle_login(arguments):
        print(arguments["username"])
        print(arguments["password"])

    endpoints = {"/login": handle_login}

    def do_GET(self):
        endpoint, query = parse_path_string(self.path)
        arguments = parse_query_string(query)

        self.endpoints[endpoint](arguments)

        # Send a response header
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()

        # Prepare a custom response
        url = "https://www.guitarguitar.co.uk/hackathon/customers/"
        r = requests.get(url=url)
        response = r.json()

        # Send the response
        self.wfile.write(json.dumps(response).encode())
