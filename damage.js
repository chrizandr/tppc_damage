var attack_mon = {
    name: "Arceus (Fighting)",
    type: "Fighting",
    hp: 120,
    attack: 120,
    defence: 120,
    sattack: 120,
    sdefense: 120,
    speed: 120,
    color: "Normal"
}

var attack_mon = {
    name: "Arceus (Fighting)",
    type: "Fighting",
    hp: 120,
    attack: 120,
    defence: 120,
    sattack: 120,
    sdefense: 120,
    speed: 120,
    color: "Normal"
}


function requriedLevel(night, attack_mon, defence_mon, attack_mon_item, defence_mon_item, otheritem) {
  var night = false; // true/false.

  // defending pokémon
  var def = {};
  def.type = "Shiny"; // Golden/Dark/Shiny/Normal.
  def.HP = 255; // HP stat without bonuses.
  def.defence = 10; // Defence stat without bonuses.
  def.speed = 55;
  def.level = 5500; // Defending pokémon's level.

  // attacking pokémon
  var att = {};
  att.type = "Normal"; // Golden/Dark/Shiny/Normal.
  att.attack = 120; // Attack stat without bonuses.
  att.speed = 120;
  att.movePower = 120; // Power of move.

  // multipliers
  var mods = {};
  mods.STAB = 1.5; // 1.5 or 0
  mods.weakness = 2; // 4,2,1,0.5,0.25
  mods.item = 0; // 1.5 Elemental Stone, 1.3 Life Orb, 0 No Attack Boosting Items.
  // ####################### //

  var types = {};
  types.Normal = 0;
  types.Shiny = 5;
  types.Dark = (night) ? 15 : -4;
  types.Golden = 15;

  var sum = 1;
  for (mod in mods) {
  	if (mods[mod] > 0) {
  		sum = sum * mods[mod];
  	}
  }
  mods = sum;
  var HP = Math.floor(((def.HP + types[def.type]) + 65) * def.level / 50 + 10);
  var defence = ((def.defence + types[def.type]) + 46.875)*def.level/50 + 5;

  // var reqLevel = Math.ceil((-(250+5*(myPokemon.attack+46.875))+Math.sqrt((250+5*(myPokemon.attack+4 6.875))*(250+5*(myPokemon.attack+46 .875))-(4*(myPokemon.attack+46.875)*-((((((((opPokemon.hp/mods)-2)*100/85*50)*opPokemon.defense)/movePower)*250)/2)-1250))))/(2*(myPokemon.attack+46.875)))

  for (var i = 0; true; i++) {
      att.level = i;
      var attack = ((att.attack + types[att.type]) + 46.875)*att.level/50 + 5;
      var damageMin = (((2*att.level/5+2)*attack*att.movePower/defence)/50*85/100 + 2) * mods;

      // damage has reached 100% of def pokémon's HP
      if (Math.floor(damageMin) >= HP) {
          var defSpeed = ((def.speed + types[def.type]) + 46.875)*def.level/50 + 5;
          var attSpeed = ((att.speed + types[att.type]) + 46.875)*att.level/50 + 5;
          var damageMax = (((2*att.level/5+2)*attack*att.movePower/defence)/50*100/100 + 2) * mods;
          console.log(def.type + "Pokémon level", def.level);
          console.log("| HP:", HP);
          console.log("| Speed:", Math.floor(defSpeed));
          console.log(att.type + "Pokémon level", i);
          console.log("| Min.Damage:", Math.floor(damageMin), "(" + (((100 / HP) * damageMin)).toFixed(1) + "%"+ ")");
          console.log("| Max.Damage:", Math.floor(damageMax), "(" + (((100 / HP) * damageMax)).toFixed(1) + "%" + ")");
          console.log("| Speed:", Math.floor(attSpeed));

          // att pokémon is slower, check lowest level it will be faster
          if (attSpeed < defSpeed) {
              for (i = i; true; i++) {
                  attLevel = i;
                  attSpeed = ((att.speed + types[att.type]) + 46.875)*attLevel/50 + 5;
                  if (attSpeed > defSpeed) {
                      console.log("Slower until level " + attLevel);
                      break;
                  }
              }
          }
          break;
      }
  }
}
