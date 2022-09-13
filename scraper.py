import requests
from bs4 import BeautifulSoup
from bs4.element import Tag
import json
import pdb


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
    output_json = {k: data[k] for k in sorted(data)}
    with open(output, "w") as output:
        outstring = json.dumps(output_json).replace("'", "")
        output.write(f"pokelist={outstring};")


def scrape_effect_matrix(output="weakness.json"):
    "Scrape and store move effectiveness matrix."
    index = ["NORMAL", "FIRE", "WATER", "ELECTRIC", "GRASS", "ICE",
             "FIGHTING", "POISON", "GROUND", "FLYING", "PSYCHIC", "BUG",
             "ROCK", "GHOST", "DRAGON", "DARK", "STEEL", "FAIRY"]

    page = requests.get("https://pokemondb.net/type")
    content = BeautifulSoup(page.content, 'html.parser')
    table = content.find_all('tr')[1::]
    value_key = {"": 1, "½": 0.5}
    output_json = {}

    for type, entry in zip(index, table):
        values = [x.text for x in entry.find_all("td")]
        values = [value_key[x] if x in value_key else int(x) for x in values]
        output_json[type] = {k:v for k, v in zip(index, values)}

    output_json = {k: output_json[k] for k in sorted(output_json)}
    with open(output, "w") as output:
        outstring = json.dumps(output_json).replace("'", "")
        output.write(f"weaknesses={outstring};")


def scrape_move_list(output="move_data.json"):
    "Scrape and store move list."
    page = requests.get("https://pokemondb.net/move/all")
    content = BeautifulSoup(page.content, 'html.parser')
    table = content.find_all('tr')[1::]
    output_json = {}

    for entry in table:
        values = [x for x in entry.find_all("td")]
        name = values[0].text
        type_ = values[1].text
        movetype = values[2]["data-filter-value"]
        try:
            power = int(values[3].text) if values[3].text != '—' else 0
        except ValueError:
            power = 0
        output_json[name] = {"type": type_, "movetype": movetype, "power": power}

    output_json = {k: output_json[k] for k in sorted(output_json)}
    with open(output, "w") as output:
        outstring = json.dumps(output_json).replace("'", "")
        output.write(f"moves={outstring};")


if __name__ == "__main__":
    scrape_pokemon_list()
    scrape_move_list()
    scrape_effect_matrix()
