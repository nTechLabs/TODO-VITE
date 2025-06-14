import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { counterSliceActions } from "../../store/counterSlice";
import { Button, Box } from "@mui/material";

function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(counterSliceActions.down(1))}
      >
        -
      </Button>
      <span style={{ minWidth: 32, textAlign: "center" }}>{count}</span>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(counterSliceActions.up(1))}
      >
        +
      </Button>
    </Box>
  );
}

export default Counter;
