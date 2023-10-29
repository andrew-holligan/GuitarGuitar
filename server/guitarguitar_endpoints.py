import requests

customers = None
orders = None
products = None


def get_customers(force_fetch=False):
    global customers

    if customers and not force_fetch:
        return customers

    # Prepare a custom response
    url = "https://www.guitarguitar.co.uk/hackathon/customers/"
    r = requests.get(url=url)
    customers = r.json()

    return customers


def get_orders(force_fetch=False):
    global orders

    if orders and not force_fetch:
        return orders

    # Prepare a custom response
    url = "https://www.guitarguitar.co.uk/hackathon/orders/"
    r = requests.get(url=url)
    orders = r.json()

    return orders


def get_products(force_fetch=False):
    global products

    if products and not force_fetch:
        return products

    # Prepare a custom response
    url = "https://www.guitarguitar.co.uk/hackathon/products/"
    r = requests.get(url=url)
    products = r.json()

    return products
