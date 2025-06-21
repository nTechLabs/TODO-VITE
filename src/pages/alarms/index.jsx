import React from "react";
import { List, Typography, Card } from "antd";

const dummyAlarms = [
  { id: 1, message: "새로운 메시지가 도착했습니다." },
  { id: 2, message: "방문 신청이 승인되었습니다." },
  { id: 3, message: "비밀번호가 변경되었습니다." },
];

export default function Alarms() {
  return (
    <Card style={{ maxWidth: 480, margin: "32px auto" }}>
      <Typography.Title level={5} style={{ marginBottom: 16 }}>
        알림 목록
      </Typography.Title>
      <List
        dataSource={dummyAlarms}
        renderItem={(alarm) => <List.Item key={alarm.id}>{alarm.message}</List.Item>}
      />
    </Card>
  );
}
