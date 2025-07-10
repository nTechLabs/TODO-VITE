function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <Space align="center">
      <Button
        type="primary"
        onClick={() => dispatch(counterSliceActs.down(1))}
      >
        -
      </Button>
      <span style={{ minWidth: 32, textAlign: "center" }}>{count}</span>
      <Button
        type="primary"
        onClick={() => dispatch(counterSliceActs.up(1))}
      >
        +
      </Button>
    </Space>
  );
}

export default Counter;