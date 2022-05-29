import { message } from "antd";
import axios from "axios";
import { fromJS } from "immutable";
import * as actionTypes from "../store/actionTypes";

const serverBaseUrl = process.env.SERVER_URL;

export const createPlaceAction = (
  loggedUsername,
  name,
  comment,
  newPlaceLocation
) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: ` ${token}` } };
      const response = await axios.post(
        serverBaseUrl + "/api/place/add_place",
        {
          creator: loggedUsername,
          lat: newPlaceLocation.lat,
          lng: newPlaceLocation.lng,
          comment,
          name,
        },
        config
      );
      message.success(response.data.msg);
      dispatch(getPlacesAction("all"));
      dispatch({ type: actionTypes.CLOSE_SIDE_PANEL });
    } catch (error) {
      message.error(error.response.data.msg);
    }
  };
};

export const getPlacesAction = (searchContent) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${serverBaseUrl}/api/place/get_place?searchContent=${searchContent}`
      );

      dispatch({
        type: actionTypes.SET_PLACES,
        value: fromJS(response.data.result),
      });
      message.success(`${response.data.result.length} places fetched.`);
    } catch (error) {
      message.error(error.response.data.msg);
    }
  };
};

export const myPlacesAction = (creator) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: ` ${token}` } };
      const response = await axios.get(
        `${serverBaseUrl}/api/place/get_place?creator=${creator}`,
        config
      );
      dispatch({
        type: actionTypes.SET_PLACES,
        value: fromJS(response.data.result),
      });
      message.success(`${response.data.result.length} places fetched.`);
    } catch (error) {
      message.error(error.response.data.msg);
    }
  };
};

export const addCommentAction = (place_id, comment, commentator) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: ` ${token}` } };
      const response = await axios.put(
        serverBaseUrl + "/api/place/add_comment",
        {
          place_id,
          comment,
          commentator,
        },
        config
      );
      message.success(response.data.msg);
      dispatch(getPlacesAction("all"));
      dispatch({ type: actionTypes.CLOSE_SIDE_PANEL });
    } catch (error) {
      message.error(error.response.data.msg);
    }
  };
};

export const loginAction = (loginInfo) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        serverBaseUrl + "/api/user/login",
        loginInfo
      );
      message.success(response.data.msg);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      dispatch({
        type: actionTypes.SET_LOGGED_USERNAME,
        value: fromJS(response.data.username),
      });
    } catch (error) {
      message.error(error.response.data.msg);
    }
  };
};

export const registerAction = (registerInfo) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(serverBaseUrl + "/api/user/register", {
        registerInfo,
      });
      message.success(response.data.msg);
    } catch (error) {
      message.error(error.response.data.msg);
    }
  };
};

export const logoutAction = (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOGGED_USERNAME,
    value: fromJS("Anonymous"),
  });
  localStorage.clear();
  localStorage.setItem("username", "Anonymous");
};
