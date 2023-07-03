let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (typeof pokemon === "object") {
      pokemonList.push(pokemon);
    }
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let pokemonListItem = document.createElement("li");
    let btn = document.createElement("button");

    pokemonListItem.classList.add("list-group", "text-center", "border-0");

    btn.setAttribute("data-toggle", "modal");
    btn.setAttribute("data-target", "#pokemonModal");
    btn.classList.add("btn-secondary", "mt-1", "p-2", "border-0", "fs-5");

    btn.addEventListener("click", function () {
      showDetails(pokemon);
    });
  
    btn.innerText = pokemon.name;
    pokemonListItem.appendChild(btn);
    pokemonList.appendChild(pokemonListItem);
  }

  function getAll() {
    return pokemonList;
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
            height: item.height,
            weight: item.weight,
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

  let searchItem = () => {
    let searchInput = document.querySelector("#input").value.toLowerCase();
    let listArray = document.querySelectorAll(".list-group-item");

    listArray.forEach((pokemon) => {
      let listBtn = pokemon.querySelector(".btn-secondary").innerText.toLowerCase();
      if (listBtn.includes(searchInput)) {
        pokemon.style.display = "block";
      } else {
        pokemon.style.display = "none";
      }
    });
  };  

  let searchInput = document.querySelector("#input");
  searchInput.addEventListener("input", () => searchItem());


  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl, pokemon.weight);
    }).catch(() => {
    });
  }

  function showModal(pokemonName, pokemonHeight, pokemonImage, pokemonWeight) {
    let title = document.querySelector(".modal-title");
    title.innerText = pokemonName.toUpperCase();
    let height = document.querySelector(".pokemonHeight");
    let imgDetails = document.querySelector(".PokemonImg");
    let weight = document.querySelector(".pokemonWeight");
    weight.innerText = "Weight: " + pokemonWeight + "KG";
    height.innerText = "Height: " + pokemonHeight + "M";
    imgDetails.src = pokemonImage;
  }

  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#pokemonModal");
    if (e.key === "Escape" && modalContainer.classList.contains("show")) {
      hideModal();
    }
  });

  let logoRefresh = document.querySelector(".page-header__item");
  logoRefresh.addEventListener("click", () => {
    window.location.reload();
  });

  let modalContainer = document.querySelector("#pokemonModal");
  modalContainer.addEventListener("click", (e) => {

    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  function hideModal() {
    let modalContainer = document.querySelector("#pokemonModal");
    modalContainer.classList.remove("show");
    modalContainer.style.display = "none";
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
