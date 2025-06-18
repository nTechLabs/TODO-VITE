import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const dummyAlarms = [
  { id: 1, message: "새로운 메시지가 도착했습니다." },
  { id: 2, message: "방문 신청이 승인되었습니다." },
  { id: 3, message: "비밀번호가 변경되었습니다." },
];

export default function Alarms() {
  return (
    <Box p={3}>
      <Typography variant="h6" mb={2}>
        알림 목록
      </Typography>
      <List>
        {dummyAlarms.map((alarm) => (
          <ListItem key={alarm.id}>
            <ListItemText primary={alarm.message} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
