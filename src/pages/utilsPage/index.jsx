import React, { useState, useCallback, useMemo } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AlertsUtil from "./AlertsUtil";
import PopupUtil from "./PopupUtil";
import EtcUtil from "./EtcUtil";
import SelectUtil from "./SelectUtil";

const tabComponents = [AlertsUtil, PopupUtil, SelectUtil, EtcUtil];
const tabLabels = ["Alerts", "Popups", "Select", "Etc"];

function LinkTab(props) {
  return <Tab component="a" onClick={(e) => e.preventDefault()} {...props} />;
}

function UtilsPage() {
  const [value, setValue] = useState(0);
  const handleChange = useCallback((_, newValue) => setValue(newValue), []);
  const CurrentPage = useMemo(() => tabComponents[value], [value]);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="utility tabs"
        role="navigation"
        centered
      >
        {tabLabels.map((label) => (
          <LinkTab key={label} label={label} href="#" />
        ))}
      </Tabs>
      <Box sx={{ mt: 3 }}>
        <CurrentPage />
      </Box>
    </Box>
  );
}

export default UtilsPage;
