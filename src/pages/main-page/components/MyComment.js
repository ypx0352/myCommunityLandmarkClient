import React, { useState } from "react";
import { Avatar, Button, Comment, Input, message } from "antd";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actionCreators";
const { TextArea } = Input;

const MyComment = (props) => {
  const { selectedMarker, addComment, loggedUsername } = props;
  const [comment, setComment] = useState("");

  return (
    <Comment
      avatar={
        <Avatar src="https://joeschmoe.io/api/v1/random" alt={loggedUsername} />
      }
      content={
        <>
          <TextArea
            rows={4}
            value={comment}
            style={{ marginBottom: "5px" }}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            type="primary"
            style={{ marginBottom: "5px" }}
            onClick={() => {
              addComment(selectedMarker._id, comment, loggedUsername);
              setComment("");
            }}
          >
            Add Comment
          </Button>
        </>
      }
    />
  );
};

const mapStateToProps = (state) => ({
  loggedUsername: state.get("loggedUsername"),
  selectedMarker: state.get("selectedMarker").toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  addComment(place_id, comment, commentator) {
    if (comment.length === 0) {
      return message.warn("Can not post empty comment.");
    }
    dispatch(actionCreators.addCommentAction(place_id, comment, commentator));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyComment);
