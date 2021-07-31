const initState = { openclose: "closed", content: "" };

function x(state = initState, action) {
  if (action.type === "OPEN_MODAL") {
    return action.payload;
  }
  return state;
}
export default x;
