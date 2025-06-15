import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SelectUtil = () => {
  const [status, setStatus] = useState("");
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="select-status">Status</InputLabel>
        <Select
          labelId="select-status"
          id="select-status"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={10}>ToDo</MenuItem>
          <MenuItem value={20}>InProgress</MenuItem>
          <MenuItem value={30}>Completed</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default SelectUtil;
