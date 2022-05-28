import { fromJS } from "immutable";
import * as actionTypes from "./actionTypes";

const defaultState = fromJS({
  places: [],
  mapSpinning: true,
  showCommentPanel: false,
  showNewPlacePanel: false,
  newPlaceLocation: {},
  loggedUsername: "Anonymous",
  selectedMarker: {
    name: "",
    lat: 1,
    lng: 2,
    comments: [],
  },
  muneOn: false,
});

const returnNewStateToStore = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.MAP_SPINNING:
      return state.set("mapSpinning", action.value);

    case actionTypes.SET_SHOW_NEW_PLACE_PANEL:
      return state.merge({
        showNewPlacePanel: fromJS(true),
        showCommentPanel: fromJS(false),
      });

    case actionTypes.SET_SHOW_COMMENT_PANEL:
      return state.merge({
        showCommentPanel: fromJS(true),
        showNewPlacePanel: fromJS(false),
      });

    case actionTypes.SET_NEW_PLACE_LOCATION:
      return state.set("newPlaceLocation", action.value);

    case actionTypes.SET_PLACES:
      return state.set("places", action.value);

    case actionTypes.SET_SELECTED_MARKER:
      return state.set("selectedMarker", action.value);

    case actionTypes.CLOSE_SIDE_PANEL:
      return state.merge({
        showCommentPanel: fromJS(false),
        showNewPlacePanel: fromJS(false),
      });

    case actionTypes.SET_LOGGED_USERNAME:
      return state.set("loggedUsername", action.value);

    case actionTypes.SET_MENU_ON:
      return state.set("muneOn", action.value);

    default:
      return state;
  }
};

export default returnNewStateToStore;
