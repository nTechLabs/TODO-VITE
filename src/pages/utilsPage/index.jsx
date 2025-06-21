import React, { useState, useCallback, useMemo } from "react";
import { Tabs } from "antd";
import AlertsUtil from "./AlertsUtil";
import PopupUtil from "./PopupUtil";
import EtcUtil from "./EtcUtil";
import SelectUtil from "./SelectUtil";

const tabComponents = [AlertsUtil, PopupUtil, SelectUtil, EtcUtil];
const tabLabels = ["Alerts", "Popups", "Select", "Etc"];

function UtilsPage() {
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

export default UtilsPage;
