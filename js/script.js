let pokemonRepository = (function () {
  let pokemonList = []
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'

  //get pokemon
  function getAll() {
    return pokemonList
  }

  //add pokemon
  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon)
    }
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.list-group-item');

    let pokemonListItem = document.createElement('li');
    let btn = document.createElement('button');
    let imgElement = document.createElement('img');

    pokemonListItem.classList.add(
      'list-group-item',
      'd-flex',
      'row',
      'justify-center',
      'text-center',
      'border-0'
    );

    btn.innerText = pokemon.name
    btn.innerText = pokemon.imageUrl

    btn.classList.add('btn', 'btn-success', 'character-button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('data-toggle', 'modal');
    btn.setAttribute('data-target', '#pokemonModal');

    imgElement.classList.add('img')
    imgElement.src = pokemon.imageUrl;
    imgElement.setAttribute('alt', 'img');
    imgElement.setAttribute('class', 'img-fluid');

    pokemonListItem.appendChild(btn);
    pokemonListItem.appendChild(imgElement);
    pokemonList.appendChild(pokemonListItem);

    btn.addEventListener('click', function () {
      showDetails(pokemon)
    })
  }

  //show modal
  function showModal(pokemon) {
    let title = document.querySelector('.modal-title')
    let modalBody = document.querySelector('.modal-body')

    title.innerHTML = pokemon.name
    modalBody.innerHTML = ''

    let heightElement = document.createElement('div')
    heightElement.innerText = 'Height: ' + pokemon.height + 'M'
    modalBody.appendChild(heightElement)

    let imgElement = document.createElement('img')

    imgElement.classList.add('pokemonImg')
    imgElement.src = pokemon.imageUrl
    modalBody.appendChild(imgElement)

    let weightElement = document.createElement('div')
    weightElement.innerText = 'Weight: ' + pokemon.weight + 'KG'
    modalBody.appendChild(weightElement)
  }

  //fetch pokemon list from api
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        data.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
            height: item.height,
            weight: item.weight,
          }
          add(pokemon)
        })
      })
      .catch(function (e) {
        console.error(e)
      })
  }

  //fetch pokemon details from api
  function loadDetails(item) {
    let url = item.detailsUrl
    return fetch(url)
      .then(function (response) {
        return response.json()
      })
      .then(function (details) {
        console.log(details)
        item.imageUrl = details.sprites.front_default
        item.height = details.height
        item.weight = details.weight
        item.types = details.types.map(function (type) {
          return type.type.name
        })
        return item;
      })
      .catch(function (e) {
        console.error(e)
      })
    }
    
  //search for pokemon
  let searchInput = document.querySelector('.search-bar__input')
  let currentValue = searchInput.value

  function getSearchInput() {
    currentValue = searchInput.value
  }

  searchInput.addEventListener('input', getSearchInput)
  

  function searchForInput() {
    currentValue = searchInput.value
    pokemonList.filter(function (pokemon) {
      if (pokemon.name.toUpperCase() === currentValue.toUpperCase()) {
        $('#pokemonModal').modal('toggle')
        showDetails(pokemon)
      }
    })
  }

  //show pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon)
      .then(() => {
        showModal(pokemon)
      })
      .catch(() => {})
  }

  document
    .querySelector('.search-bar__button')
    .addEventListener('click', searchForInput)

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  }
})()

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon)
  })
})
