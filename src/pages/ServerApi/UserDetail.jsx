import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const UserDetail = () => {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.users.users.find((u) => String(u.id) === String(id))
  );

  const [form, setForm] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    website: user?.website || "",
    company: user?.company?.name || "",
    address: user?.address
      ? `${user.address.city}, ${user.address.street}, ${user.address.suite}`
      : "",
  });

  if (!user) {
    return <Typography variant="h6">User not found</Typography>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        User Detail
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
      </Box>
    </Paper>
  );
};

export default UserDetail;
