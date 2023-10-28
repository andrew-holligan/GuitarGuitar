import requests

customers = None


def get_customers(force_fetch=False):
    global customers

    if customers and not force_fetch:
        return customers

    # Prepare a custom response
    url = "https://www.guitarguitar.co.uk/hackathon/customers/"
    r = requests.get(url=url)
    customers = r.json()

    return customers
