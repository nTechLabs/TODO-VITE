import React from "react";
import { HomeOutlined, SearchOutlined, NotificationOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Top = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
    <Button icon={<HomeOutlined />} shape="circle" />
    <Button icon={<SearchOutlined />} shape="circle" />
    <Button icon={<NotificationOutlined />} shape="circle" />
  </div>
);

export default Top;
