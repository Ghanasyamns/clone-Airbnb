import axios from "axios";
import React, { Component } from "react";
import "./SingleFullVenue.css";
import Point from "./Point";
import { connect } from "react-redux";
import openModal from "./../../actions/openModal";
import { bindActionCreators } from "redux";
import Login from "./../Login/Login";
import moment from "moment";
import swal from "sweetalert";

import loadScript from "./../../UtilityFunctions/loadScript";
class SingleFullVenue extends Component {
  state = { singleVenue: {}, points: [] };
  async componentDidMount() {
    const vid = this.props.match.params.vid;
    const url = `${window.apiHost}/venue/${vid}`;
    const getData = await axios.get(url);
    const singlevenue = getData.data;
    const pointUrl = `${window.apiHost}/points/get`;
    const axiosPoint = await axios.get(pointUrl);
    const points = singlevenue.points.split(",").map((point, i) => {
      return <Point pointDesc={axiosPoint.data} point={point} key={i} />;
    });

    this.setState({
      singleVenue: singlevenue,
      points,
    });
  }
  changeCheckIn = (e) => {
    this.setState({
      checkIn: e.target.value,
    });
  };
  chageCheckout = (e) => {
    this.setState({
      checkout: e.target.value,
    });
  };
  changeNumberOfGuests = (e) => {
    this.setState({
      numberOfGuests: e.target.value,
    });
  };
  reserveNow = async () => {
    const startDay = moment(this.state.checkIn);

    const endDay = moment(this.state.checkout);
    const diffDays = endDay.diff(startDay, "days");

    if (diffDays < 1) {
      swal({
        title: "Check out date must be after Check in date",
        icon: "error",
      });
    } else {
      //diff days is a valid number
      const pricePerNight = this.state.singleVenue.pricePerNight;
      const totalPrice = pricePerNight * diffDays;
      const scriptUrl = "https://js.stripe.com/v3";
      const stripePublicKey =
        "pk_test_5198HtPL5CfCPYJ3X8TTrO06ChWxotTw6Sm2el4WkYdrfN5Rh7vEuVguXyPrTezvm3ntblRX8TpjAHeMQfHkEpTA600waD2fMrT";
      //moving the below code to its own module
      // await new Promise((resolve, reject) => {
      //   const script = document.createElement("script");
      //   script.type = "text/javascript";
      //   script.src = scriptUrl;
      //   script.onload = () => {
      //     console.log("scipt loading");
      //     resolve();
      //   };
      //   document.getElementsByTagName("head")[0].appendChild(script);
      //   console.log("the scipt has been added to the head");
      // });
      await loadScript(scriptUrl);

      const stripe = window.Stripe(stripePublicKey);
      const stripeSessionUrl = `${window.apiHost}/payment/create-session`;
      const data = {
        venueData: this.state.singleVenue,
        totalPrice,
        diffDays,
        pricePerNight,
        checkIn: this.state.checkIn,
        checkOut: this.state.checkout,
        token: this.props.auth.token,
        numberOfGuest: this.state.numberOfGuest,
        currency: "INR",
      };
      const stripeResp = await axios.post(stripeSessionUrl, data);
      stripe
        .redirectToCheckout({
          sessionId: stripeResp.data.id,
        })
        .then((result) => {
          console.log(result);
        });
    }
  };
  render() {
    const venue = this.state.singleVenue;

    return (
      <div className="row single-venue">
        <div className="col s12 center">
          <img src={venue.imageUrl} alt="singimg" />
        </div>
        <div className="col s8 location-details offset-s2">
          <div className="col s8 left-details">
            <div className="location">{venue.location}</div>
            <div className="title">{venue.title}</div>
            <div className="guests">{venue.guests} guests</div>
            <div className="divider"></div>
            {this.state.points}

            <div className="details">{venue.details}</div>
            <div className="amenities">{venue.amenities}</div>
          </div>
          <div className="col s4 right-details">
            <div className="price-per-day">
              ₹{venue.pricePerNight} <span>per day</span>
            </div>
            <div className="rating">{venue.rating} </div>
            <div className="col s6">
              CHeck-In
              <input type="date" onChange={this.changeCheckIn} />
            </div>
            <div className="col s6">
              CHeck-Out
              <input type="date" onChange={this.chageCheckout} />
            </div>
            <div className="col s12">
              <select
                onChange={this.changeNumberOfGuests}
                className="browser-default"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guest</option>
                <option value="3">3 Guest</option>
                <option value="4">4 Guest</option>
                <option value="5">5 Guest</option>
                <option value="6">6 Guest</option>
                <option value="7">7 Guest</option>
                <option value="8">8 Guest</option>
              </select>
            </div>

            <div className="col s12 center">
              {this.props.auth.token ? (
                <button onClick={this.reserveNow} className="btn red accent-2">
                  Reserve
                </button>
              ) : (
                <div>
                  You must be{" "}
                  <span
                    className="login-text"
                    onClick={() => {
                      this.props.openModal("open", <Login />);
                    }}
                  >
                    {" "}
                    login
                  </span>{" "}
                  to reserve
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openModal,
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleFullVenue);
