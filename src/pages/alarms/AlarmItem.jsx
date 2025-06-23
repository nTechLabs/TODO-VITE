import React from "react";
import { Card, Typography } from "antd";
import alarmData from "../../values/alarmData";

const { Text } = Typography;

export default function AlarmItem() {
  return (
    <div className="alarm-card-row">
      <div className="alarm-card-col">
        <Card bodyStyle={{ padding: 0 }} className="alarm-card">
          <div className="alarm-card-body">
            {/* Image Placeholder */}
            <div className="alarm-img">{alarmData.img}</div>
            {/* Notification Content */}
            <div className="alarm-content">
              <div className="alarm-content-header">
                <Text className="alarm-content-title">{alarmData.title}</Text>
                <Text className="alarm-content-date">{alarmData.date}</Text>
              </div>
              <Text className="alarm-content-main">{alarmData.main}</Text>
              <Text className="alarm-content-desc">{alarmData.desc}</Text>
              <div className="alarm-content-actions">
                <Text className="alarm-content-action">V</Text>
                <Text className="alarm-content-action">X</Text>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
