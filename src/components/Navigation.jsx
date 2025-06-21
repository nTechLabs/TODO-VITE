import React from "react";
import { Menu } from "antd";
import { HomeOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";

const items = [
  { label: "Home", key: "home", icon: <HomeOutlined /> },
  { label: "Users", key: "users", icon: <UserOutlined /> },
  { label: "Settings", key: "settings", icon: <SettingOutlined /> },
];

const Navigation = ({ onSelect }) => (
  <Menu
    mode="horizontal"
    items={items}
    onClick={({ key }) => onSelect && onSelect(key)}
    style={{ marginBottom: 16 }}
  />
);

export default Navigation;
