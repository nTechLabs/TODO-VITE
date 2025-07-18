import React from "react";
import { Button, Avatar, Typography, Input, Checkbox, Form, Row, Col, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const LoginForm = () => (
  <Row justify="center" align="middle" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)", padding: "20px" }}>
    <Col xs={24} sm={20} md={16} lg={14} xl={12} xxl={10}>
      <Card
        style={{
          borderRadius: 16,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          padding: "40px 20px",
          margin: "0 auto",
          minWidth: "400px",
          maxWidth: "600px",
          width: "100%",
        }}
        bodyStyle={{ padding: "20px" }}
      >
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Avatar size={80} icon={<LockOutlined />} style={{ background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)" }} />
          <Typography.Title level={2} style={{ marginTop: 24, marginBottom: 8, color: "#22223b", fontSize: "28px" }}>Sign in</Typography.Title>
          <Typography.Text type="secondary" style={{ fontSize: "16px" }}>Welcome back! Please login to your account.</Typography.Text>
        </div>
        <Form layout="vertical" style={{ marginTop: 24 }}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]} style={{ marginBottom: 24 }}> 
            <Input size="large" prefix={<UserOutlined />} placeholder="Email" autoComplete="email" style={{ height: "48px", fontSize: "16px" }} />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]} style={{ marginBottom: 24 }}> 
            <Input.Password size="large" prefix={<LockOutlined />} placeholder="Password" autoComplete="current-password" style={{ height: "48px", fontSize: "16px" }} />
          </Form.Item>
          <Form.Item style={{ marginBottom: 24 }}>
            <Checkbox style={{ fontSize: "16px" }}>Remember me</Checkbox>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" block size="large" style={{ borderRadius: 8, fontWeight: 600, letterSpacing: 1, height: "48px", fontSize: "16px" }}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Col>
  </Row>
);

export default LoginForm;
