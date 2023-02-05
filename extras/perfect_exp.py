import requests
from bs4 import BeautifulSoup
from bs4.element import Tag
import json
import sys
import pdb


def clean_dict(data):
    cleaned = []
    for entry in data:
        if len(entry) == 0:
            continue
        temp = {}
        for key in entry:
            temp[key.strip()] = entry[key].text.strip()
        cleaned.append(temp)
    return cleaned


def fetch_accounts(output="poke_data.json"):
    "Scrape and store pokemon list."
    # Scraper logic based on pokemon db page layout
    page = requests.get("https://wiki.tppc.info/Training_Accounts")
    content = BeautifulSoup(page.content, 'html.parser')

    pokemon = content.find_all('tr')[1::]
    contentTable = content.find('table', {"class": "wikitable sortable"})
    headers = [header.text for header in contentTable.find_all('th')]
    results = [{headers[i]: cell for i, cell in enumerate(row.find_all('td'))}
               for row in contentTable.find_all('tr')]
    results = clean_dict(results)
    return results


def verify(exp, gained, battles):
    exp_gained = [gained[i]*c for i, c in battles]
    total = sum(exp_gained)
    assert total == exp


def min_battles(exp, gained):
    n = len(gained)
    battles = []
    slots = gained[::-1]
    temp_exp = exp
    while temp_exp != 0:
        index = next(x[0] for x in enumerate(slots) if x[1] <= temp_exp)
        count = int(temp_exp / slots[index])
        temp_exp = temp_exp % slots[index]
        battles.append((n-1-index, count))
    verify(exp, gained, battles)
    return battles


def format_output(data, battles, night=False):
    print("Following battles during {}:".format("nightime" if night else "daytime"))
    for i, c in battles:
        if i == 0:
            out = "Trainer: {}, Battle: {} times, with Exp Share attached to 2 other pokemon for 1 exp".format(data[i]["Number"], c)
        else:
            out = "Trainer: {}, Battle: {} times".format(data[i]["Number"], c)
        print(out)


def find_sequence(current_exp, desired_level, data):
    exp = desired_level**3 + 1 - current_exp
    day_exp = [int(x['Exp. (Day)'].replace(",", "")) for x in data]
    night_exp = [int(x['Exp. (Night)'].replace(",", "")) for x in data]
    day_train = min_battles(exp, day_exp)
    night_train = min_battles(exp, night_exp)
    print("-----------------------")
    format_output(data, day_train)
    print("-----------------------")
    format_output(data, night_train, night=True)
    print("-----------------------")


if __name__ == "__main__":
    data = fetch_accounts()
    oneexp = [{'Trainer Name': 'withexpshare', 'Number': '2380615', 'Rank': '1 - Grunt', 'Faction': 'Team Aqua', 'Pokémon': 'Shedinja', 'Level': '5', 'Exp. (Day)': '1', 'Exp. (Night)': '1', 'Money': '$30'}]
    data = oneexp + data
    find_sequence(126, 1000, data)
