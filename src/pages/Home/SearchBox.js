import React from "react";
import "./searchBox.css";
import useControlledInput from "../../customHooks/useControlledInput";
function SearchBox(props) {
  const where = useControlledInput("");
  const checkIn = useControlledInput("");
  const checkOut = useControlledInput("");
  const guests = useControlledInput(1);

  const submitSearch = (e) => {
    e.preventDefault();
    props.history.push(`/search/${where.value}`);
  };

  return (
    <div className="home-search-box col m4">
      <h1>Book unique places to stay and things to do</h1>
      <form className="search-box-form" onSubmit={submitSearch}>
        <div className="col m12">
          <div className="form-label">where</div>
          <div className="input-field" id="where">
            <input
              className="browser-default"
              {...where}
              placeholder="Anywhere"
              type="text"
            />
          </div>
        </div>
        <div className="col m6">
          <div className="form-label">check in</div>
          <div className="input-field" id="check-In">
            <input className="browser-default" {...checkIn} type="date" />
          </div>
        </div>
        <div className="col m6">
          <div className="form-label">check Out</div>
          <div className="input-field" id="check-out">
            <input className="browser-default" {...checkOut} type="date" />
          </div>
        </div>
        <div className="col m12">
          <div className="form-label">Guests</div>
          <div className="input-field" id="guests">
            <input
              className="browser-default"
              {...guests}
              placeholder="Guests"
              type="number"
            />
          </div>
        </div>
        <div className="col m12 submit-btn ">
          <div className="input-field" id="submit-btn">
            <input
              className="btn-large waves-effect waves-light red accent-2"
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
export default SearchBox;
