let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //Get all pokemon
  function getAll() {
    return pokemonList;
  }
  //Add new pokemon
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  //Add pokemon to webpage
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    pokemonListElement.classList.add(
      'd-flex', 'flex-wrap', 'justify-content-around');

    //Create HTML elements
    let listItem = document.createElement("li");
    let btn = document.createElement("button");
    let itemImage = document.createElement('img');
  
    ///Define element info
    itemName.innerText = pokemon.name;
    listItem.classList.add('btn', 'btn-success', 'pokemon-button');
    listItem.setAttribute('type', 'button');
    listItem.setAttribute('date-toggle', 'modal');
    listItem.setAttribute('date-target', '#pokemonModal');
    itemImage.setAttribute('src', pokemon.image);
    itemImage.setAttribute('alt', 'pokemon photo');
    itemImage.setAttribute('class', 'img-fluid');

    ///Append elements
    listItem.appendChild(listItem);
    listItem.appendChild(btn);
    listItem.appendChild(itemImage); 
      
    btn.innerText = pokemon.name;
    btn.classList.add(
      "btn",
      "btn-success",
      "pokemon-button",
      "border-0",
      "fs-5"
    );
    btn.setAttribute("data-toggle", "modal");
    btn.setAttribute("data-target", "#pokemonModal");

    listItem.appendChild(btn);
    pokemonListElement.appendChild(listItem);

    btn.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  //Declare jQuery variables
  let modalTitle = $(".modal-title");
  let modalBody = $(".modal-body");
  let modalHeader = $(".modal-header");
  let modalFooter = $('.modal-footer');

  // Add showModal function
  function showModal(pokemon) {
    // Clear modals
    modalTitle.empty();
    modalBody.empty();
    modalHeader.empty();
    modalFooter.empty()

    // Creating element for name in modal content
    let nameElement = $("<h1>" + pokemon.name + "</h1>");

    // Creating image element for front sprite in modal content
    let imageElementFront = $("<img class='modal-img' style='width:50%'>");
    imageElementFront.attr("src", pokemon.imageUrl);

    // Creating element for height in modal content
    let heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");

    // Creating element for types in modal content
    let typesElement = $(
      "<p>" + "Types: " + getFormattedTypes(pokemon.types) + "</p>"
    );

    // Append elements to modal
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(heightElement);
    modalBody.append(typesElement);

    modalTitle.innerText = pokemon.name;

    modalBody.innerHTML = `
      <img src="${pokemon.imageUrl}" alt="Pokemon Image" class="pokemonImg" style="width: 50%">
      <p>Height: ${pokemon.height}</p>
      <p>Types: ${pokemon.types}</p>
    `;
  }
  
  //Show pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });

  //Show loading message
  function showLoadingMessage() {
    let loadingMessage = document.createElement("p");
    loadingMessage.innerText = "Loading..";
    document.body.appendChild(loadingMessage);
  }

  //Hide loading message
  function hideLoadingMessage() {
    let loadingMessage = document.querySelector("p");
    if (loadingMessage) {
      loadingMessage.remove();
    }
  }
  //Fetch pokemon list from API
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

  // Fetch pokemon details from API
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
        item.types = details.types.map(function (type) {
          return type.type.name;
        });
        hideLoadingMessage();
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  var searchItem = () => {
    let searchInput = document
      .querySelector("#input")
      .ariaValueMax.toLowerCase();
    let listArray = document.querySelectorAll(".list-group-item");
  };
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
