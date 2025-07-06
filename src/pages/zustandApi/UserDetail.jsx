import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, Alert, Space, Card, message } from "antd";
import useUserZStore from "./userZstore";
import "./user-list.css";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const store = useUserZStore();
  const user = !isNew ? store.getUserById(id) : null;

  const initialForm = isNew
    ? {
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
        company: "",
        address: "",
      }
    : {
        name: user?.name || "",
        username: user?.username || "",
        email: user?.email || "",
        phone: user?.phone || "",
        website: user?.website || "",
        company: user?.company?.name || "",
        address: user?.address || "",
      };

  const [form, setForm] = useState(initialForm);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setForm(initialForm);
  }, [id]);

  if (!user && !isNew) {
    return <Typography.Title level={5}>User not found</Typography.Title>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "email") {
      if (!value) {
        setEmailError("Email은 필수입니다.");
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        setEmailError("유효한 이메일 주소를 입력하세요.");
      } else {
        setEmailError("");
      }
    }
    if (name === "phone") {
      if (!value) {
        setPhoneError("Phone은 필수입니다.");
      } else if (
        !/^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(value)
      ) {
        setPhoneError("유효한 전화번호를 입력하세요.");
      } else {
        setPhoneError("");
      }
    }
  };

  const isChanged = Object.keys(form).some(
    (key) => form[key] !== initialForm[key]
  );

  const handleCancel = () => {
    if (!isChanged) {
      navigate("/zustandApi");
      return;
    }
    setForm(initialForm);
  };

  const handleSave = async () => {
    if (emailError || phoneError) return;
    if (isNew) {
      await store.addUser(form);
    } else {
      await store.updateUser({ ...form, id });
    }
    if (store.saveStatus === "success") {
      messageApi.success("저장되었습니다.");
      navigate("/zustandApi");
    } else if (store.saveStatus === "error") {
      messageApi.error(store.errorMsg);
    }
  };

  return (
    <Card className="userDetailPaper">
      {contextHolder}
      <Typography.Title level={4} className="userDetailTitle">
        {isNew ? "Add User" : "Edit User"}
      </Typography.Title>
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input name="name" value={form.name} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Username">
          <Input name="username" value={form.username} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Email" validateStatus={emailError ? "error" : ""} help={emailError}>
          <Input name="email" value={form.email} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Phone" validateStatus={phoneError ? "error" : ""} help={phoneError}>
          <Input name="phone" value={form.phone} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Website">
          <Input name="website" value={form.website} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Company">
          <Input name="company" value={form.company} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Address">
          <Input name="address" value={form.address} onChange={handleChange} />
        </Form.Item>
        <Space style={{ marginTop: 24 }}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" onClick={handleSave} loading={store.loading} disabled={!!emailError || !!phoneError}>
            Save
          </Button>
        </Space>
        {store.saveStatus === "error" && (
          <Alert type="error" message={store.errorMsg} showIcon style={{ marginTop: 16 }} />
        )}
      </Form>
    </Card>
  );
};

export default UserDetail;
