// var att_level = 100
// var defence = 100

// var att_attack = 160
// var att_movePower = 150
// var mods = 1

// var attack = ((att_attack) + 46.875) * att_level / 50 + 5;
// var damageMin = (((2 * att_level / 5 + 2) * attack * att_movePower / defence) / 50 * 85 / 100 + 2) * mods;

// pokes = {
//     slaking: 160,
//     rhyperior: 140,
//     ramp: 165,
//     breloom: 130,
//     kyurem: 130,
//     kyuremwhite: 120,
//     kyuremblack: 170,
// }

// moves = {
//     iceball: 150,
//     earthquake: 100,
//     leafblade: 90,
//     headsmash: 150
// }

// Given values
let att_level = 100;
let defence = 100;

// Pokémon dictionary with their attack stat
let pokes = {
    slaking: 160,
    rhyperior: 140,
    ramp: 165,
    breloom: 130,
    kyurem: 130,
    kyuremwhite: 120,
    kyuremblack: 170
};

// Moves dictionary with their move power
let moves = {
    iceball: 150,
    earthquake: 100,
    leafblade: 90,
    headsmash: 150
};

// Type matching logic (you can add actual type matching logic)
let typeMatch = {
    'kyurem-iceball': 1.5, // Kyurem is Ice type
    'kyuremwhite-iceball': 1.5,
    'kyuremblack-iceball': 1.5,
    'rhyperior-earthquake': 1.5,
    'breloom-leafblade': 1.5,
    'ramp-headsmash': 1.5,
    'rhyperior-headsmash': 1.5,
    // Add more type matches as necessary
};

// Loop through each Pokémon and each move
for (let poke in pokes) {
    let att_attack = pokes[poke];

    for (let move in moves) {
        let att_movePower = moves[move];

        // Check if the Pokémon and move share the same type for the mods value
        let key = `${poke}-${move}`;
        let mods = typeMatch[key] || 1; // If no match, mods is 1

        // Calculate attack and damage
        let attack = ((att_attack) + 46.875) * att_level / 50 + 5;
        let damageMin = (((2 * att_level / 5 + 2) * attack * att_movePower / defence) / 50 * 85 / 100 + 2) * mods;

        // Print the result
        console.log(`${poke} using ${move} does ${damageMin.toFixed(2)} damage (Mods: ${mods})`);
    }
}
// slaking using iceball does 450.48 damage(Mods: 1)
// slaking using earthquake does 300.99 damage(Mods: 1)
// slaking using leafblade does 271.09 damage(Mods: 1)
// slaking using headsmash does 450.48 damage(Mods: 1)
// rhyperior using iceball does 407.64 damage(Mods: 1)
// rhyperior using earthquake does 408.64 damage(Mods: 1.5)
// rhyperior using leafblade does 245.38 damage(Mods: 1)
// rhyperior using headsmash does 611.46 damage(Mods: 1.5)
// ramp using iceball does 461.19 damage(Mods: 1)
// ramp using earthquake does 308.13 damage(Mods: 1)
// ramp using leafblade does 277.51 damage(Mods: 1)
// ramp using headsmash does 691.79 damage(Mods: 1.5)
// breloom using iceball does 386.22 damage(Mods: 1)
// breloom using earthquake does 258.15 damage(Mods: 1)
// breloom using leafblade does 348.80 damage(Mods: 1.5)
// breloom using headsmash does 386.22 damage(Mods: 1)
// kyurem using iceball does 579.33 damage(Mods: 1.5)
// kyurem using earthquake does 258.15 damage(Mods: 1)
// kyurem using leafblade does 232.53 damage(Mods: 1)
// kyurem using headsmash does 386.22 damage(Mods: 1)
// kyuremwhite using iceball does 547.20 damage(Mods: 1.5)
// kyuremwhite using earthquake does 243.87 damage(Mods: 1)
// kyuremwhite using leafblade does 219.68 damage(Mods: 1)
// kyuremwhite using headsmash does 364.80 damage(Mods: 1)
// kyuremblack using iceball does 707.85 damage(Mods: 1.5)
// kyuremblack using earthquake does 315.27 damage(Mods: 1)
// kyuremblack using leafblade does 283.94 damage(Mods: 1)
// kyuremblack using headsmash does 471.90 damage(Mods: 1)
