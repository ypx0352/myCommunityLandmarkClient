import React, { useState } from "react";
import { Avatar, Button, Comment, Input, message } from "antd";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actionCreators";
const { TextArea } = Input;

const NewPlace = (props) => {
  const { newPlaceLocation, handleCreate, loggedUsername } = props;
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  return (
    <Comment
      avatar={
        <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      }
      content={
        <>
          <Input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Place name"
            style={{ marginBottom: "20px" }}
          />
          <TextArea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="
          Leave some comments here..."
            style={{ marginBottom: "20px" }}
            rows={4}
          />
          <Button
            type="primary"
            style={{ marginBottom: "20px" }}
            onClick={() => {
              handleCreate(loggedUsername, name, comment, newPlaceLocation);
              setName("");
              setComment("");
            }}
          >
            Create
          </Button>
        </>
      }
    />
  );
};

const mapStateToProps = (state) => ({
  newPlaceLocation: state.get("newPlaceLocation").toJS(),
  loggedUsername: state.get("loggedUsername"),
});

const mapDispatchToProps = (dispatch) => ({
  handleCreate(loggedUsername, name, comment, newPlaceLocation) {
    if (name.length * comment.length === 0) {
      return message.warn("Please check for incomplete input。");
    }
    dispatch(
      actionCreators.createPlaceAction(
        loggedUsername,
        name,
        comment,
        newPlaceLocation
      )
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPlace);
