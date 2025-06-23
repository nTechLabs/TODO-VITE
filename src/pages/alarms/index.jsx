import React from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./alarms.css";
import AlarmItem from "./AlarmItem";

const { Title } = Typography;

export default function Alarms() {
  const navigate = useNavigate();
  return (
    <div className="alarm-root">
      {/* Top Bar */}
      <div className="alarm-topbar">
        <Button
          type="link"
          className="alarm-back-btn"
          style={{
            color: "white",
            fontSize: 22,
            padding: 0,
            marginRight: 8,
            minWidth: 24,
          }}
          onClick={() => navigate("/launchpad")}
        >
          {"<"}
        </Button>
        <Title level={4} className="alarm-title">
          알림
        </Title>
        <div className="alarm-topbar-space" />
      </div>
      {/* 전체확인 전체삭제 */}
      <div className="alarm-actions">
        <Button type="link" className="alarm-action-btn">
          전체확인
        </Button>
        <Button type="link" className="alarm-action-btn">
          전체삭제
        </Button>
      </div>
      {/* Notification Card */}
      <AlarmItem />
    </div>
  );
}
