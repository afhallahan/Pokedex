let pokemonList = [
  {
    name: "Kingdra",
    height: 1.8,
    types: ["dragon", "water"],
  },
  {
    name: "Wigglytuff",
    height: 12,
    types: ["fairy", "normal"],
  },
  {
    name: "Rhydon",
    height: 120,
    types: ["rock", "ground"],
  },
];


pokemonList.forEach(function(pokemon) {
  document.write(pokemon.name +  " " + ' is ' + " " + pokemon.height + '<br></br>'); 
});


