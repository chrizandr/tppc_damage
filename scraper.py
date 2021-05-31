import requests
from bs4 import BeautifulSoup
from bs4.element import Tag
import json


def scrape_pokemon_list(output="poke_data.json"):
    "Scrape and store pokemon list."
    # Scraper logic based on pokemon db page layout
    page = requests.get("https://pokemondb.net/pokedex/all")
    content = BeautifulSoup(page.content, 'html.parser')

    pokemon = content.find_all('tr')[1::]

    data = {}

    for poke in pokemon:
        poke = [x for x in list(poke.children) if type(x) is Tag]
        _, name, type_, _, hp, attack, defence, sattack, sdefense, speed = poke
        s = [type_.get_text()] + [int(x.get_text()) for x in [hp, attack, defence, sattack, sdefense, speed]]
        data[name.get_text()] = s

    with open(output, "w") as output:
        output.write("data = '{}'".format(json.dumps(data)))


def scrape_effect_matrix(output="effect_data.json"):
    "Scrape and store move effectiveness matrix."
    # Scraper logic based on pokemon db page layout
    pass


def scrape_move_list(output="move_data.json"):
    "Scrape and store move list."
    # Scraper logic based on pokemon db page layout
    pass


if __name__ == "__main__":
    scrape_pokemon_list()
    scrape_move_list()
    scrape_effect_matrix()
