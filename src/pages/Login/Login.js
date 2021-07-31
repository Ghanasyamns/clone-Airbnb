import React, { Component } from "react";
import "./Login.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import openModal from "../../actions/openModal";
import SignUp from "./SignUp";
import axios from "axios";
import swal from "sweetalert";
import regAction from "../../actions/regAction";
class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  changeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  changePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  submitLogin = async (e) => {
    e.preventDefault();
    ///get axios request
    const url = `${window.apiHost}/users/login`;
    const data = {
      email: this.state.email,
      password: this.state.password,
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
    } else if (resp.data.msg === "noEmail") {
      swal({
        title: "Invalid Email",
        text: "The Email you provided is not registered",
        icon: "error",
      });
    } else if (resp.data.msg === "loggedIn") {
      swal({
        title: "Success",

        icon: "success",
      });
      this.props.regAction(resp.data);
    }
  };
  render() {
    console.log(this.props.auth);
    return (
      <div className="login-form">
        <form onSubmit={this.submitLogin}>
          <button className="facebook-login">Connect With Facebook</button>
          <button className="google-login">Connect With Google</button>
          <div className="login-or center">
            <span>or</span>
            <div className="or-divider"></div>
          </div>
          <input
            type="text"
            className="browser-default"
            placeholder="Email address"
            onChange={this.changeEmail}
          />
          <input
            type="password"
            className="browser-default"
            placeholder="Password"
            onChange={this.changePassword}
          />
          <button type="submit" className="sign-up-button">
            Login
          </button>
          <div className="divider"></div>
          <div>
            Don't have an account?
            <span
              className="hand_Symbol"
              onClick={() => {
                this.props.openModal("open", <SignUp />);
              }}
            >
              Sign up
            </span>
          </div>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
function mapDispatchToProps(dispatcher) {
  return bindActionCreators(
    {
      openModal: openModal,
      regAction: regAction,
    },
    dispatcher
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
