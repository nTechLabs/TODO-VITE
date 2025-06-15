import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { carSliceActs } from "../../store/carSlice";

function Function3() {
  const dispatch = useDispatch();
  const cars = useSelector((store) => store.cars);

  useEffect(() => {
    dispatch(carSliceActs.calculateTotals());
  }, [dispatch, cars.carData]);

  const { totalQuantity, totalValue } = cars;
  return (
    <>
      <h1>
        Redux Toolkit total : {totalQuantity}EA, ${totalValue}
      </h1>
    </>
  );
}

export default Function3;
