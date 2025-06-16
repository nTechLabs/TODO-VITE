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

  if (!user && !isNew) {
    return <Typography variant="h6">User not found</Typography>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaveStatus(null);
    setErrorMsg("");
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
        res = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          form
        );
        if (res.status === 201) {
          dispatch(addUser({ ...form, id: res.data.id || Date.now() }));
        } else {
          setSaveStatus("error");
          setErrorMsg("저장에 실패했습니다. (status: " + res.status + ")");
          setLoading(false);
          return;
        }
      } else {
        res = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          form
        );
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
    <Paper sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {isNew ? "Add New User" : "User Detail"}
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
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
        />
        <TextField
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
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
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 3, justifyContent: "flex-end" }}
        >
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
            disabled={!isChanged || loading}
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
