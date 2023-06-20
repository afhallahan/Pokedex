let pokemonRepository = (function () {
  //IIFE
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
    let button = document.createElement("button"); //Create a button element
    button.innerText = pokemon.name; //Set button's innterText to the pokemon's name
    button.classList.add("pokemon-button"); //Add a class to the button

    listItem.appendChild(button); //Append the button to the list item
    pokemonListElement.appendChild(listItem);

    addButtonEventListener(button, pokemon);
  }

  function addButtonEventListener(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon); //Shows pokemon details in console when clicked
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      // Get modal elements

      const modalContainer = document.getElementById("modal-container");
      const modalTitle = document.getElementById("modal-title");
      const modalContent = document.getElementById("modal-content");
      const modalImage = document.getElementById("modal-image");
      const modalHeight = document.getElementById("modal-height");

      //Set modal content
      modalTitle.textContent = pokemon.name;
      modalImage.src = pokemon.imageUrl;
      modalHeight.textContent = `Height: ${pokemon.height}`;

      //Show the modal
      modalContainer.classList.display.add("modal-active");
    });
  }

  function closeModal() {
    const modalContainer = document.getElementById("modal-container");
    modalContainer.classList.remove("modal-active");
  }

  //Add event listener to close modal when the close button is clicked
  document.getElementById("modal-close").addEventListener("click", closeModal);


  //Add event listener to close modal when clicking outside the modal
  document
    .getElementById("modal-container")
    .addEventListener("click", function (event) {
      if (event.target === this) {
        closeModal();
      }
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
    }
  }

  function loadList() {
    showLoadingMessage(); //Show loading message before making API request
    return fetch(apiUrl)
      .then(function (response) {
        hideLoadingMessage(); //Hide loading message once response is received
        return response.json();
      })
      .then(function (json) {
        showLoadingMessage();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          pokemonRepository.add(pokemon);
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

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
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
