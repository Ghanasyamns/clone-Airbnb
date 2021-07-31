import axios from "axios";
import moment from "moment";
import React from "react";
import swal from "sweetalert";
function Bookings(props) {
  const cancelBookings = async (bid, location) => {
    console.log(bid, location);
    const cancelReservation = await swal({
      text: `Are you sure you want to cancel your trip to ${location}`,
      icon: "warning",
      buttons: true,
    });
    if (cancelReservation) {
      const cancelUrl = `${window.apiHost}/reservation/cancel`;
      const data = {
        token: props.token,
        bid: bid,
      };
      const cancelResp = await axios.post(cancelUrl, data);
      console.log(cancelResp.data);
      if (cancelResp.data.msg === "cancelled") {
        swal({
          title: "canceled",
          icon: "success",
        });
      } else {
        swal({
          title: "there was an error cancelling",
          icon: "error",
        });
      }
    }
  };
  const bookings = props.booking.map((booking, i) => {
    const dates = `${moment(booking.checkIn).format("MMM Do")}-${moment(
      booking.checkOut
    ).format("MMM Do YYYY")}`;

    return (
      <tr key={i} className="booking-row">
        <td>
          {props.type === "past" && booking.status === "confirmed"
            ? "Completed"
            : booking.status}
        </td>
        <td>
          <div className="booking-detail">{dates}</div>
          <div className="booking-detail">{booking.venueData.title}</div>
          <div className="booking-detail">{booking.venueData.location}</div>
        </td>
        <td>
          <div className="booking-detail">Confirmation #: {booking.conf}</div>
          <div className="booking-detail">
            {booking.numberOfGuests} Guests, {booking.totalNights} Nights
          </div>
          <div className="booking-detail">
            ${booking.pricePerNight} per night
          </div>
          <div className="booking-detail">${booking.totalPrice} Total</div>
        </td>
        <td>
          <div className="booking-detail pointer">Print Reservation</div>
          {props.type === "upcoming" && booking.status !== "cancelled" ? (
            <div
              onClick={() => {
                cancelBookings(booking.id, booking.venueData.location);
              }}
              className="booking-detail pointer"
            >
              Cancel Confirmation
            </div>
          ) : (
            <></>
          )}
        </td>
      </tr>
    );
  });
  return (
    <table className="booking">
      <thead>
        <tr>
          <th>Status</th>
          <th>Dates and location</th>
          <th>Details</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{bookings}</tbody>
    </table>
  );
}
export default Bookings;
