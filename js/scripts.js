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
    
    //Create HTML elements
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    let itemImage = document.createElement('img');

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
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    })
  }
    
  function showModal(pokemon) {
    //Declare jQuery variables
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    let modalFooter = $('.modal-footer');

    //Add showModal function
    function showModal (character) {
      //clear modals
    modalTitle.empty();
    modalBody.empty();
    modalHeader.empty();
    modalFooter.empty();

    //Creating element for name in modal content
    let nameElement = $("<h1>" + item.name + "</h1>");
    //Creating ing in modal content
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attt("src", item.imageUrlBack);
    //Creating element for height in modal content
    let heightElement = $("<p>" + "height : " + item.height + "</p>");
    //Creating element for weight in modal content
    let weightElement = $("<p>" + "weight : " +
    item.weight + "<p>");
    //Creating element for type in modal content
    let typesElement = $("<p>" + "types : " + item.types + "</p>");
    //Creating elememnt for abilities in modal content
    let abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p>");
  
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);

  }

  
    function closeModal() {
      modalContainer.classList.remove("modal-is-visible");
      modalContainer.innerHTML = ""; // Clear modal content
    }

    //close modal with esc key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape'  && 
      modalContainer.classList.contains('modal-is-visible'))
      {
        closeModal();
      }
    });

    modalContainer.addEventListener('click', (e) => {
      //Since this is also triggered when clicking inside the modal container
      //We only want to close if user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        closeModal();
      }
    });
  
  

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
