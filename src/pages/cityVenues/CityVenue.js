import axios from "axios";
import React, { Component } from "react";
import Spinner from "../../utility/Spinner/Spinner";
import "./CityVenue.css";
import Venues from "../../utility/venue/Venues";
class CityVenue extends Component {
  state = {
    venue: [],
    header: "",
  };
  async componentDidMount() {
    const cityName = this.props.match.params.cityName;
    const url = `${window.apiHost}/venues/city/${cityName}`;
    const resp = await axios.get(url);
    this.setState({
      venues: resp.data.venues,
      header: resp.data.header,
    });
  }
  render() {
    if (!this.state.header) {
      return <Spinner />;
    }
    return (
      <div className="row">
        <Venues venues={this.state.venues} header={this.state.header} />
      </div>
    );
  }
}
export default CityVenue;
