import socketserver

from http_server import RequestHandler

HOST = "localhost"
PORT = 8080

try:
    httpd = socketserver.TCPServer((HOST, PORT), RequestHandler)
except Exception as e:
    print(e)
else:
    print("server started listening on port " + str(PORT))

httpd.serve_forever()
