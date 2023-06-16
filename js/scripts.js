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

  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");

    let listItem = document.createElement("li");
    let button = document.createElement("button"); //Create a button element
    button.innerText = pokemon.name; //Set button's innterText to the pokemon's name
    button.classList.add("pokemon-button"); //Add a class to the button

    listItem.appendChild(button); //Append the button to the list item
    pokemonListElement.appendChild(listItem);

    addButtonEventListener(button, pokemon);
  }
    function addButtonEventListener(button, pokemon) {
    button.addEventListener("click", function(){
      showDetails(pokemon); //Shows pokemon details in console when clicked
    })
  };

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  };
})();

console.log(pokemonRepository.getAll()); // []
pokemonRepository.add({ name: "Pikachu" });
console.log(pokemonRepository.getAll()); // [{ name: 'Pikachu' }]

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
