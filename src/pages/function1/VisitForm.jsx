import React, { useState } from "react";
import { Modal, Button, Input, Form, DatePicker, Select, Space } from "antd";

const VisitForm = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSubmit && onSubmit(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      open={visible}
      title="방문 등록"
      onCancel={onCancel}
      onOk={handleOk}
      okText="저장"
      cancelText="취소"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="이름"
          name="name"
          rules={[{ required: true, message: "이름을 입력하세요." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="방문일"
          name="date"
          rules={[{ required: true, message: "방문일을 선택하세요." }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="방문 목적"
          name="purpose"
          rules={[{ required: true, message: "방문 목적을 입력하세요." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="상태"
          name="status"
          rules={[{ required: true, message: "상태를 선택하세요." }]}
        >
          <Select
            options={[
              { value: "예약", label: "예약" },
              { value: "방문", label: "방문" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default VisitForm;
