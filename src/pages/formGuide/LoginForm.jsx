import React from "react";
import { Button, Avatar, Typography, Input, Checkbox, Form, Row, Col, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const LoginForm = () => (
  <Row justify="center" align="middle" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)" }}>
    <Col xs={22} sm={16} md={10} lg={8} xl={6}>
      <Card
        style={{
          borderRadius: 16,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          padding: 32,
          margin: "0 auto",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Avatar size={72} icon={<LockOutlined />} style={{ background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)" }} />
          <Typography.Title level={2} style={{ marginTop: 20, marginBottom: 0, color: "#22223b" }}>Sign in</Typography.Title>
          <Typography.Text type="secondary">Welcome back! Please login to your account.</Typography.Text>
        </div>
        <Form layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}> 
            <Input size="large" prefix={<UserOutlined />} placeholder="Email" autoComplete="email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}> 
            <Input.Password size="large" prefix={<LockOutlined />} placeholder="Password" autoComplete="current-password" />
          </Form.Item>
          <Form.Item style={{ marginBottom: 8 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" block size="large" style={{ borderRadius: 8, fontWeight: 600, letterSpacing: 1 }}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Col>
  </Row>
);

export default LoginForm;
