import axios from "axios";
export { fetchImages };

axios.defaults.baseURL = "https://api.example.com";
const KEY = "33186908-5568035f3500eb61b1a0cd212";

async function fetchImages(query, page) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
