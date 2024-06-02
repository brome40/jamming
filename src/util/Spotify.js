import SearchBar from "../components/SearchBar/SearchBar";

const redirectUri = 'http://brome-musicapp.surge.sh';
let accessToken;

const Spotify = {
  //getAccessToken Method:
  //user receives access token through implicit grant flow
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    //check for access token match in url
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    //check if both are present in URL:
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      //clear params and allow new access token for when old expires
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      //redirect users to the URL below, this calls the Auth API
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_API_KEY}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  //search Method:
  //queries API for term, returns track object list
  search(term) {
    const accessToken = Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }

      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  //savePlaylist Method:
  //1.GET request returns 'userId'
  //2.POST request uses 'userId' in API call, assigns 'name' param to new playlist, returns 'playlistId'
  //3.POST request uses 'userId' and 'playlistId' in API call, adds 'trackUris' param to playlist
  savePlaylist(name, trackUris) {
    //check if arguments have values
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    //GET request that matches Spotify username to 'userId'
    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json() //convert API response to JSON
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      //POST request to create new playlist and assigns 'playlistId'
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ name: name })
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        //POST request to add tracks to new playlist
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
        {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ uris: trackUris })
        });
      });
    });
  }
}

export default Spotify;
