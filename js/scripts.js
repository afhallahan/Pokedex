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
let pokemonListElement = document.querySelector(".pokemon-list");
pokemonRepository.getAll().forEach(function (pokemon) {
  let listItem = document.createElement("li");
    let button = document.createElement("button"); //Create a button element
    button.innerText = pokemon.name; //Set button's innterText to the pokemon's name
    button.classList.add("pokemon-button"); //Add a class to the button

    listItem.appendChild(button); //Append the button to the list item
    pokemonListElement.appendChild(listItem);
});
