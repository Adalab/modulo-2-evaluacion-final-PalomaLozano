'use strict';

const inputSearch = document.querySelector('.js_search_input'); // variable global para buscador
const buttonSearch = document.querySelector('.js_button_search'); //variable global botón buscar
const listTitles = document.querySelector('.js_ul_titles');
const favoriteTitles = document.querySelector('.js_ul_favorite');

let tvListData = [];
let favorites = [];

function tvPaintedList() {
  let putHTML = '';
  let favShowClass = '';
  for (let tvTitles of tvListData) {
    const isFav = favoriteShow(tvTitles);
    if (isFav === true) {
      favShowClass = 'favorite';
    } else {
      favShowClass = '';
    }
    putHTML += `<li class="title_list_title">${tvTitles.show.name}`;
    if (tvTitles.show.image) {
      putHTML += `<img src="${tvTitles.show.image.medium}" class="title_list js_list"  ${favShowClass} id="${tvTitles.show.id}></li>`;
    } else {
      putHTML += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"></li>`;
    }
  }

  listTitles.innerHTML = putHTML;

  listenTvFavSelected();
}

function tvFavoriteSelected() {
  // for (let favElement of favorites) {
  // }
  let putHTML = '';
  let favShowClass = 'favorites';
  for (let favEl of favorites) {
    const isFav = favoriteShow(favEl);
    if (isFav === true) {
      favShowClass = 'favorite';
    } else {
      favShowClass = '';
    }

    putHTML += '<div class= "container_favorites">';

    putHTML += `<li class="">${favEl.show.name}`;
    if (favEl.show.image) {
      putHTML += `<img src="${favEl.show.image.medium}" id="${favEl.show.id} class="title_list js_list" ${favShowClass}></li>`;
    } else {
      putHTML += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"></li>`;
    }
    putHTML += '</div>';
  }
  favoriteTitles.innerHTML = putHTML;
}

function favoriteShow(tvTitles) {
  const insideFav = favorites.find((fav) => {
    return fav.show.id === tvTitles.id;
  });
  if (insideFav === undefined) {
    return false;
  } else {
    return true;
  }
}

function handleFavTvSelected(ev) {
  const selectedFav = parseInt(ev.currentTarget.id);
  const clickedFav = tvListData.find((tvTitles) => {
    return tvTitles.show.id === selectedFav;
  });

  const findFav = favorites.findIndex((fav) => {
    return fav.show.id === selectedFav;
  });
  console.log(favorites);
  if (findFav === -1) {
    favorites.push(clickedFav);
  } else {
    favorites.splice(findFav, 1);
  }

  tvPaintedList();
  tvFavoriteSelected();
  getLocalStorage();
}

//con esta función escucho al elemento que clicko y quiero añadir a favoritos
function listenTvFavSelected() {
  const listFavorites = document.querySelectorAll('.js_list');

  for (const favEl of listFavorites) {
    favEl.addEventListener('click', handleFavTvSelected);
  }
}

//función del api, aquí solo recojo la info que quiero mostrar en la web
function handleTvSearch() {
  let textUser = inputSearch.value;
  fetch('//api.tvmaze.com/search/shows?q=' + textUser)
    .then((response) => response.json())
    .then((data) => {
      tvListData = data;

      tvPaintedList();
      prevent();
    });
}

function prevent(ev) {
  ev.preventDefault();
}

//listener para buscar un elemento del api

buttonSearch.addEventListener('click', handleTvSearch);

//localstorage

function setInLocalStorage() {
  const stringData = JSON.stringify(favorites);
  localStorage.setItem('favorites', stringData);
}

function getFromApi() {
  fetch('//api.tvmaze.com/search/shows?q=')
    .then((response) => response.json())
    .then((data) => {
      favorites = data.favorites;
      tvPaintedList();
      setInLocalStorage();
    });
}

function getLocalStorage() {
  const localStoragefavorites = localStorage.getItem('favorites');
  if (localStoragefavorites === null) {
    getFromApi();
  } else {
    const arrayfavorites = JSON.parse(localStoragefavorites);
    favorites = arrayfavorites;
    tvPaintedList();
  }
}
getLocalStorage();
