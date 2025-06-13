import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function ComboBox({ options, label, sx, onChange }) {
  const handleChange = (event, value) => {
    if (
      value &&
      typeof value === "object" &&
      "key" in value &&
      "value" in value
    ) {
      console.log("Selected key:", value.key, "Selected value:", value.value);
    } else {
      console.log("Selected:", value);
    }
    if (onChange) onChange(event, value);
  };
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option.value || option}
      isOptionEqualToValue={(option, value) =>
        (option.key || option) === (value.key || value)
      }
      sx={{ width: 300, ...sx }}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

export default ComboBox;
