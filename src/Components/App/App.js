import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

//'App' component class
class App extends React.Component {
  //Constuctor:
  constructor(props) {
    super(props);
    //default state
    this.state = { 
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: []
    };
    //bind methods to always reference 'App'
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  //addTrack Method:
  //if unique, add track to end of playlist
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    //check if selected track id is unique to playlist
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    //track is new to playlist
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  //removeTrack Method:
  //filter selected track out of playlist by id
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ playlistTracks: tracks });
  }

  //updatePlaylistName Method:
  //update playlist name to passed string value
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  //savePlaylist Method:
  //assign values in state to create new playlist, reset state after
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((playlistTrack) => playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    })
  }

  //search Method:
  //queries Spotify API, updates state with track object array
  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults });
    })
  }

  //Render Method:
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}
            />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;