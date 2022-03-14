const BASE_URL = 'https://pixabay.com/api';

function fetchImages(name) { 
    const url = `${BASE_URL}/?key=26121476-a97ee3888781a95bbdf240963&q=${event.currentTarget.searchQuery.value}&image_type=photo&orientation=horizontal&safesearch=true`;
    return fetch(url).then(response => response.json());
};

export default { fetchImages }