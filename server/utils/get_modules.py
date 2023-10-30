def parse_path_string(path):
    if "?" not in path:
        return path, ""

    p = path.split("?")
    endpoint = p[0]
    query = p[1]
    return endpoint, query


def parse_query_string(query):
    args = {}
    if "=" not in query:
        return args

    query_list = query.split("&")
    for arg in query_list:
        field = arg.split("=")[0]
        value = arg.split("=")[1]
        args[field] = value

    return args


def get_customers_values_by_field(customers, field):
    values = []

    for customer in customers:
        values.append(customer[field])

    return values


def filter_customers_by_field(customers, field, value):
    c = []

    for customer in customers:
        if customer[field] == value:
            c.append(customer)

    return c
