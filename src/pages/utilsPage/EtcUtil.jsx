import React from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const EtcUtil = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 480,
        mx: "auto",
        mt: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Badge badgeContent={7} color="primary">
          <MailIcon color="action" fontSize="large" />
        </Badge>
        <Badge badgeContent={77} color="secondary">
          <NotificationsIcon color="action" fontSize="large" />
        </Badge>
        <Badge badgeContent={777} color="success">
          <MessageIcon color="action" fontSize="large" />
        </Badge>
      </Stack>
    </Box>
  );
};

export default EtcUtil;
