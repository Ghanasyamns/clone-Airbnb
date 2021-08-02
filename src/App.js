import "./App.css";
import React, { Component, lazy, Suspense } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Spinner from "./utility/Spinner/Spinner";
const NavBar = lazy(() => import("./utility/NavBar/NavBar"));
const Home = lazy(() => import("./pages/Home/Home"));
const SingleFullVenue = lazy(() =>
  import("./pages/SinglePageVenues/SingleFullVenue")
);
const Modal = lazy(() => import("./utility/Modal/Modal"));
const CityVenue = lazy(() => import("./pages/cityVenues/CityVenue"));
const SingleActivity = lazy(() => import("./pages/Activity/SingleActivity"));
const PaymentSuccess = lazy(() =>
  import("./pages/payementSuccess/PaymentSuccess")
);
const Account = lazy(() => import("./pages/Accounts/Account"));
const Search = lazy(() => import("./pages/Search/Search"));
class App extends Component {
  render() {
    return (
      // <div className="App">
      <Router basename="/airbnb">
        <Suspense fallback={<Spinner />}>
          <Route path="/" component={NavBar} />
          <Route exact path="/" component={Home} />
          <Route exact path="/venues/:vid" component={SingleFullVenue} />
          <Route exact path="/city/:cityName" component={CityVenue} />
          <Route exact path="/activity/:id" component={SingleActivity} />
          <Route path="/account" component={Account} />
          <Route
            exact
            path="/payment-success/:stripeToken"
            component={PaymentSuccess}
          />
          <Route path="/search/:searchTerm" component={Search} />
          <Route path="/" component={Modal} />
        </Suspense>
      </Router>
      // </div>
    );
  }
}

export default App;
