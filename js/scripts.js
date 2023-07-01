let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //Get all characters function
  function getAll() {
    return pokemonList;
  }
  //Add new character function
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  //Add pokemon to webpage
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    
    //Create HTML elements
    let listItem = document.createElement("li");
    let btn = document.createElement("button");
    let itemImage = document.createElement('img');

    //Define element info
    listItem.classList.add(
      'd-flex',
      'flex-column-reverse',
      'justify-center',
      'listItem'
    );

    itemName.innerText = pokemon.name;
    listItem.classList.add('btn', 'btn-success', 'pokemon-button');
    listItem.setAttribute('type', 'button');
    listItem.setAttribute('date-toggle', 'modal');
    listItem.setAttribute('date-target', '#pokemonModal');
    itemImage.setAttribute('src', pokemon.image);
    itemImage.setAttribute('alt', 'pokemon photo');
    itemImage.setAttribute('class', 'img-fluid');

    listItem.addEventListner('click', function() {
      showDetails(pokemon);
    });

    pokemonListElement.appendChild(listItem);
    listItem.appendChild(itemImage);
  }

  //Add showModal function
  function showModal(pokemon) {
    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body");

    //clear modals
  modalTitle.empty();
  modalBody.empty();

//Creating element for name in modal content
let nameElement = $("<h1>" + pokemon.name + "</h1>");
//Creating ing in modal content
let imageElementFront = $('<img class="modal-img" style="width:50%">');
imageElementBack.attr("src", pokemon.imageUrl);
//Creating element for height in modal content
let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
//Creating element for weight in modal content
let weightElement = $("<p>" + "weight : " +
item.weight + "<p>");
//Creating element for type in modal content
let typesElement = $("<p>" + "types : " + pokemon.types + "</p>");
//Creating elememnt for abilities in modal content
let abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p>");

 //Append to modal
 modalTitle.append(nameElement);
 modalBody.append(imageElementFront);
 modalBody.append(imageElementBack);
 modalBody.append(heightElement);
 modalBody.append(weightElement);
 modalBody.append(typesElement);
 modalBody.append(abilitiesElement);
}

//Get api info
function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    showModal(pokemon);
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
  }
}
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

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
