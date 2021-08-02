import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./NavBar.css";
import openModal from "../../actions/openModal";
import logoutAction from "../../actions/logoutAction";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/Login/SignUp";
function NavBar(props) {
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(openModal("closed", ""));
  }, [dispatch, token]);
  // componentDidUpdate(oldProps) {
  //   if (oldProps.auth.token !== this.props.auth.token) {
  //     this.props.openModal("closed", "");
  //   }
  // }

  let navColor = "transparent";
  if (props.location.pathname !== "/") {
    navColor = "#e08362";
  }

  return (
    <div className="container-fluid nav">
      <div className="row">
        <nav className={navColor}>
          <div className="nav-wrapper">
            <Link to="/" className="logo left">
              airbnb
            </Link>
            <ul id="nav-mobile" className="right">
              <li>
                <Link to="/">English (US)</Link>
              </li>
              <li>
                <Link to="/">₹ INR</Link>
              </li>
              <li>
                <Link to="/">Become a host</Link>
              </li>
              <li>
                <Link to="/">Help</Link>
              </li>
              {email ? (
                <>
                  <li className="login-signup">
                    <Link to="/account"> {email}</Link>
                  </li>
                  <li
                    onClick={() => {
                      dispatch(logoutAction());
                    }}
                    className="login-signup"
                  >
                    <Link to="/"> Logout</Link>
                  </li>
                </>
              ) : (
                <>
                  <li
                    className="login-signup"
                    onClick={() => {
                      dispatch(openModal("open", <SignUp />));
                    }}
                  >
                    Sign up{" "}
                  </li>
                  <li
                    className="login-signup"
                    onClick={() => {
                      dispatch(openModal("open", <Login />));
                    }}
                  >
                    Log in
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
// function mapStateToProps(state) {
//   return {
//     auth: state.auth,
//   };
// // }
// function mapDispatchToProps(dispatcher) {
//   return bindActionCreators(
//     {
//       openModal: openModal,
//       logoutAction: logoutAction,
//     },
//     dispatcher
//   );
// }
// export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default NavBar;
