import React, { useState } from "react";
import { Select } from "antd";
import ComboBox from "../../components/ComboBox";
import comboBoxOptions, { nationCbOptions } from "../../values/comboBoxOptions";

const SelectUtil = () => {
  const [status, setStatus] = useState("");
  const handleChange = (value) => {
    setStatus(value);
  };
  return (
    <>
      <Select
        style={{ width: "100%" }}
        placeholder="Status"
        value={status}
        onChange={handleChange}
        options={[
          { value: 10, label: "ToDo" },
          { value: 20, label: "InProgress" },
          { value: 30, label: "Completed" },
        ]}
      />
      <div style={{ marginTop: 24 }}>
        <ComboBox options={comboBoxOptions} label="Combo box1" />
      </div>
      <div style={{ marginTop: 16 }}>
        <ComboBox options={nationCbOptions} label="Nation" />
      </div>
    </>
  );
};

export default SelectUtil;
