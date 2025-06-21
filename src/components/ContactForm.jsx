import React from "react";
import { DatePicker, Form, Input, Button } from "antd";

const ContactForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit && onSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="이름"
        name="name"
        rules={[{ required: true, message: "이름을 입력하세요." }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="이메일"
        name="email"
        rules={[{ required: true, message: "이메일을 입력하세요." }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="날짜"
        name="date"
        rules={[{ required: true, message: "날짜를 선택하세요." }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          제출
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
