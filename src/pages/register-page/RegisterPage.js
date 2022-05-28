import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Logo from "../../image/myCommunityLandmarkLogo.png";
import * as actionCreators from "../../store/actionCreators";
import Header from "../static-components/Header";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const ContentContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Mulish", sans-serif;
  margin: 0 20px;
  overflow: auto;
`;

const Wrapper = styled.div`
  height: 70%;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-color: white;
  -webkit-box-shadow: 0px 0px 20px -6px #000000;
  box-shadow: 0px 0px 20px -6px #000000;
`;

const LogoImage = styled.img`
  width: 30%;
`;

const LogoText = styled.div`
  font-weight: bold;
  font-style: 19px;
  color: #a4a6b3;
`;

const Title = styled.h1`
  font-style: 24px;
  font-weight: bold;
`;

const Subtitle = styled.div`
  font-style: 14px;
  color: #9fa2b4;
`;

const InputWrapper = styled.div`
  width: 300px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Label = styled.label`
  width: 100%;
  font-weight: bold;
  color: #9fa2b4;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  line-height: 30px;
  padding: 5px;
  border: 1px solid #9fa2b4;
  border-radius: 5px;
  background-color: #fcfdfe;
  outline: none;
  margin-top: 5px;
  font-weight: bold;
  ::placeholder {
    color: #9fa2b4;
    font-weight: normal;
  }
  &.error {
    border-color: darkred;
  }
`;

const Button = styled.button`
  width: 312px;
  padding: 15px;
  margin-top: 20px;
  border-radius: 8px;
  border: none;
  background-color: #3751ff;
  cursor: pointer;
  color: white;
`;

const TextWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Text = styled.div``;
const Link = styled.a`
  margin-left: 5px;
  color: #3751ff;
  font-weight: bold;
  text-decoration: none;
`;

const RegisterPage = (props) => {
  const { handleSubmit } = props;

  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  };

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <Wrapper>
          <LogoImage src={Logo}></LogoImage>
          <Title>Sign Up </Title>
          <Subtitle>Enter your name and password below</Subtitle>
          <InputWrapper>
            <Label>NAME</Label>
            <Input
              placeholder="Name"
              type="text"
              name="username"
              onChange={handleInput}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>PASSWORD</Label>
            <Input
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleInput}
            />
          </InputWrapper>
          <Button onClick={(e) => handleSubmit(registerInfo)}>Sign Up</Button>
          <TextWrapper>
            <Text>Already have an account?</Text>
            <Link href="/login">Log In</Link>
          </TextWrapper>
        </Wrapper>
      </ContentContainer>
    </PageContainer>
  );
};

const mapDispatch = (dispatch) => ({
  handleSubmit(registerInfo) {
    dispatch(actionCreators.registerAction(registerInfo));
  },
});

export default connect(null, mapDispatch)(RegisterPage);
