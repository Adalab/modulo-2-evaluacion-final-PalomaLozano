'use strict';

const inputSearch = document.querySelector('.js_search_input'); // variable global para buscador
const buttonSearch = document.querySelector('.js_button_search'); //variable global botón buscar
const listTitles = document.querySelector('.js_ul_titles');

let tvListData = [];

function handleTvPaintedList() {
  let putHTML = '';

  for (let tvTitles of tvListData) {
    putHTML += `<li class="title_list_title">${tvTitles.show.name}`;
    if (tvTitles.show.image) {
      putHTML += `<img src="${tvTitles.show.image.medium}" class="title_list"></li>`;
    } else {
      putHTML += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">`;
    }

    console.log(tvTitles);
  }
  listTitles.innerHTML = putHTML;
}

function handleTvSearch(ev) {
  let textUser = inputSearch.value;
  fetch('//api.tvmaze.com/search/shows?q=' + textUser)
    .then((response) => response.json())
    .then((data) => {
      tvListData = data;
      handleTvPaintedList();
      ev.preventdefault(ev);
      //handleTvFavoriteSeries();
    });
}
//listeners

buttonSearch.addEventListener('click', handleTvSearch);
