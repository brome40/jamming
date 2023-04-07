import React from "react";
import './SearchBar.css';

//'SearchBar' compnent class
class SearchBar extends React.Component {
  //Constructor:
  constructor(props) {
    super(props);
    //default state of search term
    this.state = { term: '' };
    //bind methods to always reference 'SearchBar'
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  //search Method:
  //pass the state of the term to the passed method
  search() {
    this.props.onSearch(this.state.term);
  }
  
  //handleTermChange Method:
  //event handler, set term state to target value
  handleTermChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  //Render Method:
  render() {
    return (
      <div className="SearchBar">
        <input 
          placeholder="Enter A Song, Album, or Artist" 
          onChange={this.handleTermChange} 
        />
        <button className="SearchButton" onClick={this.search}>SEARCH</button>
      </div>
    );
  }
}
//Export 'SearchBar' component class
export default SearchBar;