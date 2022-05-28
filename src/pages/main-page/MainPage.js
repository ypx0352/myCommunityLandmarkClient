import React from "react";
import GoogleMap from "./components/GoogleMap";
import styled from "styled-components";
import Header from "../static-components/Header";
import { Spin } from "antd";
import { connect } from "react-redux";
import CommentList from "./components/CommentList";
import MyComment from "./components/MyComment";
import Title from "./components/Title";
import NewPlace from "./components/NewPlace";
import Searchbar from "./components/Searchbar";
import Footer from "../static-components/Footer";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MapContainer = styled.div`
  /* Mobile device css */
  @media only screen and (max-width: 1250px) {
    height: 70vh;
  }
  /* Desktop device css */
  @media only screen and (min-width: 1251px) {
    min-height: 100vh;
  }
  width: 100%;
  position: relative;
`;

const SearchbarWrapper = styled.div`
  position: absolute;
  top: 80px;
  left: 10px;
  z-index: 1;
  width: 270px;
`;

const ContentWrapper = styled.div`
  display: flex;

  /* Mobile device css */
  @media only screen and (max-width: 1250px) {
    flex-direction: column;
  }
  /* Desktop device css */
  @media only screen and (mmin-width: 1251px) {
    flex-direction: row;
  }
`;

const CommentContainer = styled.div`
  /* Mobile device css */
  @media only screen and (max-width: 1250px) {
    width: 100%;
  }
  /* Desktop device css */
  @media only screen and (min-width: 1251px) {
    width: 50%;
    padding: 0 20px;
  }
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  &.hide {
    display: none;
  }
`;

const CommentListWrapper = styled.div``;

const MyCommentWrapper = styled.div``;

const NewPlaceContainer = styled.div`
  /* Mobile device css */
  @media only screen and (max-width: 1250px) {
    width: 100%;
  }
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  width: 50%;
  padding: 0 20px;
  &.hide {
    display: none;
  }
`;

const MainPage = (props) => {
  const { mapSpinning, showCommentPanel, showNewPlacePanel } = props;

  return (
    <PageContainer>
      <Header />
      <Spin spinning={mapSpinning} tip="Map is loading...">
        <ContentWrapper>
          <MapContainer>
            <SearchbarWrapper>
              <Searchbar />
            </SearchbarWrapper>
            <GoogleMap />
          </MapContainer>
          <CommentContainer className={showCommentPanel ? "" : "hide"}>
            <Title title="Comment" />
            <CommentListWrapper>
              <CommentList />
            </CommentListWrapper>
            <Title title="Leave your comment" />
            <MyCommentWrapper>
              <MyComment />
            </MyCommentWrapper>
          </CommentContainer>
          <NewPlaceContainer className={showNewPlacePanel ? "" : "hide"}>
            <Title title="New place" />
            <NewPlace />
          </NewPlaceContainer>
        </ContentWrapper>
      </Spin>
      <Footer />
    </PageContainer>
  );
};

const mapStateToProps = (state) => ({
  mapSpinning: state.get("mapSpinning"),
  showCommentPanel: state.get("showCommentPanel"),
  showNewPlacePanel: state.get("showNewPlacePanel"),
});

export default connect(mapStateToProps)(MainPage);
