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


def validate_arguments_values(
    server: http.server.BaseHTTPRequestHandler, arguments, *field_valid_values
):
    for field, valid_values in field_valid_values:
        if arguments[field] not in valid_values:
            response = {
                "success": False,
                "errorMessage": "Invalid argument value (specifically " + field + ")",
            }
            server.wfile.write(json.dumps(response).encode())
            return False
    return True
