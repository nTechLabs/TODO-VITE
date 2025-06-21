import React from "react";
import { Button, Avatar, Typography, Input, Checkbox, Form, Row, Col } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const LoginForm = () => (
  <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
    <Col span={8}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Avatar size={64} icon={<LockOutlined />} style={{ backgroundColor: "#1890ff" }} />
        <Typography.Title level={3} style={{ marginTop: 16 }}>Sign in</Typography.Title>
      </div>
      <Form layout="vertical">
        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}> 
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}> 
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>Sign In</Button>
        </Form.Item>
      </Form>
    </Col>
  </Row>
);

export default LoginForm;
