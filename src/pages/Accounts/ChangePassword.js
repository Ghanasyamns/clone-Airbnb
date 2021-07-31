import axios from "axios";
import React, { Component } from "react";
import swal from "sweetalert";
class ChangePassword extends Component {
  state = { oldPassword: "", newPassword: "" };
  checkOldPW = async (e) => {
    e.preventDefault();
    this.setState({
      oldPassword: e.target.value,
    });
  };
  checkNewPW = (e) => {
    e.preventDefault();
    this.setState({
      newPassword: e.target.value,
    });
  };
  submitPW = async (e) => {
    e.preventDefault();

    const url = `${window.apiHost}/users/login`;
    const data = {
      email: this.props.auth.email,
      password: this.state.oldPassword,
    };
    const resp = await axios.post(url, data);
    // badPass = valid username, but wrong passwrod
    // -- noEmail = email is not registered
    if (resp.data.msg === "badPass") {
      swal({
        title: "Invaid Password",
        text: "The Password you provided is wrong",
        icon: "error",
      });
    } else if (resp.data.msg === "loggedIn") {
      const pwUrl = `${window.apiHost}/users/change-password`;
      const data = {
        token: this.props.auth.token,
        newPassword: this.state.newPassword,
      };
      const respPw = await axios.post(pwUrl, data);
      if (respPw.data.msg === "passUpdated") {
        swal({
          title: "Password updated",
          icon: "success",
        });
      }
    }
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={this.submitPW}>
          <input
            className="oldPw "
            id="oldpass"
            placeholder="enter old password"
            onChange={this.checkOldPW}
          ></input>
          <div>
            <input
              className="newPw "
              id="newpass"
              placeholder="enter new password"
              onChange={this.checkNewPW}
            ></input>
          </div>
          <div className="button ">
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default ChangePassword;
