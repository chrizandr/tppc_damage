function get_weakness(attack_poke_move, defence_poke) {
    var def_poke_types = defence_poke[0].split(" ");
    const att_poke_type = attack_poke_move.type.toUpperCase();
    var multiplier = 1;
    for (let index = 0; index < def_poke_types.length; index++) {
        const def_poke_type = def_poke_types[index].toUpperCase();
        if (def_poke_type.length > 0) {
            multiplier = multiplier * weakness_matrix[att_poke_type][def_poke_type];
        }
    }
    return multiplier;
}

function item_mods(attack_poke_item) {
    if (attack_poke_item.indexOf("Elemental Stone") >= 0) {
        return 1.5;
    }
    if (attack_poke_item.indexOf("Life Orb") >= 0) {
        return 1.3;
    }
    return 1;
}

function modifiers(attack_poke_move, attack_poke_type, attack_poke_item, defence_poke, extra_mod) {
    var mods = {};
    console.log("-------", attack_poke_type, attack_poke_move.type)
    mods.STAB =  attack_poke_type.split(" ").indexOf(attack_poke_move.type) >= 0 ? 1.5 : 1;
    mods.weakness = get_weakness(attack_poke_move, defence_poke); // 4,2,1,0.5,0.25
    mods.item = item_mods(attack_poke_item); // 1.5 Elemental Stone, 1.3 Life Orb, 0 No Attack Boosting Items.
    mods.extra = extra_mod // In case of crit or other special conditions
    return mods;
}

function attack_poke_setup(attack_poke, attack_poke_move, attack_poke_item, attack_poke_type) {
    var att = {};
    att.type = attack_poke_type;
    att.attack = (attack_poke_move.movetype == "special") ? attack_poke[4] : attack_poke[2];
    att.speed = attack_poke[6];
    att.movePower = attack_poke_move.power;

    if (attack_poke_item.indexOf("Power Boost") >= 0) {
        att.attack = att.attack + 5;
        att.speed = att.speed + 5;
    }
    return att;
}

function def_poke_setup(defence_poke, defence_poke_type, defence_poke_level, defence_poke_item, attack_poke_move) {
    var def = {};
    def.type = defence_poke_type; // Golden/Dark/Shiny/Normal.
    def.HP = defence_poke[1]; // HP stat without bonuses.
    def.defence = (attack_poke_move.movetype == "special") ? defence_poke[5] : defence_poke[3]; // Defence stat without bonuses.
    def.speed = defence_poke[6];
    def.level = defence_poke_level; // Defending pokémon's level.

    if (defence_poke_item.indexOf("Power Boost") >= 0) {
        def.HP = def.HP + 5;
        def.defence = def.defence + 5;
        def.speed = def.speed + 5;
    }
    return def;
}

function calculate(night, attack_poke, defence_poke, attack_poke_item, defence_poke_item,
    attack_poke_type, defence_poke_type, defence_poke_level, attack_poke_move, extra_mod=1) {
    console.log("--------", attack_poke)
    var output = {};
    if (attack_poke_move.power == 0) {
        output.error = "Please select a damaging move";
        return output;
    }
    // attacking pokémon
    const att = attack_poke_setup(attack_poke, attack_poke_move,
        attack_poke_item, attack_poke_type);
    // defending pokemon
    const def = def_poke_setup(defence_poke, defence_poke_type,
        defence_poke_level, defence_poke_item,
        attack_poke_move);
    // multipliers
    const mods_list = modifiers(attack_poke_move, attack_poke[0],
        attack_poke_item, defence_poke, extra_mod);

    console.log(def);
    console.log(att);
    console.log(mods_list)

    // ####################### //
    var types = {};
    types.normal = 0;
    types.shiny = 5;
    types.dark = (night) ? 15 : -4;
    types.golden = 15;



    var item_text = {};
    item_text["None"] = "";
    item_text["Life Orb"] = "with Life Orb";
    item_text["Elemental Stone"] = "with Elemental Stone";
    item_text["Power Boost"] = "with Power Boost";

    var sum = 1;
    for (mod in mods_list) {
        if (mods_list[mod] > 0) {
            sum = sum * mods_list[mod];
        }
    }
    const mods = sum;
    var HP = Math.floor(((def.HP + types[def.type]) + 65) * def.level / 50 + 10);
    var defence = ((def.defence + types[def.type]) + 46.875) * def.level / 50 + 5;

    // var reqLevel = Math.ceil((-(250+5*(myPokemon.attack+46.875))+Math.sqrt((250+5*(myPokemon.attack+4 6.875))*(250+5*(myPokemon.attack+46 .875))-(4*(myPokemon.attack+46.875)*-((((((((opPokemon.hp/mods)-2)*100/85*50)*opPokemon.defense)/movePower)*250)/2)-1250))))/(2*(myPokemon.attack+46.875)))

    for (var i = 0; true; i++) {
        att.level = i;
        var attack = ((att.attack + types[att.type]) + 46.875) * att.level / 50 + 5;
        var damageMin = (((2 * att.level / 5 + 2) * attack * att.movePower / defence) / 50 * 85 / 100 + 2) * mods;

        // damage has reached 100% of def pokémon's HP
        if (Math.floor(damageMin) >= HP) {
            var defSpeed = ((def.speed + types[def.type]) + 46.875) * def.level / 50 + 5;
            var attSpeed = ((att.speed + types[att.type]) + 46.875) * att.level / 50 + 5;
            var damageMax = (((2 * att.level / 5 + 2) * attack * att.movePower / defence) / 50 * 100 / 100 + 2) * mods;

            output.def_hp = HP;
            output.def_def = defence;
            output.def_speed = defSpeed;

                // att pokémon is slower, check lowest level it will be faster
            output.min_level = i;
            output.min_damage = Math.floor(damageMin) + " (" + (((100 / HP) * damageMin)).toFixed(1) + "%)";
            output.max_damage = Math.floor(damageMax) + " (" + (((100 / HP) * damageMax)).toFixed(1) + "%)";
            output.speed = Math.floor(attSpeed);

            if (attSpeed < defSpeed) {
                for (i = i; true; i++) {
                    attLevel = i;
                    attSpeed = ((att.speed + types[att.type]) + 46.875) * attLevel / 50 + 5;
                    if (attSpeed > defSpeed) {
                        output.outspeed_level =  attLevel;
                        break;
                    }
                }
            }
            else{
                output.outspeed_level = i;
            }
            break;
        }
    }
    return output;
}
