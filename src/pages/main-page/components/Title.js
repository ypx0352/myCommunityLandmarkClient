import React from "react";
import { Divider } from "antd";

const Title = (props) => {
  return <Divider orientation="center">{props.title}</Divider>;
};

export default Title;
