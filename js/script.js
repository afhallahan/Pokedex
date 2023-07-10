let pokemonRepository = (function () {
<<<<<<< HEAD
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";


  //get pokemon
  function getAll() {
    return pokemonList;
  }


  //add pokemon
  function add(pokemon) {
    if (typeof pokemon === "object") {
      pokemonList.push(pokemon);
    }
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group-item");

    let pokemonListItem = document.createElement("li");
    let btn = document.createElement("button");
    let pokemonImage = document.createElement("img");

    pokemonListItem.classList.add(
      "list-group-item",
      "d-flex",
      "row",
      "justify-center",
      "text-center",
      "border-0"
    );

    btn.innerText = pokemon.name;

    btn.classList.add('btn', 'btn-success', 'character-button');
    btn.setAttribute("data-toggle", "modal");
    btn.setAttribute("data-target", "#pokemonModal");

    pokemonImage.setAttribute('src', pokemon.image);
    pokemonImage.setAttribute('alt', pokemon.name);
    pokemonImage.setAttribute('class', 'img-fluid');

    
    btn.addEventListener("click", function () {
      showDetails(pokemon);
    });

    pokemonListItem.appendChild(btn);
    pokemonListItem.appendChild(pokemonImage);
    pokemonList.appendChild(pokemonListItem);

  }

  //show modal
  function showModal(pokemon) {
    let title = document.querySelector(".modal-title");
    let modalBody = document.querySelector(".modal-body");

    title.innerHTML = pokemon.name;
    modalBody.innerHTML = "";

    let heightElement = document.createElement("div");
    heightElement.innerText = "Height: " + pokemon.height + "M";
    modalBody.appendChild(heightElement);

    let imgElement = document.createElement("img");

    imgElement.classList.add("pokemonImg");
    imgElement.src = pokemon.imageUrl;
    modalBody.appendChild(imgElement);

    let weightElement = document.createElement("div");
    weightElement.innerText = "Weight: " + pokemon.weight + "KG";
    modalBody.appendChild(weightElement);
  }

  //fetch pokemon list from api
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

  //fetch pokemon details from api
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        console.log(details);
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types.map(function (type) {
          return type.type.name;
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //search for pokemon
  let searchInput = document.querySelector('.search-bar__input');
  let currentValue = searchInput.value;

  function getSearchInput() {
    currentValue = searchInput.value;
  }

  searchInput.addEventListener('input', getSearchInput);

  function searchForInput() {
    currentValue = searchInput.value;
    pokemonList.filter(function (pokemon) {
      if (pokemon.name.toUpperCase() === currentValue.toUpperCase()) {
        $('#pokemonModal').modal('toggle');
        showDetails(pokemon);
      }
    });
  };

 //show pokemon details
 function showDetails(pokemon) {
  loadDetails(pokemon)
    .then(() => {
      showModal(pokemon);
    })
    .catch(() => {});
}

document
.querySelector('.search-bar__button')
.addEventListener('click', searchForInput);


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
=======
    let e = [];
    function t() {
        return e;
    }
    function n(t) {
        "object" == typeof t && e.push(t);
    }
    function o(e) {
        let t = document.querySelector(".modal-title"),
            n = document.querySelector(".modal-body");
        (t.innerHTML = e.name), (n.innerHTML = "");
        let o = document.createElement("div");
        (o.innerText = "Height: " + e.height + "M"), n.appendChild(o);
        let i = document.createElement("img");
        i.classList.add("pokemonImg"), (i.src = e.imageUrl), n.appendChild(i);
        let r = document.createElement("div");
        (r.innerText = "Weight: " + e.weight + "KG"), n.appendChild(r);
    }
    function i(e) {
        return fetch(e.detailsUrl)
            .then(function (e) {
                return e.json();
            })
            .then(function (t) {
                console.log(t),
                    (e.imageUrl = t.sprites.front_default),
                    (e.height = t.height),
                    (e.weight = t.weight),
                    (e.types = t.types.map(function (e) {
                        return e.type.name;
                    }));
            })
            .catch(function (e) {
                console.error(e);
            });
    }
    let r = document.querySelector(".search-bar__input"),
        a = r.value;
    function l(e) {
        i(e)
            .then(() => {
                o(e);
            })
            .catch(() => {});
    }
    return (
        r.addEventListener("input", function e() {
            a = r.value;
        }),
        document.querySelector(".search-bar__button").addEventListener("click", function t() {
            (a = r.value),
                e.filter(function (e) {
                    e.name.toUpperCase() === a.toUpperCase() && ($("#pokemonModal").modal("toggle"), l(e));
                });
        }),
        {
            add: n,
            getAll: t,
            addListItem: function e(t) {
                let n = document.querySelector(".list-group-item"),
                    o = document.createElement("li"),
                    i = document.createElement("button");
                o.classList.add("list-group-item", "d-flex", "row", "justify-center", "text-center", "border-0"),
                    i.classList.add("btn", "btn-success", "character-button"),
                    i.setAttribute("data-toggle", "modal"),
                    i.setAttribute("data-target", "#pokemonModal"),
                    (i.innerText = t.name),
                    i.addEventListener("click", function () {
                        l(t);
                    }),
                    o.appendChild(i),
                    n.appendChild(o);
            },
            loadList: function e() {
                return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
                    .then(function (e) {
                        return e.json();
                    })
                    .then(function (e) {
                        e.results.forEach(function (e) {
                            n({ name: e.name, detailsUrl: e.url, height: e.height, weight: e.weight });
                        });
                    })
                    .catch(function (e) {
                        console.error(e);
                    });
            },
            loadDetails: i,
            showDetails: l,
            showModal: o,
        }
    );
})();
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (e) {
        pokemonRepository.addListItem(e);
    });
});
>>>>>>> d865cb7e79fdbe42366664d4ab65503c35622602
