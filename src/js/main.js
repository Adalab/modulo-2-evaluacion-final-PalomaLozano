'use strict';

const inputSearch = document.querySelector('.js_search_input'); // variable global para buscador
const buttonSearch = document.querySelector('.js_button_search'); //variable global botón buscar
const listTitles = document.querySelector('.js_ul_titles');

let tvListData = [];
let writeUser = inputSearch.value;

//function handleInput() {
//inputSearch.classList.toggle('js_ul_titles');
//} no sé si es útil

function handleTvSearch() {
  let putHTML = '';
  //if (writeUser === true) {
  for (let tvTitles of tvListData) {
    putHTML += `<li class="title_list">${tvTitles.name}</li>`;
    //console.log(tvTitles);
  }
  //}
  //else {
  //  putHTML = `<li class="title_list">'No results'</li>`;
  // }

  listTitles.innerHTML = putHTML;
}

fetch('//api.tvmaze.com/search/shows?q=:' + writeUser)
  .then((response) => response.json())
  .then((data) => {
    tvListData = data; //preguntar por el atributo del array
    console.log(tvListData);
    //esto son funciones que debo de crear y de añadir aquí

    //handleTvPaintedList();

    //handleTvFavoriteSeries();
  });

//listeners

//inputSearch.addEventListener('click', handleInput);

buttonSearch.addEventListener('click', handleTvSearch);
