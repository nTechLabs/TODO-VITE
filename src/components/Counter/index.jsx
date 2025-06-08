import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { counterSliceActions } from "../../store/counterSlice";

function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(counterSliceActions.up(2))}>+</button>{" "}
      {count}
    </div>
  );
}

export default Counter;
