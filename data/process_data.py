import json
import pdb

def dump_to_js(data_dict, var, js_file, sort_keys=False):
    sorted_dict = data_dict
    if sort_keys:
        keys = list(data_dict.keys())
        keys.sort()
        sorted_dict = {i: data_dict[i] for i in keys}

    data = json.dumps(sorted_dict, indent=4)
    js_data = f"{var}={data};"

    with open(js_file, "w") as f:
        f.write(js_data)


def filter_tppc_pokes():
    all_poke_data = json.load(open("all_poke_data.json"))
    tppc_dex = json.load(open("tppc_dex.json"))
    tppc_poke_data = {}
    unkown_list = []
    for id_ in tppc_dex:
        poke = tppc_dex[id_]
        if poke not in all_poke_data:
            unkown_list.append(poke)
        else:
            tppc_poke_data[poke] = all_poke_data[poke]

    json.dump(tppc_poke_data, open("tppc_poke_data.json", "w"), indent=4)
    json.dump(unkown_list, open("unknown_pokes.json", "w"), indent=4)


def filter_tppc_moves():
    all_move_data = json.load(open("all_move_data.json"))
    tppc_moves = json.load(open("tppc_moves.json"))
    tppc_move_data = {}
    unkown_list = []
    for move in tppc_moves:
        if move not in all_move_data:
            unkown_list.append(move)
        else:
            tppc_move_data[move] = all_move_data[move]

    json.dump(tppc_move_data, open("tppc_move_data.json", "w"), indent=4)
    json.dump(unkown_list, open("unknown_moves.json", "w"), indent=4)

    pdb.set_trace()

if __name__ == "__main__":
    # filter_tppc_pokes()
    # filter_tppc_moves()
    data_dict = json.load(open("tppc_poke_data.json"))
    var = "tppc_dex"
    js_file = "poke_data.js"
    dump_to_js(data_dict, var, js_file, sort_keys=True)