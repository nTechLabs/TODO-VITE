import React from "react";
import { Typography, Card, Descriptions, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

// visitList의 mockData와 동일하게 유지
const mockData = [
  {
    name: "홍길동",
    restricted: "제재대상",
    company: "한국 기술",
    date: "2025.05.12 오후 04:18",
    status: "신청"
  },
  {
    name: "사인일",
    restricted: "비대상",
    company: "한국 기술",
    date: "2025.05.12 오후 04:12",
    status: "신청"
  },
  {
    name: "홍길동",
    restricted: "비대상",
    company: "한국 기술",
    date: "2025.05.02 오전 11:19",
    status: "신청"
  },
  {
    name: "홍길동",
    restricted: "비대상",
    company: "한국 기술",
    date: "2025.04.23 오전 11:13",
    status: "신청"
  },
  {
    name: "홍길동",
    restricted: "비대상",
    company: "한국 기술",
    date: "2025.04.15 오전 09:08",
    status: "신청"
  }
];

function VisitDetail() {
  const { idx } = useParams();
  const navigate = useNavigate();
  const detail = mockData[idx] || {};

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #f0f1f2' }}>
      <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee', padding: '12px 0 8px 0', marginBottom: 8 }}>
        <HomeOutlined style={{ fontSize: 22, color: '#e74c3c', marginRight: 8 }} />
        <Typography.Title level={5} style={{ margin: 0, flex: 1, fontWeight: 600 }}>
          방문예약 신청 상세보기
        </Typography.Title>
      </div>
      <Card bordered={false} style={{ background: 'transparent' }}>
        <Descriptions column={1} bordered size="middle">
          <Descriptions.Item label="이름">{detail.name}</Descriptions.Item>
          <Descriptions.Item label="제재대상">{detail.restricted}</Descriptions.Item>
          <Descriptions.Item label="소속/업체명">{detail.company}</Descriptions.Item>
          <Descriptions.Item label="방문일시">{detail.date}</Descriptions.Item>
          <Descriptions.Item label="상태">{detail.status}</Descriptions.Item>
        </Descriptions>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Button type="primary" onClick={() => navigate(-1)}>목록으로</Button>
        </div>
      </Card>
    </div>
  );
}

export default VisitDetail;
