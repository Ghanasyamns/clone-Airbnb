import React, { Component } from "react";
import "./Account.css";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Bookings from "./Bookings";
import AccountSideBar from "./AccountSideBar";
import ChangePassword from "./ChangePassword";
import axios from "axios";
import moment from "moment";
class Account extends Component {
  state = {
    pastBookings: [],

    upcomingBookings: [],
  };
  async componentDidMount() {
    const axiosUrl = `${window.apiHost}/users/getBookings`;
    const data = {
      token: this.props.auth.token,
    };

    const resp = await axios.post(axiosUrl, data);

    let pastBookings = [];
    let upcomingBookings = [];
    resp.data.forEach((booking) => {
      const today = moment();
      const checkOutDate = moment(booking.checkOut);
      const diffdays = checkOutDate.diff(today, "days");
      if (diffdays < 0) {
        pastBookings.push(booking);
      } else {
        upcomingBookings.push(booking);
      }
    });
    this.setState({
      pastBookings,
      upcomingBookings,
    });
  }
  render() {
    const { pastBookings, upcomingBookings } = this.state;
    return (
      <div className="account container-fluid">
        <AccountSideBar />

        <div className="row">
          <div className="col s8 offset-s3">
            <Route
              exact
              path="/account"
              render={() => <h1>choose an option on the left</h1>}
            />
            <Route
              exact
              path="/account/reservations/confirmed"
              render={() => (
                <Bookings
                  type="upcoming"
                  booking={upcomingBookings}
                  token={this.props.auth.token}
                />
              )}
            />
            <Route
              exact
              path="/account/reservations/past"
              render={() => <Bookings type="past" booking={pastBookings} />}
            />
            <Route
              exact
              path="/account/change-pass"
              render={() => <ChangePassword auth={this.props.auth} />}
            />
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
export default connect(mapStateToProps)(Account);
