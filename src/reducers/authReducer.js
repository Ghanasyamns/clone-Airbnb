function x(state = {}, action) {
  if (action.type === "REGISTER_ACTION") {
    return action.payload;
  } else if (action.type === "LOGOUT") {
    return {};
  } else {
    return state;
  }
}
export default x;
