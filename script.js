const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");

function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao buscar dados');
      }
      return response.json();
    })
    .then((results) => displayResults(results, searchTerm))
    .catch((error) => {
      console.error(error);
      resultArtist.classList.add("hidden");
      playlistContainer.classList.remove("hidden");
    });
}

function displayResults(results, searchTerm) {
  hidePlaylists();

  // Se não houver resultados, esconda o bloco de artista e mostre a playlist
  if (results.length === 0) {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }

  // Filtrando os resultados para mostrar apenas os que coincidem com o termo de busca
  const filteredResults = results.filter(artist => artist.name.toLowerCase().includes(searchTerm));

  if (filteredResults.length > 0) {
    // Exibir o primeiro artista encontrado
    const artist = filteredResults[0]; // Pode ser ajustado para exibir o primeiro ou qualquer outro critério
    const artistImage = document.getElementById("artist-img");
    const artistName = document.getElementById("artist-name");

    artistImage.src = artist.urlImg || ''; // Verifique se a URL da imagem está disponível
    artistName.innerText = artist.name || 'Artista desconhecido'; // Exibe o nome do artista

    resultArtist.classList.remove("hidden");
  } else {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
  }
}

function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }
  requestApi(searchTerm); // Realiza a pesquisa na API com o termo digitado
});
