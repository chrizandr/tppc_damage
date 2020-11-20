import requests
from bs4 import BeautifulSoup
from bs4.element import Tag
import json


page = requests.get("https://pokemondb.net/pokedex/all")
content = BeautifulSoup(page.content, 'html.parser')


pokemon = content.find_all('tr')[1::]

data = {}

for poke in pokemon:
    poke = [x for x in list(poke.children) if type(x) is Tag]
    _, name, type_, _, hp, attack, defence, sattack, sdefense, speed = poke
    s = [type_.get_text()] + [int(x.get_text()) for x in [hp, attack, defence, sattack, sdefense, speed]]
    data[name.get_text()] = s

with open("data.json", "w") as output:
    output.write("data = '{}'".format(json.dumps(data)))
