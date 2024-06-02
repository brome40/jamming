import React, { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');

  const handleAddTrack = (newTrack) => {
    if (!playlistTracks.find((savedTrack) => savedTrack.id === newTrack.id)) {
      setPlaylistTracks(prevTracks => [...prevTracks, newTrack]);
    }
  };

  const handleRemoveTrack = (deletedTrack) => {
    setPlaylistTracks((prevTracks) => (
      prevTracks.filter((savedTrack) => savedTrack.id !== deletedTrack.id)
    ))
  };

  const handleUpdatePlaylistName = (newName) => {
    setPlaylistName(newName);
  }

  const handleSavePlaylist = () => {
    const currentUris = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, currentUris).then(() => {
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    })
  };

  const handleSearch = (searchTerm) => {
    Spotify.search(searchTerm).then(results => {
      setSearchResults(results);
    })
  }

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={handleSearch} />
        <div className="App-playlist">
          <SearchResults
            searchResults={searchResults}
            onAdd={handleAddTrack}
          />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={handleRemoveTrack}
            onNameChange={handleUpdatePlaylistName}
            onSave={handleSavePlaylist}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
