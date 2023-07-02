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
    pokemonListElement.classList.add("list-group");

    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.setAttribute("type", "button");
    listItem.setAttribute("data-toggle", "modal");
    listItem.setAttribute("data-target", "#pokemonModal");

    let itemImage = document.createElement("img");
    itemImage.setAttribute("src", pokemon.imageUrl);
    itemImage.setAttribute("alt", "pokemon photo");
    itemImage.classList.add("img-fluid");

    listItem.innerText = pokemon.name;

    listItem.appendChild(itemImage);
    pokemonListElement.appendChild(listItem);

    listItem.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        data.results.forEach(function (item) {
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

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalTitle = document.querySelector(".modal-title");
    let modalBody = document.querySelector(".modal-body");

    modalTitle.innerText = pokemon.name;
    modalBody.innerHTML = "";

    let imageElement = document.createElement("img");
    imageElement.classList.add("modal-img");
    imageElement.setAttribute("src", pokemon.imageUrl);

    let nameElement = document.createElement("h1");
    nameElement.innerText = pokemon.name;

    let heightElement = document.createElement("p");
    heightElement.innerText = "Height: " + pokemon.height;

    let typesElement = document.createElement("p");
    typesElement.innerText = "Types: " + getFormattedTypes(pokemon.types);

    modalBody.appendChild(imageElement);
    modalBody.appendChild(nameElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(typesElement);
  }

  function getFormattedTypes(types) {
    return types.join(", ");
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
