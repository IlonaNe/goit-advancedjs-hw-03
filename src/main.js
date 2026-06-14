import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from "./js/render-functions";

const form = document.querySelector(".form");

const onSearchFormSubmit = async event => {
    console.log("FORM SUBMIT FIRED");
    event.preventDefault();

    const query = form.elements["search-text"].value.trim();

    console.log(query);

    if (!query) {
        iziToast.error({
            message: "Please enter a search query",
            position: "topRight",
        });
        return;
    }
    
    console.log("Submit!");

    clearGallery();
    showLoader();

    try {
        const data = await getImagesByQuery(query);
        console.log(data);

        if (!data.hits || data.hits.length === 0) {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight",
            });
            return;
        }

        createGallery(data.hits);
        iziToast.success({
            message: `Hooray! Found ${data.hits.length} images`,
            position: "topRight",
        });
    } catch (error) {
        iziToast.error({
            message: "Something went wrong",
            position: "topRight",
        });
    } finally {
        hideLoader();
        form.reset();
    }
};

form.addEventListener("submit", onSearchFormSubmit);