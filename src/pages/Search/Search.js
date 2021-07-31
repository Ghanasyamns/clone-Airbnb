import React, { useState, useEffect } from "react";
import "./Search.css";
import axios from "axios";
import Spinner from "../../utility/Spinner/Spinner";

import Cities from "../../utility/city/Cities";
import Activities from "../../utility/Activity/Activities";
import Venues from "../../utility/venue/Venues";
function Search(props) {
  const [activities, setActivities] = useState([]);
  const [cities, setCities] = useState([]);
  const [venues, setVenues] = useState([]);
  const [apiResp, setApiResp] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const SearchItem = props.match.params.searchTerm;
      console.log(SearchItem);
      const searchUrl = `${window.apiHost}/search/${SearchItem}`;
      const searchResp = await axios.get(searchUrl);
      console.log(searchResp.data);

      setActivities(searchResp.data.activities);
      setCities(searchResp.data.cities);
      setVenues(searchResp.data.venues);
      setApiResp(true);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //only run on first render

  if (!apiResp) {
    return <Spinner />;
  }
  return (
    <div className="container-fluid lower-fold">
      <div className="row">
        <div className="col s12">
          <Cities cities={cities} header="Cities mathcing your search" />
        </div>
        <div className="col s12">
          <Activities
            activities={activities}
            header="Activities matching your search"
          />
        </div>
        <div className="col s12">
          <Venues venues={venues} header="Venues matching your search" />
        </div>
      </div>
    </div>
  );
}
export default Search;
