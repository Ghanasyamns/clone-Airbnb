import React, { useState, useEffect } from "react";
import "./Account.css";
import { useSelector, shallowEqual } from "react-redux";
import { Route } from "react-router-dom";
import Bookings from "./Bookings";
import AccountSideBar from "./AccountSideBar";
import ChangePassword from "./ChangePassword";
import axios from "axios";
import moment from "moment";
function Account(props) {
  const auth = useSelector((state) => state.auth, shallowEqual);
  const [pastBookings, setPastBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);

  useEffect(() => {
    const axiosUrl = `${window.apiHost}/users/getBookings`;
    const data = {
      token: auth.token,
    };
    const fetchdata = async () => {
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
      setPastBookings(pastBookings);
      setUpcomingBookings(upcomingBookings);
    };
    fetchdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                token={auth.token}
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
            render={() => <ChangePassword auth={auth} />}
          />
        </div>
      </div>
    </div>
  );
}

// export default connect(mapStateToProps)(Account);
export default Account;
