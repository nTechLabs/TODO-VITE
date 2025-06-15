import React from "react";
import { useSelector } from "react-redux";
import Car from "./Car";

const CarList = () => {
  const { carData /* totalValue */ } = useSelector((store) => store.cars);
  return (
    <>
      {/* <div>Cars {totalValue}</div> */}
      {carData &&
        carData.map((car) => {
          return <Car key={car.id} {...car} />;
        })}
    </>
  );
};

export default CarList;
