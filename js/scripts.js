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
    pokemonListElement.classList.add("list-group-item", "text-center", "border-0");

    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.setAttribute("type", "button");
    listItem.setAttribute("data-toggle", "modal");
    listItem.setAttribute("data-target", "#pokemonModal");

    let itemImage = document.createElement("img");
    itemImage.setAttribute("src", pokemon.imageUrl);
    itemImage.setAttribute("alt", "pokemon photo");
    itemImage.classList.add("img-fluid");

    let btn = document.createElement("button");
    btn.setAttribute("data-toggle", "modal");
    btn.setAttribute("data-target", "#exampleModal");
    btn.classList.add("btn-secondary", "mt-1", "p-2", "border-0", "fs-5");

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

  var searchItem = () => {
    let searchInput = document.querySelector("#input").value.toLowerCase();
    let listArray = document.querySelectorAll(".list-group-item");

    listArray.forEach(pokemon => {
      let listBtn = pokemon.querySelector(".btn-secondary").innerText.toLowerCase();
      if (listBtn.includes(searchInput)) {
        pokemon.style.display = "inline-block";
      } else {
        pokemon.style.display = "none";
      }
    });
  };

  let searchInput = document.querySelector("#input");
  searchInput.addEventListener("input", () => searchItem());

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      showModal(pokemon.name, pokemon.heigh, pokemon.imageUrl, pokemon.weight);
      return pokemon;
    }).catch(() => {
    });
  }

  function showModal(pokemon) {
    let modalTitle = document.querySelector(".modal-title");
    let height = document.querySelector(".pokemonHeight");
    let imgDetails = document.querySelector(".PokemonImg");
    let weight = document.querySelector(".pokemonWeight");
    imgDetails.src = pokemonImage;
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

  window.addEventListener("keydown", e => {
    
    let modalContainer = document.querySelector("#exampleModal");
    if (e.key === "Escape" && modalContainer.classList.contains("isVisible")) {
      hideModal();
    }
  });

  let logoRefresh = document.querySelector(".logo");
  logoRefresh.addEventListener("click", () => {
    window.location.reload();
  });

  let modalContainer = document.querySelector("#exampleModal");
  modalContainer.addEventListener("click", e => {

    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  function hideModal() {
    let modalContainer = document.querySelector("#exampleModal");
    modalContainer.classList.remove("isVisible");
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
