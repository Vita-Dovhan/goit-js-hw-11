export { fetchHits }

function fetchHits(query, page) {
  return fetch(`https://pixabay.com/api/?key=25313691-12b0cc3e1565a2c76ff5ddf8f&q=${query}
    &image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
    .then(responce => responce.json())
    .then(data => {
      // console.log(data)
      return data.hits;
    });
}
