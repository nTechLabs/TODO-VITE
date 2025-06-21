import React from "react";
import { Space, Alert } from "antd";

const AlertsUtil = () => {
  return (
    <Space direction="vertical" style={{ width: "100%" }} size="middle">
      <Alert message="This is a success Alert." type="success" showIcon />
      <Alert message="This is an info Alert." type="info" showIcon />
      <Alert message="This is a warning Alert." type="warning" showIcon />
      <Alert message="This is an error Alert." type="error" showIcon />
    </Space>
  );
};

export default AlertsUtil;
