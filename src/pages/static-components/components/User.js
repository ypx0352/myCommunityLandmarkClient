import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fromJS } from "immutable";
import * as actionCreators from "../../../store/actionCreators";
import * as actionTypes from "../../../store/actionTypes";

const UserContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: baseline;
  min-width: 300px;
`;

const StyledButton = styled.button`
  width: ${(props) => props.theme.size.buttonWidth};
  height: ${(props) => props.theme.size.buttonHeight};
  font-size: ${(props) => props.theme.size.middleTextSize};
  color: ${(props) => props.theme.color.buttonBackgroundColor};
  background-color: ${(props) => props.theme.color.buttonTextColor};
  outline: none;
  border: none;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 20px;
  &.hide {
    display: none;
  }
`;

const User = (props) => {
  const { loggedUsername, handleLogOut, setLoggedUsername } = props;
  const usernameInLocalStorage = localStorage.getItem("username");

  useEffect(() => {
    if (usernameInLocalStorage !== null) {
      setLoggedUsername(usernameInLocalStorage);
    }
  });

  return (
    <UserContainer>
      <Link to="/login">
        <StyledButton
          type="primary"
          className={loggedUsername === "Anonymous" ? "" : "hide"}
        >
          Log in
        </StyledButton>
      </Link>
      <StyledButton
        type="primary"
        className={loggedUsername === "Anonymous" ? "hide" : ""}
        onClick={handleLogOut}
      >
        Log out
      </StyledButton>
      <h3>{loggedUsername === "Anonymous" ? "" : `Hi, ${loggedUsername}`}</h3>
    </UserContainer>
  );
};

const mapStateToProps = (state) => ({
  loggedUsername: state.get("loggedUsername"),
});

const mapDispatchToProps = (dispatch) => ({
  handleLogOut() {
    dispatch(actionCreators.logoutAction);
  },

  setLoggedUsername(value) {
    dispatch({ type: actionTypes.SET_LOGGED_USERNAME, value: fromJS(value) });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(User);
