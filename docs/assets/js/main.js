"use strict";const inputSearch=document.querySelector(".js_search_input"),buttonSearch=document.querySelector(".js_button_search"),listTitles=document.querySelector(".js_ul_titles"),favoriteTitles=document.querySelector(".js_ul_favorite"),resetButton=document.querySelector(".js_reset");let tvListData=[],favorites=[];function tvPaintedList(){let t="",e="";for(let i of tvListData){e=!0===favoriteShow(i)?"favorite":"",t+='<li class="title_list_title">'+i.show.name,i.show.image?t+=`<img src="${i.show.image.medium}" class="title_list js_list"  ${e} id="${i.show.id}>`:t+='<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"></li>'}listTitles.innerHTML=t,listenTvFavSelected()}function tvFavoriteSelected(){let t="",e="favorites";for(let i of favorites){e=!0===favoriteShow(i)?"favorite":"",t+='<div class= "container_favorites">',t+='<li class="">'+i.show.name,i.show.image?t+=`<img src="${i.show.image.medium}" id="${i.show.id} class="title_list js_list" ${e}>`:t+='<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"></li>',t+="</div>"}favoriteTitles.innerHTML=t}function favoriteShow(t){return void 0!==favorites.find(e=>e.show.id===t.id)}function handleFavTvSelected(t){const e=parseInt(t.currentTarget.id),i=tvListData.find(t=>t.show.id===e),s=favorites.findIndex(t=>(console.log(t.show.id),t.show.id===e));-1===s?favorites.push(i):favorites.splice(s,1),tvPaintedList(),tvFavoriteSelected(),setInLocalStorage()}function listenTvFavSelected(){const t=document.querySelectorAll(".js_list");for(const e of t)e.classList.add("show"),e.addEventListener("click",handleFavTvSelected)}function handleTvSearch(t){prevent(t);let e=inputSearch.value;fetch("//api.tvmaze.com/search/shows?q="+e).then(t=>t.json()).then(t=>{tvListData=t,tvPaintedList()})}function prevent(t){t.preventDefault()}function reset(){listTitles.innerHTML="",favoriteTitles.innerHTML=""}function setInLocalStorage(){const t=JSON.stringify(favorites);localStorage.setItem("favorites",t)}function getLocalStorage(){const t=localStorage.getItem("favorites");if(null!==t){const e=JSON.parse(t);favorites=e,tvFavoriteSelected()}}buttonSearch.addEventListener("click",handleTvSearch),resetButton.addEventListener("click",reset),getLocalStorage();