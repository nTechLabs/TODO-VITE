import React from "react";
import { Badge, Space } from "antd";
import { MailOutlined, NotificationOutlined, MessageOutlined } from "@ant-design/icons";

const EtcUtil = () => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 480,
        margin: "32px auto 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Space size={32} align="center">
        <Badge count={7}>
          <MailOutlined style={{ fontSize: 32, color: "#888" }} />
        </Badge>
        <Badge count={77}>
          <NotificationOutlined style={{ fontSize: 32, color: "#888" }} />
        </Badge>
        <Badge count={777}>
          <MessageOutlined style={{ fontSize: 32, color: "#888" }} />
        </Badge>
      </Space>
    </div>
  );
};

export default EtcUtil;
