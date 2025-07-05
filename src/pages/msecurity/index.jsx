import React from "react";
import { Typography, Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

function MSecurity() {
  const navigate = useNavigate();
  return (
    <Card style={{ maxWidth: 480, margin: "40px auto", borderRadius: 12 }}>
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        MSecurity
      </Typography.Title>
      <Typography.Paragraph style={{ textAlign: "center" }}>
        보안 관련 기본 페이지입니다.
      </Typography.Paragraph>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
        <Button type="primary" size="large" onClick={() => navigate("/msecurity/visit")}>
          방문예약
        </Button>
      </div>
    </Card>
  );
}

export default MSecurity;
