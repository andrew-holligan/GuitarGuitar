import random


class Auth:
    tokens = {}

    def create_token(customer_id):
        # generate and store token
        token = Auth.generate_token()
        Auth.tokens[customer_id] = token

    def delete_token(customer_id):
        # delete token
        del Auth.tokens[customer_id]

    def get_token(customer_id):
        return Auth.tokens[customer_id]

    def get_all_tokens():
        return Auth.tokens

    def generate_token():
        # token format:
        #       token = "k2h3b4v..." (32 character length)

        number = "0123456789"
        letter = "abcdefghijklmnopqrstuvwxyz"
        token = ""

        for i in range(16):
            token += random.choice(letter)
            token += random.choice(number)

        return token
