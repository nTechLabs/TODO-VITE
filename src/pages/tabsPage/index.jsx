import React, { useState, useCallback, useMemo } from "react";
import { Tabs } from "antd";
import PageOne from "./pageOne";
import PageTwo from "./pageTwo";
import PageThree from "./pageThree";

const tabComponents = [PageOne, PageTwo, PageThree];
const tabLabels = ["Page One", "Page Two", "Page Three"];

export default function TabsPage() {
  const [value, setValue] = useState(0);
  const handleChange = useCallback((key) => setValue(Number(key)), []);
  const CurrentPage = useMemo(() => tabComponents[value], [value]);

  return (
    <div style={{ width: "100%" }}>
      <Tabs
        activeKey={String(value)}
        onChange={handleChange}
        centered
        items={tabLabels.map((label, idx) => ({
          key: String(idx),
          label,
        }))}
      />
      <div style={{ marginTop: 24 }}>
        <CurrentPage />
      </div>
    </div>
  );
}
