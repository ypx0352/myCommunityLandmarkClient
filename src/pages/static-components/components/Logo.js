import React from "react";
import styled from "styled-components";
import logo from "../../../image/myCommunityLandmarkLogo.png";

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Logo = () => {
  return <Img src={logo} alt="logo" />;
};

export default Logo;
