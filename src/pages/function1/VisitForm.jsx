import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const statusOptions = ["전체", "임시보관", "신청", "검토중", "반려", "승인"];

const VisitForm = () => {
  const [status, setStatus] = useState("");
  const [statusPopup, setStatusPopup] = useState(false);
  const [visitFrom, setVisitFrom] = useState(null);
  const [visitTo, setVisitTo] = useState(null);
  const [company, setCompany] = useState("");
  const [applyFrom, setApplyFrom] = useState(null);
  const [applyTo, setApplyTo] = useState(null);
  const [visitor, setVisitor] = useState("");
  const [target, setTarget] = useState("");
  const [sanctioned, setSanctioned] = useState("");

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 4,
          p: 3,
          border: "1px solid #eee",
          borderRadius: 2,
        }}
      >
        <Stack spacing={3}>
          {/* 처리상태 선택 콤보박스 */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="status-label">처리상태</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              value={status}
              label="처리상태"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="전체">전체</MenuItem>
              <MenuItem value="임시보관">임시보관</MenuItem>
              <MenuItem value="신청">신청</MenuItem>
              <MenuItem value="검토중">검토중</MenuItem>
              <MenuItem value="반려">반려</MenuItem>
              <MenuItem value="승인">승인</MenuItem>
            </Select>
          </FormControl>

          <Dialog open={statusPopup} onClose={() => setStatusPopup(false)}>
            <DialogTitle>처리상태 선택</DialogTitle>
            <DialogContent>
              <Stack spacing={1}>
                {statusOptions.map((option) => (
                  <MenuItem
                    key={option}
                    onClick={() => {
                      setStatus(option);
                      setStatusPopup(false);
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setStatusPopup(false)}>닫기</Button>
            </DialogActions>
          </Dialog>

          <Stack direction="row" spacing={2} alignItems="center">
            <DatePicker
              label="방문기간"
              value={visitFrom}
              onChange={setVisitFrom}
              sx={{ flex: 1 }}
            />
            ~
            <DatePicker
              label="To"
              value={visitTo}
              onChange={setVisitTo}
              sx={{ flex: 1 }}
            />
          </Stack>

          <TextField
            label="방문업체명"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            fullWidth
          />

          <Stack direction="row" spacing={2} alignItems="center">
            <DatePicker
              label="신청기간"
              value={applyFrom}
              onChange={setApplyFrom}
              sx={{ flex: 1 }}
            />
            ~
            <DatePicker
              label="To"
              value={applyTo}
              onChange={setApplyTo}
              sx={{ flex: 1 }}
            />
          </Stack>

          <TextField
            label="방문객명"
            value={visitor}
            onChange={(e) => setVisitor(e.target.value)}
            fullWidth
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="sanctioned-label">제재대상</InputLabel>
            <Select
              labelId="sanctioned-label"
              id="sanctioned"
              value={sanctioned}
              label="제재대상"
              onChange={(e) => setSanctioned(e.target.value)}
            >
              <MenuItem value="전체">전체</MenuItem>
              <MenuItem value="대상">대상</MenuItem>
              <MenuItem value="비대상">비대상</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};

export default VisitForm;
