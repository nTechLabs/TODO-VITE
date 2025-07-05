import React, { useState } from "react";
import { Typography, Card, Form, Input, Button, DatePicker, Row, Col, Dropdown, Menu } from "antd";
import { RightOutlined, CalendarOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const statusOptions = [
  "전체",
  "임시보관",
  "신청",
  "검토중",
  "반려",
  "승인"
];

function VisitReservation() {
  const [status, setStatus] = useState("전체");

  const menu = (
    <Menu
      onClick={({ key }) => setStatus(key)}
      items={statusOptions.map(option => ({ key: option, label: option }))}
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
              <span style={{ fontWeight: 500, fontSize: 16 }}>처리상태</span>
              <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
                <span style={{ fontSize: 16, color: '#888', display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}>
                  {status} <RightOutlined style={{ fontSize: 14, marginLeft: 2 }} />
                </span>
              </Dropdown>
            </div>
          </Col>
        </Row>
        <Row gutter={16} align="middle">
          <Col span={24}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Form.Item label="방문기간" name="visitPeriod" style={{ flex: 1, marginBottom: 16 }}>
                <RangePicker
                  style={{ width: '100%' }}
                  placeholder={["시작일", "종료일"]}
                  inputReadOnly
                  allowClear
                  separator={<span style={{ color: '#bfbfbf', fontSize: 18, margin: '0 8px' }}>→</span>}
                  picker="date"
                  format="YYYY-MM-DD"
                  placement="bottomLeft"
                />
              </Form.Item>
              <CalendarOutlined style={{ fontSize: 22, color: '#bfbfbf', marginLeft: 8, marginTop: 24 }} />
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="방문업체명" name="company">
              <Input placeholder="검색어를 입력해주세요." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="신청기간" name="applyPeriod">
              <RangePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="방문객명" name="visitor">
              <Input placeholder="검색어를 입력해주세요." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="제재대상" name="restricted">
              <Input placeholder="" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ textAlign: "center", marginTop: 24 }}>
          <Button type="primary" htmlType="submit" style={{ width: 200 }}>
            검색
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default VisitReservation;
