import React from "react";
import { connect } from "react-redux";
import { Comment, Tooltip, List } from "antd";

const CommentList = (props) => {
  const { selectedMarker } = props;

  const generateData = (comments) => {
    return comments.map((item) => ({
      author: item.commentator,
      avatar: "https://joeschmoe.io/api/v1/random",
      content: <p>{item.comment}</p>,
      datetime: new Date(item.createdAt).toLocaleString(),
    }));
  };

  return (
    <>
      {!selectedMarker.name ? (
        <div>none</div>
      ) : (
        <List
          header={`${generateData(selectedMarker.comments).length} comments`}
          itemLayout="vertical"
          dataSource={generateData(selectedMarker.comments)}
          pagination={{
            pageSize: 5,
          }}
          renderItem={(item) => (
            <li>
              <Comment
                actions={item.actions}
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={
                  <Tooltip>
                    <span>{item.datetime}</span>
                  </Tooltip>
                }
              />
            </li>
          )}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  selectedMarker: state.get("selectedMarker").toJS(),
});



export default connect(mapStateToProps)(CommentList);
