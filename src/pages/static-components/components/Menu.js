import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fromJS } from "immutable";
import * as actionCreators from "../../../store/actionCreators";
import * as actionTypes from "../../../store/actionTypes";

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  &.hide {
    display: none;
  }
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 120px;
  cursor: pointer;
  font-size: large;
  border-bottom: 1px solid ${(props) => props.theme.color.primaryTextColor};
  background-color: ${(props) => props.theme.color.secondaryTextColor};
  color: ${(props) => props.theme.color.buttonBackgroundColor};
  border-radius: 4px;
  :hover {
    background-color: ${(props) => props.theme.color.primaryTextBackroundColor};
  }
`;

const Menu = (props) => {
  const { showMyPlaces, showAllPlaces, loggedUsername, muneOn } = props;
  return (
    <MenuContainer className={muneOn ? "" : "hide"}>
      <Link to="/">
        <MenuItem onClick={showAllPlaces}>All Places</MenuItem>
      </Link>
      <MenuItem
        onClick={() => {
          showMyPlaces(loggedUsername);
        }}
      >
        My Places
      </MenuItem>
    </MenuContainer>
  );
};

const mapStateToProps = (state) => ({
  loggedUsername: state.get("loggedUsername"),
  muneOn: state.get("muneOn"),
});

const mapDispatchToProps = (dispatch) => ({
  showMyPlaces(creator) {
    dispatch(actionCreators.myPlacesAction(creator));
    dispatch({ type: actionTypes.SET_MENU_ON, value: fromJS(false) });
  },

  showAllPlaces() {
    dispatch(actionCreators.getPlacesAction("all"));
    dispatch({ type: actionTypes.SET_MENU_ON, value: fromJS(false) });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
