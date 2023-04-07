import React from "react";
import './TrackList.css';
import Track from '../Track/Track';

//'TrackList' component class
class TrackList extends React.Component {
  //Constructor:
  constructor(props) {
    super(props);
  }

  //Render Method:
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => {
          return <Track 
            track={track} 
            key={track.id}
            onAdd={this.props.onAdd}
            onRemove={this.props.onRemove}
            isRemoval={this.props.isRemoval}
          />;
          
        })}
      </div>
    );
  }
}
//Export 'TrackList' component class
export default TrackList;