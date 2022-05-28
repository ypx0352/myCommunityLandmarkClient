import React, { useState } from "react";
import { Input } from "antd";
import { connect } from "react-redux";
import styled from "styled-components";
import * as actionCreators from "../../../store/actionCreators";

const StyledButton = styled.button`
  width: ${(props) => props.theme.size.buttonWidth};
  height: ${(props) => props.theme.size.buttonHeight};
  font-size: ${(props) => props.theme.size.middleTextSize};
  color: ${(props) => props.theme.color.buttonBackgroundColor};
  background-color: ${(props) => props.theme.color.buttonTextColor};
  outline: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const Searchbar = (props) => {
  const { handleSearch } = props;
  const [searchContent, setSearchContent] = useState("");
  return (
    <>
      <Input
        size="large"
        placeholder="Search users or their comments"
        value={searchContent}
        onChange={(e) => setSearchContent(e.target.value)}
      />
      <StyledButton onClick={() => handleSearch(searchContent)}>
        Search
      </StyledButton>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleSearch(searchContent) {
    dispatch(actionCreators.getPlacesAction(searchContent));
  },
});

export default connect(null, mapDispatchToProps)(Searchbar);
