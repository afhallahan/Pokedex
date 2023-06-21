let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListItem(pokemon) {

    let pokemonListElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");

    let button = document.createElement("button");

    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);

    addButtonEventListener(button, pokemon);
  }

  function addButtonEventListener(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }
  
    function showLoadingMessage() {
      let loadingMessage = document.createElement("p");
      loadingMessage.innerText = "Loading..";
      document.body.appendChild(loadingMessage);
    }

    function hideLoadingMessage() {
      let loadingMessage = document.querySelector("p");
      if (loadingMessage) {
        loadingMessage.remove();
      }}

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (json) {
        showLoadingMessage();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
        hideLoadingMessage();
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (details) {
        showLoadingMessage();
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        hideLoadingMessage();
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

    function showDetails(pokemon) {
      loadDetails(pokemon).then(function() {
        showModal(pokemon); 
      });
    }

    function showModal(pokemon) {
      let modalTitle = document.querySelector(".modal-title");
      let imageContainer = document.querySelector(".image-container");
      let pokemonHeight = document.querySelector(".heigh");

        modalTitle.innerText = pokemon.name;

        let pokemonImage = document.createElement("img");
         pokemonImage.src = pokemon.imageUrl;
         pokemonImage.classList.add("pokemon-image");

         imageContainer.innerHTML = "";
         imageContainer.appendChild(pokemonImage);

         pokemonHeight.innerText = 'Height: ' + pokemon.height;

         let modal = document.querySelector(".modal-container");
         modal.classList.add("modal-is-visible");
    }
         function closeModal() {
          let modalContainer = document.querySelector('#modal-container');
          modal.classList.remove("modal-is-visible");

         }
    
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };

})();

//console.log(pokemonRepository.getAll()); // []
//pokemonRepository.add({ name: "Pikachu" });
//console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
