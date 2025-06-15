import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { carSliceActs } from "../../store/carSlice";
import CarList from "./CarList";

function Cars() {
  const dispatch = useDispatch();
  const cars = useSelector((store) => store.cars);

  useEffect(() => {
    dispatch(carSliceActs.calculateTotals());
  }, [dispatch, cars.carData]);

  const { totalQuantity, totalValue } = cars;
  return (
    <>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
          justifyContent: "flex-end",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/743/743007.png"
            alt="차량수량"
            style={{ width: 36, height: 36 }}
          />
          <span style={{ fontSize: "70%" }}>{totalQuantity}대</span>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="차량금액"
            style={{ width: 36, height: 36 }}
          />
          <span style={{ fontSize: "70%" }}>
            ${totalValue.toLocaleString()}
          </span>
        </span>
      </h1>
      <CarList />
    </>
  );
}

export default Cars;
