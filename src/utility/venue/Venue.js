import React, { Component } from "react";
import "./Venue.css";
import { Link } from "react-router-dom";
class Venue extends Component {
  render() {
    const { id, imageUrl, location, pricePerNight, rating, title } =
      this.props.venue;

    return (
      <div className="venue col s12 ">
        <Link to={`/venues/${id}`}>
          <div className="image">
            <img src={imageUrl} alt="venue_img" />
          </div>
          <div className="location-stars">
            <span className="location">{location}</span>
            <span className="rating right">
              <i className="material-icons">star</i>
              {rating}
            </span>
          </div>
          <div className="title">{title}</div>
          <div className="pricePerNight">₹{pricePerNight}/night</div>
        </Link>
      </div>
    );
  }
}

export default Venue;
// id: 3
// imageUrl: "https://airbnb-clone-prexel-images.s3.amazonaws.com/waypoints/pondhouse.jpg"
// location: " ENTIRE CABIN · ASHFIELD"
// pricePerNight: 238
// rating: 4.75
// title: "The Pondhouse - A Magical Place"
