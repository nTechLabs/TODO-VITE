import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { addUser, udtUser } from "../../store/userSlice";
import { USERS_API_URL } from "./api";
import "./userList.css";

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

  if (!user && !isNew) {
    return <Typography variant="h6">User not found</Typography>;
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
    <Paper className="userDetailPaper">
      <Typography variant="h5" gutterBottom>
        {isNew ? "Add New User" : "User Detail"}
      </Typography>
      <Box component="form" className="userDetailForm">
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          error={!!phoneError}
          helperText={phoneError}
        />
        <TextField
          label="Website"
          name="website"
          value={form.website}
          onChange={handleChange}
        />
        <TextField
          label="Company"
          name="company"
          value={form.company}
          onChange={handleChange}
        />
        <TextField
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
        <Stack direction="row" className="userDetailButtonRow">
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            취소
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={
              !isChanged ||
              loading ||
              !!emailError ||
              !form.email ||
              !!phoneError ||
              !form.phone
            }
          >
            저장
          </Button>
        </Stack>
        {saveStatus === "success" && (
          <Alert severity="success">저장되었습니다.</Alert>
        )}
        {saveStatus === "error" && (
          <Alert severity="error">{errorMsg || "저장에 실패했습니다."}</Alert>
        )}
      </Box>
    </Paper>
  );
};

export default UserDetail;
