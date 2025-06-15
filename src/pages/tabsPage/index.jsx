import React, { useState, useCallback, useMemo } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PageOne from "./pageOne";
import PageTwo from "./pageTwo";
import PageThree from "./pageThree";

const tabComponents = [PageOne, PageTwo, PageThree];
const tabLabels = ["Page One", "Page Two", "Page Three"];

function LinkTab(props) {
  return <Tab component="a" onClick={(e) => e.preventDefault()} {...props} />;
}

export default function TabsPage() {
  const [value, setValue] = useState(0);
  const handleChange = useCallback((_, newValue) => setValue(newValue), []);
  const CurrentPage = useMemo(() => tabComponents[value], [value]);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
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
