let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // Get all pokemon
  function getAll() {
    return pokemonList;
  }

  // Add new pokemon
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // Add pokemon to webpage
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    pokemonListElement.classList.add(
      "d-flex",
      "flex-wrap",
      "justify-content-around"
    );

    // Create HTML elements
    let listItem = document.createElement("li");
    let btn = document.createElement("button");
    let itemImage = document.createElement("img");

    // Define element info
    listItem.classList.add("btn", "btn-success", "pokemon-button");
    listItem.setAttribute("type", "button");
    listItem.setAttribute("data-toggle", "modal");
    listItem.setAttribute("data-target", "#pokemonModal");
    itemImage.setAttribute("src", pokemon.imageUrl);
    itemImage.setAttribute("alt", "pokemon photo");
    itemImage.setAttribute("class", "img-fluid");

    // Append elements
    listItem.appendChild(btn);
    listItem.appendChild(itemImage);

    btn.innerText = pokemon.name;
    btn.classList.add("btn", "btn-primary");
    btn.setAttribute("data-toggle", "modal");
    btn.setAttribute("data-target", "#pokemonModal");
    btn.addEventListener("click", function () {
      showDetails(pokemon);
    });

    pokemonListElement.appendChild(listItem);
  }

  // Fetch pokemon details from API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types.map(function (type) {
          return type.type.name;
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Show pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // Add showModal function
  function showModal(pokemon) {
    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body");

    // Clear modal content
    modalTitle.empty();
    modalBody.empty();

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
    nameElement.append(pokemonName);

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
  }

  // Fetch pokemon list from API
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
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

