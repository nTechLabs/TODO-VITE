import React from "react";
import { Typography, Card } from "antd";

function VisitReservation() {
  return (
    <Card style={{ maxWidth: 480, margin: "40px auto", borderRadius: 12 }}>
      <Typography.Title level={4} style={{ textAlign: "center" }}>
        방문예약 신청/접수 현황검색
      </Typography.Title>
      <Typography.Paragraph style={{ textAlign: "center" }}>
        방문예약 신청 및 접수 현황을 조회하는 페이지입니다.
      </Typography.Paragraph>
      {/* TODO: 방문예약 신청/접수 현황검색 폼 및 리스트 구현 */}
    </Card>
  );
}

export default VisitReservation;
