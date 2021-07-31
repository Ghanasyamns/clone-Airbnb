import React, { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import openModal from "../../actions/openModal";
import SignUp from "./SignUp";
import axios from "axios";
import swal from "sweetalert";
import regAction from "../../actions/regAction";
function Login(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //can access to the store directly
  // const store = useStore();
  // console.log(store.getState());
  const submitLogin = async (e) => {
    e.preventDefault();
    ///get axios request
    const url = `${window.apiHost}/users/login`;
    const data = {
      email: email,
      password: password,
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
      //we call our register action to update our auth reducer
      dispatch(regAction(resp.data));
    }
  };
  return (
    <div className="login-form">
      <form onSubmit={submitLogin}>
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="browser-default"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
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
              dispatch(openModal("open", <SignUp />));
            }}
          >
            Sign up
          </span>
        </div>
      </form>
    </div>
  );
}

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;
