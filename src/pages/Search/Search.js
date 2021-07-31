import React, { Component } from "react";
import "../Home/Home.css";
import axios from "axios";
import Spinner from "../../utility/Spinner/Spinner";

import Cities from "../../utility/city/Cities";
import Activities from "../../utility/Activity/Activities";
import Venues from "../../utility/venue/Venues";
class Search extends Component {
  state = {
    Activities,
    Cities,
    Venues,
    apiResp: false,
  };
  async componentDidMount() {
    const SearchItem = this.props.match.params.searchTerm;
    console.log(SearchItem);
    const searchUrl = `${window.apiHost}/search/${SearchItem}`;
    const searchResp = await axios.get(searchUrl);
    console.log(searchResp.data);
    this.setState({
      Activities: searchResp.data.activities,
      Cities: searchResp.data.cities,
      Venues: searchResp.data.venues,
      apiResp: true,
    });
  }
  render() {
    if (!this.state.apiResp) {
      return <Spinner />;
    }
    return (
      <div className="container-fluid lower-fold">
        <div className="row">
          <div className="col s12">
            <Cities
              cities={this.state.Cities}
              header="Cities mathcing your search"
            />
          </div>
          <div className="col s12">
            <Activities
              activities={this.state.Activities}
              header="Activities matching your search"
            />
          </div>
          <div className="col s12">
            <Venues
              venues={this.state.Venues}
              header="Venues matching your search"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Search;
