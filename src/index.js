import { fetchImages } from "./js/fetch-images";
import { renderGallery } from "./js/render-gallery";
import Notiflix from "notiflix";
const searchForm = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
let page = 1;
let query;
loadMoreBtn.hidden = true;
searchForm.addEventListener("submit", onSearchForm);
loadMoreBtn.addEventListener("click", onLoadMoreBtn);

async function onSearchForm(evt) {
  evt.preventDefault();
  loadMoreBtn.hidden = true;
  gallery.innerHTML = "";
  page = 1;
  query = evt.currentTarget[0].value.trim();
  loadMoreBtn.classList.remove("is-hidden");
  if (query === "") {
    Notiflix.Notify.failure("Please fill in the search field");
  } else {
    const images = await fetchImages(query, page);
    console.log(images);
    if (images.totalHits === 0) {
      Notiflix.Notify.failure(
        "Sorry, there are no images matching your search query. Please try again."
      );
    } else {
      gallery.insertAdjacentHTML("beforeend", renderGallery(images.hits));
      loadMoreBtn.hidden = false;
    }
  }
}
async function onLoadMoreBtn() {
  page += 1;
  const images = await fetchImages(query, page);
  if (images.hits.length < 40 && images.hits.length !== 0) {
    loadMoreBtn.hidden = true;
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
  gallery.insertAdjacentHTML("beforeend", renderGallery(images.hits));
}
