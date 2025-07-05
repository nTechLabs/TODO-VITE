import React, { useState } from "react";
import { Typography, Card, Form, Input, Button, DatePicker, Row, Col, Dropdown, Menu } from "antd";
import { RightOutlined, CalendarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import statusOptions from "./values/statusOptions";
import VisitList from "./visitList";

const { RangePicker } = DatePicker;

function VisitReservation() {
  const [status, setStatus] = useState("전체");
  const [restricted, setRestricted] = useState("전체");
  const navigate = useNavigate();

  const menu = (
    <Menu
      onClick={({ key }) => setStatus(key)}
      items={statusOptions.map(option => ({ key: option, label: option }))}
    />
  );

  const restrictedMenu = (
    <Menu
      onClick={({ key }) => setRestricted(key)}
      items={[
        { key: '전체', label: '전체' },
        { key: '대상', label: '대상' },
        { key: '비대상', label: '비대상' }
      ]}
    />
  );

  return (
    <Card style={{ maxWidth: 600, margin: "40px auto", borderRadius: 12 }}>
      <Typography.Title level={4} style={{ textAlign: "center" }}>
        방문예약 신청/접수 현황 검색
      </Typography.Title>
      <Form layout="vertical">
        <Row gutter={16} align="middle" style={{ marginBottom: 0 }}>
          <Col span={24}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 32, marginBottom: 8 }}>
              <span style={{ fontWeight: 500, fontSize: 16, minWidth: 80 }}>처리상태</span>
              <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
                <span style={{ fontSize: 16, color: '#888', display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}>
                  {status} <RightOutlined style={{ fontSize: 14, marginLeft: 2 }} />
                </span>
              </Dropdown>
            </div>
          </Col>
        </Row>
        <Row gutter={16} align="middle" style={{ marginBottom: 0 }}>
          <Col span={24}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 500, fontSize: 16, minWidth: 80 }}>방문기간</span>
              <RangePicker
                style={{ flex: 1 }}
                placeholder={["시작일", "종료일"]}
                inputReadOnly
                allowClear
                separator={<span style={{ color: '#bfbfbf', fontSize: 18, margin: '0 8px' }}>→</span>}
                picker="date"
                format="YYYY-MM-DD"
                placement="bottomLeft"
              />
            </div>
          </Col>
        </Row>
        <Row gutter={16} align="middle" style={{ marginBottom: 0 }}>
          <Col span={24}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 500, fontSize: 16, minWidth: 80 }}>방문업체명</span>
              <Input placeholder="검색어를 입력해주세요." style={{ flex: 1 }} />
            </div>
          </Col>
        </Row>
        <Row gutter={16} align="middle" style={{ marginBottom: 0 }}>
          <Col span={24}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 500, fontSize: 16, minWidth: 80 }}>신청기간</span>
              <RangePicker style={{ flex: 1 }} />
            </div>
          </Col>
        </Row>
        <Row gutter={16} align="middle" style={{ marginBottom: 0 }}>
          <Col span={24}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 500, fontSize: 16, minWidth: 80 }}>방문객명</span>
              <Input placeholder="검색어를 입력해주세요." style={{ flex: 1 }} />
            </div>
          </Col>
        </Row>
        <Row gutter={16} align="middle" style={{ marginBottom: 0 }}>
          <Col span={24}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 500, fontSize: 16, minWidth: 80 }}>제재대상</span>
              <Dropdown overlay={restrictedMenu} trigger={["click"]} placement="bottomRight">
                <span style={{ fontSize: 16, color: '#888', display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}>
                  {restricted} <RightOutlined style={{ fontSize: 14, marginLeft: 2 }} />
                </span>
              </Dropdown>
            </div>
          </Col>
        </Row>
        <Form.Item style={{ textAlign: "center", marginTop: 24 }}>
          <Button type="primary" htmlType="button" style={{ width: 200 }} onClick={() => navigate("/msecurity/visit/list")}>
            검색
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default VisitReservation;
