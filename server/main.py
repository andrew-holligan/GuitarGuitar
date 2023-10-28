import requests

url = "https://www.guitarguitar.co.uk/hackathon/customers/"
r = requests.get(url=url)
response = r.json()
print(response)
