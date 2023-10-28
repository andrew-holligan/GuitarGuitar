import http.server
import socketserver
import requests
import json

HOST = "localhost"
PORT = 8080


class RequestHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
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


httpd = socketserver.TCPServer((HOST, PORT), RequestHandler)
httpd.serve_forever()
