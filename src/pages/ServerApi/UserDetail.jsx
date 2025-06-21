import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, Alert, Space, Card, message } from "antd";
import axios from "axios";
import { addUser, udtUser } from "../../store/userSlice";
import { USERS_API_URL } from "./api";
import "./user-list.css";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNew = id === "new";
  const user = useSelector((state) =>
    state.users.users.find((u) => String(u.id) === String(id))
  );

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
        address: user?.address
          ? `${user.address.city}, ${user.address.street}, ${user.address.suite}`
          : "",
      };

  const [form, setForm] = useState(initialForm);
  const [saveStatus, setSaveStatus] = useState(null); // null | 'success' | 'error'
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  if (!user && !isNew) {
    return <Typography.Title level={5}>User not found</Typography.Title>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setSaveStatus(null);
    setErrorMsg("");
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
        !/^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
          value
        )
      ) {
        setPhoneError("유효한 전화번호를 입력하세요.");
      } else {
        setPhoneError("");
      }
    }
  };

  const handleCancel = () => {
    if (!isChanged) {
      navigate("/ServerApi");
      return;
    }
    setForm(initialForm);
    setSaveStatus(null);
    setErrorMsg("");
  };

  const isChanged = Object.keys(form).some(
    (key) => form[key] !== initialForm[key]
  );

  const handleSave = async () => {
    setLoading(true);
    setSaveStatus(null);
    setErrorMsg("");
    try {
      let res;
      if (isNew) {
        res = await axios.post(USERS_API_URL, form);
        if (res.status === 201) {
          dispatch(addUser({ ...form, id: res.data.id || Date.now() }));
        } else {
          setSaveStatus("error");
          setErrorMsg("저장에 실패했습니다. (status: " + res.status + ")");
          setLoading(false);
          return;
        }
      } else {
        res = await axios.put(`${USERS_API_URL}/${id}`, form);
        if (res.status === 200) {
          dispatch(udtUser({ ...form, id: user.id }));
        } else {
          setSaveStatus("error");
          setErrorMsg("수정에 실패했습니다. (status: " + res.status + ")");
          setLoading(false);
          return;
        }
      }
      setSaveStatus("success");
      messageApi.success("저장되었습니다.");
      navigate("/ServerApi");
    } catch (e) {
      setSaveStatus("error");
      setErrorMsg(
        e?.message || (isNew ? "저장에 실패했습니다." : "수정에 실패했습니다.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="userDetailPaper" style={{ maxWidth: 480, margin: "32px auto" }}>
      {contextHolder}
      <Typography.Title level={4} style={{ marginBottom: 24 }}>
        {isNew ? "Add New User" : "User Detail"}
      </Typography.Title>
      <Form layout="vertical" className="userDetailForm">
        <Form.Item label="Name">
          <Input name="name" value={form.name} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Username">
          <Input name="username" value={form.username} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Email" required validateStatus={emailError ? "error" : ""} help={emailError}>
          <Input name="email" value={form.email} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Phone" required validateStatus={phoneError ? "error" : ""} help={phoneError}>
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
        <Space direction="horizontal" className="userDetailButtonRow">
          <Button
            onClick={handleCancel}
            disabled={loading}
            style={{ marginRight: 8 }}
          >
            취소
          </Button>
          <Button
            type="primary"
            onClick={handleSave}
            loading={loading}
            disabled={
              !isChanged ||
              !!emailError ||
              !form.email ||
              !!phoneError ||
              !form.phone
            }
          >
            저장
          </Button>
        </Space>
        {saveStatus === "success" && (
          <Alert message="저장되었습니다." type="success" showIcon style={{ marginTop: 16 }} />
        )}
        {saveStatus === "error" && (
          <Alert message={errorMsg || "저장에 실패했습니다."} type="error" showIcon style={{ marginTop: 16 }} />
        )}
      </Form>
    </Card>
  );
};

export default UserDetail;
