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
    loadDetails(pokemon).then(function() {
      let modalContainer = document.querySelector('#modal-container');
    let dialogPromiseReject;
  
    function showModal(title, text) {
      // Clear all existing modal content
      modalContainer.innerHTML = '';
  
      let modal = document.createElement('div');
      modal.classList.add('modal');
  
      // Add the new modal content
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);
  
      let titleElement = document.createElement('h1');
      titleElement.innerText = title;
  
      let contentElement = document.createElement('p');
      contentElement.innerText = text;
  
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);
  
      modalContainer.classList.add('is-visible');
    }
  
      function hideModal() {
      modalContainer.classList.remove('is-visible');
    
  if (dialogPromiseReject) {
    dialogPromiseReject();
    dialogPromiseReject = null;
  }  
  }
  
    function showDialog(title, text) {
    showModal(title, text);
  
    let modal = modalContainer.querySelector('.modal');
  
    let confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'Confirm';
  
    let cancelButton =   
    document.createElement('button');
    cancelButton.classList.add('modal-cancel');
    cancelButton.innerText = 'Cancel';
  
    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);
  
    confirmButton.focus();
  
  return new Promise((reslove, reject) => {
    cancelButton.addEventListener('click', hideModal);
    confirmButton.addEventListener('click',() => {
    dialogPromiseReject = null; 
      hideModal();
      resolve();
    });
    dialogPromiseReject = reject;
  });
    }
  
    document.querySelector('#show-modal').addEventListener('click', () => {
      showModal('Modal title', 'This is the modal content!');
    });
  
  
  document.querySelector('#show-dialog').addEventListener('click', () => {
    showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
      alert('confirmed!');
    }, () => {
      alert('not confirmed');
    });
  });  
  
  window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });
    
  modalContainer.addEventListener('click', (e) => {  
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
    // THE RETURN STATEMENT HERE
  })();
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
