'use strict';

const inputSearch = document.querySelector('.js_search_input');
const buttonSearch = document.querySelector('.js_button_search');
const listTitles = document.querySelector('.js_ul_titles');
const favoriteTitles = document.querySelector('.js_ul_favorite');
const resetButton = document.querySelector('.js_reset');

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
      putHTML += `<img src="${tvTitles.show.image.medium}" class="title_list js_list"  ${favShowClass} id="${tvTitles.show.id}>`;
    } else {
      putHTML += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"></li>`;
    }
  }

  listTitles.innerHTML = putHTML;

  listenTvFavSelected();
}

function tvFavoriteSelected() {
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
      putHTML += `<img src="${favEl.show.image.medium}" id="${favEl.show.id} class="title_list js_list" ${favShowClass}>`;
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
    console.log(fav.show.id);

    return fav.show.id === selectedFav;
  });

  if (findFav === -1) {
    favorites.push(clickedFav);
  } else {
    favorites.splice(findFav, 1);
  }

  tvPaintedList();
  tvFavoriteSelected();
  setInLocalStorage();
}

//con esta funci??n escucho al elemento que clicko y quiero a??adir a favoritos
function listenTvFavSelected() {
  const listFavorites = document.querySelectorAll('.js_list');
  for (const favEl of listFavorites) {
    favEl.classList.add('show');
    favEl.addEventListener('click', handleFavTvSelected);
  }
}

//funci??n del api, aqu?? solo recojo la info que quiero mostrar en la web
function handleTvSearch(ev) {
  prevent(ev);
  let textUser = inputSearch.value;
  fetch('//api.tvmaze.com/search/shows?q=' + textUser)
    .then((response) => response.json())
    .then((data) => {
      tvListData = data;

      tvPaintedList();
    });
}

function prevent(ev) {
  ev.preventDefault();
}

//listener para buscar un elemento del api

buttonSearch.addEventListener('click', handleTvSearch);
resetButton.addEventListener('click', reset);

function reset() {
  listTitles.innerHTML = '';
  favoriteTitles.innerHTML = '';
}
//localstorage

function setInLocalStorage() {
  const stringData = JSON.stringify(favorites);
  localStorage.setItem('favorites', stringData);
}

function getLocalStorage() {
  const localStoragefavorites = localStorage.getItem('favorites');
  if (localStoragefavorites !== null) {
    const arrayfavorites = JSON.parse(localStoragefavorites);
    favorites = arrayfavorites;
    tvFavoriteSelected();
  }
}
getLocalStorage();
