import React from "react";
import styled from "styled-components";
import Nav from "./components/Nav";
import Logo from "./components/Logo";
import User from "./components/User";
import Menu from "./components/Menu";

const HeaderContainer = styled.div`
  display: flex;
  padding: 0 8px;
  height: 72px;
  width: 100vw;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  z-index: 2;
`;

const LeftWrapper = styled.div`
  display: flex;
  width: 70%;
  height: 72px;
  align-items: center;
  justify-content: flex-start;
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LogoWrapper = styled.div`
  height: 100%;
  order: 1;
  margin: 0 10px;

  /* Mobile device css */
  @media only screen and (max-width: 1250px) {
    order: 2;
  }
`;
const NavWrapper = styled.div`
  align-items: center;
  order: 2;
  margin: 0 10px;
  /* Mobile device css */
  @media only screen and (max-width: 1250px) {
    order: 1;
  }
`;

const UserWrapper = styled.div`
  width: 100%;
  order: 3;
`;

const MenuWrapper = styled.div`
  order: 0;
  position: absolute;
  top: 80px;
  left: 20px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LeftWrapper>
        <LogoWrapper>
          <MenuWrapper>
            <Menu />
          </MenuWrapper>
          <Logo />
        </LogoWrapper>
        <NavWrapper>
          <Nav />
        </NavWrapper>
      </LeftWrapper>
      <RightWrapper>
        <UserWrapper>
          <User />
        </UserWrapper>
      </RightWrapper>
    </HeaderContainer>
  );
};

export default Header;
