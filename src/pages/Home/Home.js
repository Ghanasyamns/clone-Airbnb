import React, { Component } from "react";
import "./Home.css";
import SearchBox from "./SearchBox";
import axios from "axios";
import Spinner from "../../utility/Spinner/Spinner";

import Cities from "../../utility/city/Cities";
import Activities from "../../utility/Activity/Activities";
import Venues from "../../utility/venue/Venues";

// import promise from "redux-promise";
class Home extends Component {
  state = {
    cities: [],
    europeCities: {},
    asiaCities: {},
    exoticCities: {},
    beachCities: {},
    activities: [],
    recVenues: {},
  };
  async componentDidMount() {
    //city
    const citiesUrl = ` ${window.apiHost}/cities/recommended`;
    const europeCityUrl = `${window.apiHost}/cities/europe`;
    const asiaCityUrl = `${window.apiHost}/cities/asia`;
    const exoticCityUrl = `${window.apiHost}/cities/exotic`;
    const beachCityUrl = `${window.apiHost}/cities/beach`;

    const cityPromises = [];
    cityPromises.push(axios.get(citiesUrl));
    cityPromises.push(axios.get(europeCityUrl));
    cityPromises.push(axios.get(asiaCityUrl));
    cityPromises.push(axios.get(exoticCityUrl));
    cityPromises.push(axios.get(beachCityUrl));

    Promise.all(cityPromises).then((data) => {
      const recommendedCities = data[0].data;
      const europeCities = data[1].data;
      const asiaCities = data[2].data;
      const exoticCities = data[3].data;
      const beachCities = data[4].data;

      this.setState({
        cities: recommendedCities,
        europeCities,
        asiaCities,
        exoticCities,
        beachCities,
      });
    });
    //activity
    const activityUrl = `${window.apiHost}/activities/today`;
    const getActivity = await axios.get(activityUrl);
    this.setState({
      activities: getActivity.data,
    });

    const venueUrl = `${window.apiHost}/venues/recommended`;
    const getVenue = await axios.get(venueUrl);

    this.setState({
      recVenues: getVenue.data,
    });
  }
  render() {
    if (this.state.cities.length === 0 || !this.state.recVenues.venues) {
      return <Spinner />;
    }

    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="home col s12">
              <div className="upper-fold">
                <SearchBox history={this.props.history} />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid lower-fold">
          <div className="row">
            <div className="col s12">
              <Cities
                cities={this.state.cities}
                header="Recomendeed Cities for you"
              />
            </div>

            <div className="col s12">
              <Activities
                activities={this.state.activities}
                header="Today in your area"
              />
            </div>
            <div className="col s12">
              <Venues
                venues={this.state.recVenues.venues}
                header={this.state.recVenues.header}
              />
            </div>
            <div className="col s12">
              <Cities
                cities={this.state.europeCities.cities}
                header={this.state.europeCities.header}
              />
            </div>
            <div className="col s12">
              <Cities
                cities={this.state.asiaCities.cities}
                header={this.state.asiaCities.header}
              />
            </div>
            <div className="col s12">
              <Cities
                cities={this.state.exoticCities.cities}
                header={this.state.exoticCities.header}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Home;
