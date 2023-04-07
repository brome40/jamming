import React from "react";
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

//'SearchResults' component class
class SearchResults extends React.Component {
  //Constructor:
  constructor(props) {
    super(props);
  }  
  
  //Render Method:
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList 
          tracks={this.props.searchResults} 
          onAdd={this.props.onAdd}
          isRemoval={false}
        />
      </div>
    );
  }
}
//Export 'SearchResults' component class
export default SearchResults;