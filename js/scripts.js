let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  let modalContainer = document.querySelector(".modal-container");

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
        showModal(pokemon) 
      });
    }

    function showModal(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function() {
        let modalContainer = document.querySelector("#modal-container");

        modalContainer.innerText = pokemon.name;

        let pokemonImage = document.querySelector(".pokemon.image");
         pokemonImage.src = pokemon.imageUrl;

         let pokemonHeight = document.querySelector('.pokemon-height');
         pokemonHeight.innerText = 'Height: ' + (pokemon.height);

         let modal = document.createElement("div");
         modal.classList.add("modal");

         let closeButtonElement = document.createElement("button");
         closeButtonElement.classList.add("modal-close");
         closeButtonElement.innerText = "Close";
 
         closeButtonElement.addEventListener("click", hideModal);
      });
    }};

    function closeModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove("modal-is-visible");
      modalContainer.classList.add("modal");
      modalCloseButton.innerHTML = "";
    }
  
   
  //return all users
  function getAll() {
    return pokemon;
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
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
