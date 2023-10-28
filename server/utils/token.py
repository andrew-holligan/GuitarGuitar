import random


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
