const clientId = '41d810fd5af44e8a94f240f8b0372daa'; // Tu Client ID de Spotify
const redirectUri = 'https://santiymery.github.io/SantiYMery/direcciones/musica.html'; // Tu Redirect URI
const scopes = [
    'user-library-read', 
    'playlist-modify-public', 
    'playlist-modify-private'
];

const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}`;

function start() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    tokenex = params.get('access_token')
    if (tokenex === null) {
        window.location.href = authUrl;
    }
}

// 🔥 Si no hay token, redirigir para autenticar
const getTokenFromUrl = () => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get('access_token');
};

let token = getTokenFromUrl();
if (!token) {

    document.getElementById("agregarMusica").style.display = "none";  // Ocultar el div si no hay token
} else {
    document.getElementById("agregarMusica").style.display = "block"; // Mostrar el div si hay token
}

// 🎯 ID de la playlist donde se agregarán las canciones
const playlistId = '0kH8RhiA1kNdQAGApmduQt';

// 👉 Obtener las canciones de la playlist
async function getPlaylistTracks() {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data.items.map(item => item.track.uri);  // Devuelve los URIs de las canciones en la playlist
}

// 👉 Buscar canciones en Spotify
async function searchSongs() {
    const query = document.getElementById('searchInput').value;
    if (!query) return;
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    displayResults(data.tracks.items);
}

// 👉 Mostrar resultados de búsqueda sin canciones duplicadas
async function displayResults(songs) {
    const songList = document.getElementById('songList');
    songList.innerHTML = '';

    // Obtener las canciones actuales en la playlist desde la API
    const existingTracks = await getPlaylistTracks();

    songs.forEach(song => {
        // Si la canción ya está en la playlist, no mostrarla
        if (existingTracks.includes(song.uri)) {
            const li = document.createElement('li');
            li.innerHTML = `
                ${song.name} - ${song.artists[0].name}
                <button class="btn" disabled>Listo!</button>
            `;
            songList.appendChild(li);
        } else {
            const li = document.createElement('li');
            li.innerHTML = `
                ${song.name} - ${song.artists[0].name}
                <button class="btn" onclick="addToPlaylist('${song.uri}')">Agregar</button>
            `;
            songList.appendChild(li);
        }
    });
}

// 👉 Agregar canción a la playlist
async function addToPlaylist(songUri) {
    // Verificar si la canción ya está en la playlist
    const existingTracks = await getPlaylistTracks();

    if (existingTracks.includes(songUri)) {
        alert('Esta canción ya está en la playlist.');
        return;
    }

    // Agregar canción a la playlist
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uris: [songUri]
        })
    });

    if (response.ok) {
        alert('¡Canción agregada a la playlist!');
        updatePlaylist();
    } else {
        alert('Error al agregar la canción.');
    }
}

// 👉 Actualizar visualmente la playlist
function updatePlaylist() {
    var iframe = document.getElementById('miMusica');
    iframe.src = iframe.src;
    iframe.contentWindow.location.reload();
}

// 👉 Event listener para la búsqueda en tiempo real
document.getElementById('searchInput').addEventListener('keyup', searchSongs);
