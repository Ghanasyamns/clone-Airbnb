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
