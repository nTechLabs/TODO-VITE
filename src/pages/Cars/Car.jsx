import React from "react";
import { useDispatch } from "react-redux";
import { carSliceActs } from "../../store/carSlice.js";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const CarDetail = ({ id, model, price, img, quantity }) => {
  const dispatch = useDispatch();
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 2,
        p: 1,
        maxWidth: 500,
        mx: "auto",
        boxShadow: 3,
      }}
    >
      <CardMedia
        component="img"
        image={img}
        alt={model}
        sx={{
          width: 100,
          height: 60,
          objectFit: "cover",
          borderRadius: 2,
          mr: 2,
        }}
      />
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, p: 1 }}>
        <Typography variant="h6" sx={{ minWidth: 90 }}>
          {model}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ${price}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {quantity}EA
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" ml={2}>
          <IconButton
            onClick={() => dispatch(carSliceActs.increase({ id }))}
            color="primary"
            size="small"
          >
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton
            onClick={() => dispatch(carSliceActs.decrease({ id }))}
            color="primary"
            size="small"
          >
            <ArrowDownwardIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CarDetail;
