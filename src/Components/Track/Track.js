import React from "react";
import './Track.css';

//'Track' component class
class Track extends React.Component {
  //Constructor:
  constructor(props) {
    super(props);
    //bind methods to reference 'Track' component
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }

  //addTrack Method:
  //event handler, calls passed method when + is clicked
  addTrack() {
    this.props.onAdd(this.props.track);
  }

  //removeTrack Method:
  //event handler, calls passed method when - is clicked
  removeTrack() {
    this.props.onRemove(this.props.track)
  }

  //renderAction Method:
  //Displays '+' or '-' button element based on isRemoval property
  renderAction() {
    if (this.props.isRemoval) {
      return (<button className='Track-action' onClick={this.removeTrack}>-</button>);   
    } else {
      return (<button className='Track-action' onClick={this.addTrack}>+</button>);
    }
  }

  //Render Method:
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p> {this.props.track.artist} | {this.props.track.album} </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}
//Export 'Track' component class
export default Track;