def parse_path_string(path):
    if "?" not in path:
        return path, ""

    p = path.split("?")
    endpoint = p[0]
    query = p[1]
    return endpoint, query


def parse_query_string(query):
    args = {}
    try:
        query_list = query.split("&")
        for arg in query_list:
            field = arg.split("=")[0]
            value = arg.split("=")[1]
            args[field] = value
    finally:
        return args


def get_values_by_field(arrOfD, field):
    values = []

    for d in arrOfD:
        values.append(d[field])

    return values


def filter_by_field(arrOfD, field, value):
    arr = []

    for d in arrOfD:
        if d[field] == value:
            arr.append(d)

    return arr
