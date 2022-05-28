import { fromJS } from "immutable";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as actionCreators from "../../../store/actionCreators";
import * as actionTypes from "../../../store/actionTypes";

const NavContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavItem = styled.div`
  font-size: ${(props) => props.theme.size.largeTextSize};
  color: ${(props) => props.theme.color.primaryTextColor};
  margin-right: 20px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.color.primaryTextBackroundColor};
  }
  /* Mobile device css */
  @media only screen and (max-width: 1250px) {
    display: none;
  }
`;

const MenuIconWrapper = styled.div`
  cursor: pointer;
  margin: 0 5px;
  /* Desktop device css */
  @media only screen and (min-width: 1251px) {
    display: none;
  }
`;

const Nav = (props) => {
  const { showMyPlaces, loggedUsername, showAllPLaces, muneOn, setMenuStatus } =
    props;
  return (
    <NavContainer>
      <MenuIconWrapper>
        {muneOn ? (
          <span
            className="material-symbols-outlined"
            onClick={() => setMenuStatus(false)}
          >
            menu_open
          </span>
        ) : (
          <span
            className="material-symbols-outlined"
            onClick={() => setMenuStatus(true)}
          >
            menu
          </span>
        )}
      </MenuIconWrapper>
      <Link to="/">
        <NavItem onClick={showAllPLaces}>All Places</NavItem>
      </Link>
      <Link to="/">
        <NavItem onClick={() => showMyPlaces(loggedUsername)}>
          My Places
        </NavItem>
      </Link>
    </NavContainer>
  );
};

const mapStateToProps = (state) => ({
  loggedUsername: state.get("loggedUsername"),
  muneOn: state.get("muneOn"),
});

const mapDispatchToProps = (dispatch) => ({
  showMyPlaces(creator) {
    dispatch(actionCreators.myPlacesAction(creator));
  },

  showAllPLaces() {
    dispatch(actionCreators.getPlacesAction("all"));
  },

  setMenuStatus(value) {
    dispatch({ type: actionTypes.SET_MENU_ON, value: fromJS(value) });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
