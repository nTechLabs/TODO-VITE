import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/userSlice";
import { useQuery } from "@tanstack/react-query";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";

const fetchUsersApi = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, status, error } = useSelector((state) => state.users);
  const [checked, setChecked] = useState([]);
  const [deleteError, setDeleteError] = useState("");
  const {
    data,
    isLoading,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsersApi,
    onSuccess: (data) => {
      dispatch(fetchUsers.fulfilled(data));
    },
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const handleToggle = (id) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    setDeleteError("");
    try {
      await Promise.all(
        checked.map(async (id) => {
          await axios.delete(
            `https://jsonplaceholder.typicode.com/users/${id}`
          );
        })
      );
      // Remove from store (since API is fake, just filter locally)
      dispatch(
        fetchUsers.fulfilled(users.filter((u) => !checked.includes(u.id)))
      );
      setChecked([]);
    } catch (e) {
      setDeleteError(e?.message || "삭제에 실패했습니다.");
    }
  };

  if (isLoading || status === "loading") return <CircularProgress />;
  if (isError || status === "failed")
    return <Alert severity="error">{error || queryError?.message}</Alert>;

  return (
    <Box sx={{ position: "relative", pb: 10 }}>
      <List>
        {users.map((user) => (
          <ListItem
            key={user.id}
            divider
            button
            onClick={(e) => {
              // Prevent navigation when clicking checkbox
              if (e.target.type !== "checkbox")
                navigate(`/ServerApi/user/${user.id}`);
            }}
          >
            <Checkbox
              checked={checked.includes(user.id)}
              onChange={() => handleToggle(user.id)}
              onClick={(e) => e.stopPropagation()}
            />
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 90, right: 32, zIndex: 1000 }}
        onClick={() => navigate("/ServerApi/user/new")}
      >
        <AddIcon />
      </Fab>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          position: "fixed",
          bottom: 24,
          left: 0,
          width: "100%",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          color="error"
          disabled={checked.length === 0}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Stack>
      {deleteError && (
        <Alert
          severity="error"
          sx={{
            position: "fixed",
            bottom: 70,
            left: 0,
            width: "100%",
            zIndex: 1200,
          }}
        >
          {deleteError}
        </Alert>
      )}
    </Box>
  );
};

export default UserList;
