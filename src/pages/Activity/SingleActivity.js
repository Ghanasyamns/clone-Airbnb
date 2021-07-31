import axios from "axios";
import React, { Component } from "react";
import "./SingleActivity.css";
class SingleActivity extends Component {
  state = { data: [] };
  async componentDidMount() {
    const id = this.props.match.params.id;
    const url = `${window.apiHost}/activity/${id}`;
    const resp = await axios.get(url);
    this.setState({
      data: resp.data,
    });
  }
  render() {
    console.log(this.state.data);
    return (
      <div className="container ">
        <img
          className="center"
          width="800px"
          height="600px"
          src={this.state.data.image}
          alt="actimg"
        />
        <div className="title">
          <h5>{this.state.data.title}</h5>
        </div>
        <div className="desc">
          <h6>{this.state.data.description}</h6>
        </div>
      </div>
    );
  }
}

export default SingleActivity;
// activityType: "KAYAKING"
// cost: 399
// description: "We will provide everything you need for this experience, even the snacks! This is a private, guided tour of the Chattahoochee River.  We can accommodate up to 4 guests; we have (4) one-person kayaks and (1) two-person canoe. If there are elderly, inexperienced, or children under 10 in your group, we recommend that they ride in the canoe with Troy. Many of our guests have never kayaked; we are very accustomed to new adventurers. \nWe?ll start by unloading boats at the drop in, followed by driving to and leaving our truck at the take-out point. Then we will shuttle you in our car to the drop-in and begin our trek. The route you choose will be dependent on your comfort level, length of trip, and river conditions.  The routes we prefer are less-populated, giving us better opportunities to see wildlife.  We often see turtles, rainbow and brown trout, water birds, deer, and the occasional otter. There are multiple sandy beaches and small rock islands along the river where we can stop for photos, snacks, and swimming. At the end of the tour, Troy and I will pull your boat up to the boat ramp and assist you out of your vessel. Don?t worry, we will clean and pack everything up, making this the easiest trip down the Chattahoochee."
// duration: "6 hours"
// groupSize: 6
// id: 1
// image: "https://airbnb-clone-prexel-images.s3.amazonaws.com/activities/kayakingTour.jpg"
// rating: 4.7
// title: "Kayaking adventure"
// totalRatings: 131
