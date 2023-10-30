import http.server
import json


def check_arguments(
    server: http.server.BaseHTTPRequestHandler, arguments: dict, *valid_args
):
    for valid_arg in valid_args:
        if arguments.get(valid_arg, False) == False:
            response = {
                "success": False,
                "errorMessage": "Invalid arguments",
            }
            server.wfile.write(json.dumps(response).encode())
            return False
    return True
