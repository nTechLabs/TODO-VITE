import React from "react";
import { Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./alarms.css";

const { Title, Text } = Typography;

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
      <div className="alarm-card-row">
        <div className="alarm-card-col">
          <Card bodyStyle={{ padding: 0 }} className="alarm-card">
            <div className="alarm-card-body">
              {/* Image Placeholder */}
              <div className="alarm-img">img</div>
              {/* Notification Content */}
              <div className="alarm-content">
                <div className="alarm-content-header">
                  <Text className="alarm-content-title">Comment Added</Text>
                  <Text className="alarm-content-date">2025.03.01</Text>
                </div>
                <Text className="alarm-content-main">
                  Space 없애는 방법 궁금합니다.
                </Text>
                <Text className="alarm-content-desc">
                  한건희 님이 새로운 comment를 추가했습니다.
                </Text>
                <div className="alarm-content-actions">
                  <Text className="alarm-content-action">V</Text>
                  <Text className="alarm-content-action">X</Text>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
