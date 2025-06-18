import React from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, IconButton } from "@mui/material";

function Top() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <IconButton aria-label="home" onClick={() => navigate("/launchpad")}>
        <HomeIcon sx={{ fontSize: 32 }} />
      </IconButton>
      {/* 가운데에 로고나 타이틀이 있다면 여기에 추가 */}
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton aria-label="search">
          <SearchIcon sx={{ fontSize: 28 }} />
        </IconButton>
        <IconButton aria-label="notifications" onClick={() => navigate("/alarms")}>
          <NotificationsIcon sx={{ fontSize: 26 }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Top;
