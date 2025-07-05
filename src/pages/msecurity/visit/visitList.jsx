import React from "react";
import { Typography } from "antd";
import { HomeOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// Mock data for visit list

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

function VisitList() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 600, margin: "40px auto", borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px #f0f1f2' }}>
      <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee', padding: '12px 0 8px 0', marginBottom: 8 }}>
        <HomeOutlined style={{ fontSize: 22, color: '#e74c3c', marginRight: 8 }} />
        <Typography.Title level={5} style={{ margin: 0, flex: 1, fontWeight: 600 }}>
          방문예약 신청/접수 현황
        </Typography.Title>
        <SearchOutlined style={{ fontSize: 22, color: '#e74c3c', cursor: 'pointer' }} />
      </div>
      <div style={{ background: '#fff', borderRadius: 8, minHeight: 320, padding: 0 }}>
        {mockData.map((item, idx) => (
          <div
            key={idx}
            style={{ borderBottom: idx !== mockData.length - 1 ? '1px solid #f0f0f0' : 'none', padding: '16px 0 8px 0', display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}
            onClick={() => navigate(`/msecurity/visit/detail/${idx}`)}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <span style={{ fontWeight: 500, fontSize: 16 }}>{item.name}</span>
                {item.restricted && (
                  <span style={{ color: item.restricted === '제재대상' ? '#e74c3c' : '#888', fontSize: 13, fontWeight: 500, marginLeft: 8 }}>{item.restricted}</span>
                )}
              </div>
              <div style={{ color: '#666', fontSize: 14, marginBottom: 2 }}>{item.company}</div>
              <div style={{ color: '#aaa', fontSize: 13 }}>{item.date}</div>
            </div>
            <div style={{ minWidth: 48, textAlign: 'right', marginLeft: 8 }}>
              <span style={{ color: '#1abc9c', fontWeight: 600, fontSize: 16 }}>{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VisitList;
