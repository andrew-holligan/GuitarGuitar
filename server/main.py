import socketserver

from http_server import RequestHandler

HOST = "localhost"
PORT = 8080

httpd = socketserver.TCPServer((HOST, PORT), RequestHandler)
httpd.serve_forever()
