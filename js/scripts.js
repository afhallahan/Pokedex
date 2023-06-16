let pokemonRepository = (function () {
  //IIFE
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

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
  };
})();

//console.log(pokemonRepository.getAll()); // []
pokemonRepository.add({
  name: "Pikachu",
  height: 0.4,
  types: ["electric", "mouse"],
});
//console.log(pokemonRepository.getAll()); // [{ name: 'Pikachu' }]

pokemonRepository.getAll().forEach(function (pokemon) {
  if (pokemon.height > 12) {
    document.write(
      pokemon.name +
        " " +
        "height:" +
        " " +
        pokemon.height +
        " " +
        "-Wow, that's big!" +
        "<br></br>"
    );
  } else {
    document.write(
      pokemon.name + " " + "height:" + " " + pokemon.height + "<br></br>"
    );
  }
});
