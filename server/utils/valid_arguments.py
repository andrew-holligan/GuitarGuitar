import http.server
import json


def parse_arguments(
    server: http.server.BaseHTTPRequestHandler, arguments: dict, *valid_args
):
    parsed_args = {}

    for valid_arg, type in valid_args:
        try:
            # check if key exists
            value = arguments[valid_arg]
            # check type of value
            parsed_value = type(value)
        except:
            response = {
                "success": False,
                "errorMessage": "Invalid arguments",
            }
            server.wfile.write(json.dumps(response).encode())
            return arguments, False

        parsed_args[valid_arg] = parsed_value

    return parsed_args, True
