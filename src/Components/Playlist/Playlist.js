import React from "react";
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

//'Playlist' component class
class Playlist extends React.Component {
  //Constructor:
  constructor(props) {
    super(props);
    //bind method to always reference 'Playlist'
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  //handleNameChange Method:
  //event handler, calls passed method on change
  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  } 
  
  //Render Method:
  render() {
    return (
      <div className="Playlist">
        <input 
          defaultValue={ 'New Playlist' }
          onChange={this.handleNameChange}
        />
        <TrackList 
          tracks={this.props.playlistTracks} 
          onRemove={this.props.onRemove}
          isRemoval={true}
        />
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    );
  }
}
//Export 'Playlist' component class
export default Playlist;