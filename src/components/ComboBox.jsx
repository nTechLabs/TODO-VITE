import React from "react";
import { AutoComplete, Input } from "antd";

const ComboBox = ({ options, label, ...props }) => (
  <AutoComplete
    options={options.map((o) => ({ value: o.label || o.value || o }))}
    style={{ width: "100%" }}
    placeholder={label}
    filterOption={(inputValue, option) =>
      option.value.toLowerCase().includes(inputValue.toLowerCase())
    }
    {...props}
  >
    <Input />
  </AutoComplete>
);

export default ComboBox;
