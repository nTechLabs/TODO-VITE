import React from "react";
import "./form-guide.css";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../../store/loginSlice";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Checkbox, FormControlLabel } from "@mui/material";
import Link from "@mui/material/Link";

function LoginForm() {
  const dispatch = useDispatch();
  const { email, password, rememberMe, error } = useSelector(
    (state) => state.login
  );

  const handleEmailChange = (e) => {
    dispatch(loginActions.setEmail(e.target.value));
  };
  const handlePasswordChange = (e) => {
    dispatch(loginActions.setPassword(e.target.value));
  };
  const handleRememberMeChange = (e) => {
    dispatch(loginActions.setRememberMe(e.target.checked));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!email) {
      dispatch({ type: "login/setError", payload: "이메일을 입력하세요" });
      valid = false;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      dispatch({
        type: "login/setError",
        payload: "유효한 이메일을 입력하세요",
      });
      valid = false;
    }
    if (!password) {
      dispatch({ type: "login/setError", payload: "비밀번호를 입력하세요" });
      valid = false;
    } else if (password.length < 6) {
      dispatch({ type: "login/setError", payload: "6자 이상 입력하세요" });
      valid = false;
    }
    if (valid) {
      alert("제출 완료");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          minWidth: 350,
        }}
      >
        <Grid container direction="column" alignItems="center" sx={{ mb: 2 }}>
          <Avatar sx={{ m: 1, bgcolor: "#9c27b0" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Grid>
        <TextField
          label="이메일"
          variant="outlined"
          type="email"
          value={email}
          onChange={handleEmailChange}
          margin="normal"
          fullWidth
          autoComplete="email"
          autoFocus
          required
        />
        <TextField
          label="비밀번호"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          margin="normal"
          fullWidth
          required
        />
        <FormControlLabel
          control={
            <Checkbox checked={rememberMe} onChange={handleRememberMeChange} />
          }
          label="Remember Me"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, width: "100%" }}
        >
          Sign in
        </Button>
        <Grid container justifyContent="space-between">
          <Grid item sx={{ mt: 1 }} xs>
            <Link>Forget password?</Link>
          </Grid>
          <Grid item sx={{ mt: 1 }} xs>
            <Link>Sing up</Link>
          </Grid>
        </Grid>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </Box>
    </Box>
  );
}

export default LoginForm;
