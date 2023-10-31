import requests


class GGEndpoints:
    customers = None
    orders = None
    products = None

    def get_customers(force_fetch=False):
        if GGEndpoints.customers and not force_fetch:
            return GGEndpoints.customers

        # Prepare a custom response
        url = "https://www.guitarguitar.co.uk/hackathon/customers/"
        r = requests.get(url=url)
        GGEndpoints.customers = r.json()

        return GGEndpoints.customers

    def get_orders(force_fetch=False):
        if GGEndpoints.orders and not force_fetch:
            return GGEndpoints.orders

        # Prepare a custom response
        url = "https://www.guitarguitar.co.uk/hackathon/orders/"
        r = requests.get(url=url)
        GGEndpoints.orders = r.json()

        return GGEndpoints.orders

    def get_products(force_fetch=False):
        if GGEndpoints.products and not force_fetch:
            return GGEndpoints.products

        # Prepare a custom response
        url = "https://www.guitarguitar.co.uk/hackathon/products/"
        r = requests.get(url=url)
        GGEndpoints.products = r.json()

        return GGEndpoints.products
