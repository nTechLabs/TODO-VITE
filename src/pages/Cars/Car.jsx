import React from "react";
import { useDispatch } from "react-redux";
import { carSliceActs } from "../../store/carSlice.js";
import { Card, Typography, Button } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const CarDetail = ({ id, model, price, img, quantity }) => {
  const dispatch = useDispatch();
  return (
    <Card
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
        padding: 8,
        maxWidth: 500,
        marginLeft: "auto",
        marginRight: "auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      bodyStyle={{ display: "flex", alignItems: "center", gap: 16, padding: 8 }}
      cover={
        <img
          src={img}
          alt={model}
          style={{
            width: 100,
            height: 60,
            objectFit: "cover",
            borderRadius: 8,
            marginRight: 16,
          }}
        />
      }
    >
      <Typography.Text style={{ minWidth: 90, fontWeight: "bold", fontSize: 16, margin: 0 }}>
        {model}
      </Typography.Text>
      <Typography.Text style={{ color: "rgba(0, 0, 0, 0.65)", margin: 0 }}>{`$${price}`}</Typography.Text>
      <Typography.Text style={{ color: "rgba(0, 0, 0, 0.65)", margin: 0 }}>{quantity}EA</Typography.Text>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: 16 }}>
        <Button
          onClick={() => dispatch(carSliceActs.increase({ id }))}
          type="primary"
          shape="circle"
          icon={<ArrowUpOutlined />}
          size="small"
          style={{ marginBottom: 8 }}
        />
        <Button
          onClick={() => dispatch(carSliceActs.decrease({ id }))}
          type="primary"
          shape="circle"
          icon={<ArrowDownOutlined />}
          size="small"
        />
      </div>
    </Card>
  );
};

export default CarDetail;
