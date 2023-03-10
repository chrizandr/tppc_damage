# tppc_damage

Tool to calculate OHKO level and damage between two Pokemon on TPPC

Posted by Piggachew
Damage Formula:

Damage = (((2*Level/5+2)*Attack*BasePower/Defense)/50*Random[85,100]/100 + 2) * Mods[STAB, Critical, Weakness/Resistance]

Damage Formula:
. . . This is the damage formula or at the very least a step in the right direction. Analysis from several TR experiments (including Proj. Lightningrod) has proven this formula to be accurate at most within two hit points of the actual value. It is important to check these formula for validity before claiming them to be absolutely true; see Dark Pokemon having +15 boost rather than +10. On that note you can check any of the HP information (by extension damage) through the battle.v8.handler.php XML page that is called in every battle session. You require a browser with capabilities of viewing those hidden AJAX calls to see the page.

Mods
Multiple modifiers will be multiplied together.
Critical Hits: 1.5x Damage
Weakness/Resistance:
- Double Resist: 0.25x Damage (e.g. Grass/Bug takes 0.25x Damage from Ground and Grass type moves, because Bug AND Grass resist the two.)
- Single Resist: 0.5x Damage
- Neutral: 1x Damage
- Single Weakness: 2x Damage
- Double Weakness: 4x Damage (e.g. Grass/Bug takes 4x Damage from Flying type moves, because Bug AND Grass are weak to Flying.)
