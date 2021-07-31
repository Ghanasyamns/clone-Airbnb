import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Activity.css";

class Activity extends Component {
  //     activityType: "KAYAKING"
  // cost: 399
  // id: 1
  // image: "https://airbnb-clone-prexel-images.s3.amazonaws.com/activities/kayakingTour.jpg"
  // rating: 4.7
  // title: "Kayaking adventure"
  // totalRatings: 131
  render() {
    const { activityType, cost, id, image, rating, title, totalRatings } =
      this.props.activities;
    return (
      <div className="activity">
        <Link to={`/activity/${id}`}>
          <img src={image} alt="activity_img" />

          <div className="activity-type">
            <h5>{activityType}</h5>
          </div>
          <div className="title">
            <h6>{title}</h6>
          </div>
          <div className="cost">
            <h6>From ₹{cost}/Person</h6>
          </div>
          <div className="rating">
            <h6>
              {" "}
              <i className="material-icons">star</i>
              {rating}({totalRatings})
            </h6>
          </div>
        </Link>
      </div>
    );
  }
}
export default Activity;
