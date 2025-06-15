import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ComboBox from "../../components/ComboBox";
import comboBoxOptions, { nationCbOptions } from "../../values/comboBoxOptions"; // Import the comboBoxOptions and nationCbOptions

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

      <Box sx={{ mt: 3 }}>
        <ComboBox options={comboBoxOptions} label="Combo box1" />
      </Box>
      <Box sx={{ mt: 2 }}>
        <ComboBox options={nationCbOptions} label="Nation" />
      </Box>
      {/* Pass the options as a prop */}
    </>
  );
};

export default SelectUtil;
