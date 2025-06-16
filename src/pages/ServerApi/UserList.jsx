import React, { useEffect } from "react";
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

const fetchUsersApi = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, status, error } = useSelector((state) => state.users);
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

  if (isLoading || status === "loading") return <CircularProgress />;
  if (isError || status === "failed")
    return <Alert severity="error">{error || queryError?.message}</Alert>;

  return (
    <Box sx={{ position: "relative" }}>
      <List>
        {users.map((user) => (
          <ListItem
            key={user.id}
            divider
            button
            onClick={() => navigate(`/ServerApi/user/${user.id}`)}
          >
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 32, right: 32, zIndex: 1000 }}
        onClick={() => navigate("/ServerApi/user/new")}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default UserList;
