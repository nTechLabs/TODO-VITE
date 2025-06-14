import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { counterSliceActs } from "../../store/counterSlice";
import { Button, Box } from "@mui/material";

function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(counterSliceActs.down(1))}
      >
        -
      </Button>
      <span style={{ minWidth: 32, textAlign: "center" }}>{count}</span>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(counterSliceActs.up(1))}
      >
        +
      </Button>
    </Box>
  );
}

export default Counter;
