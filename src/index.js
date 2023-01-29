import { fetchImages } from "./js/fetch-images";
import { renderGallery } from "./js/render-gallery";
import Notiflix from "notiflix";
const searchForm = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".btn-load-more");
let page = 1;
loadMoreBtn.classList.add("is-hidden");

searchForm.addEventListener("submit", onSearchForm);
// loadMoreBtn.addEventListener("click", onLoadMoreBtn);

function onSearchForm(evt) {
  evt.preventDefault();
  gallery.innerHTML = "";
  page = 1;
  // loadMoreBtn.hidden = false;
  loadMoreBtn.classList.remove("is-hidden");
  if (evt.currentTarget[0].value.trim() === "") {
    Notiflix.Notify.failure("Please fill in the search field");
  }
  console.log(evt.currentTarget[0].value);
  fetchImages(evt.currentTarget[0].value).then((data) => {
    if (data.hits === []) {
      Notiflix.Notify.failure(
        "Sorry, there are no images matching your search query. Please try again."
      );
    }
    gallery.insertAdjacentHTML("beforeend", renderGallery(data.hits));
    return ``;
  });
}
