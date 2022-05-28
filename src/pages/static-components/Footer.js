import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  color: ${(props) => props.theme.color.buttonBackgroundColor};
  background-color: ${(props) => props.theme.color.primaryTextBackroundColor};
  margin-top: 10px;
`;
const Footer = () => {
  return <FooterContainer>Copyright @ My Community </FooterContainer>;
};

export default Footer;
