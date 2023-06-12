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

//list pokemon name and height
for (let i = 0; i < pokemonList.length; i++) {
  document.write(
    "<p>" +
      pokemonList[i].name +
      "<br>" +
      "height:" + "  " + 
      pokemonList[i].height +
      "</p>"
  );

  //conditional if pokemon is bigger than 15
    if (pokemonList[i].height >= 15) {
      document.write( "<p>" +
        pokemonList[i].name + "<br>" + "height:" + " " +
          pokemonList[i].height + "  " + 
          "-Wow, that's big!" +
          "</p>"
      );
    }
  }