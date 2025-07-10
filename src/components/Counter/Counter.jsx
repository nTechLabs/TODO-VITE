import React from "react";
import { Button, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { counterSliceActs } from "../../store/counterSlice";
import "./Counter.css";

function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div className="counter-simple-container">
      <Space align="center">
        <Button
          type="primary"
          onClick={() => dispatch(counterSliceActs.down(1))}
        >
          -
        </Button>
        <span className="counter-simple-display">{count}</span>
        <Button
          type="primary"
          onClick={() => dispatch(counterSliceActs.up(1))}
        >
          +
        </Button>
      </Space>
    </div>
  );
}

export default Counter;