
import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchPhotos = (searchedQuery, page) => {
   const axiosOptions = {
        params: {
        key: '32552782-0d4c86680018457e820f20492',
        q: searchedQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: 15,
    }
}

    return axios.get('', axiosOptions);
};