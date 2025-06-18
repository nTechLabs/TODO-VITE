import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";

function Launchpad() {
  const navigate = useNavigate();

  const icons = [
    { name: "Vite", path: "/Vite" },
    { name: "Counter", path: "/Counter" },
    { name: "FormGuide", path: "/formGuide" },
    { name: "Function1", path: "/main?component=function1" },
    { name: "Cars", path: "/main?component=cars" },
    { name: "TabsPage", path: "/main?component=tabsPage" },
    { name: "UtilsPage", path: "/main?component=utilsPage" },
    { name: "Calculator", path: "/main?component=calculator" },
    { name: "Contact", path: "/Contact" },
    { name: "ServerApi", path: "/ServerApi" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4,
          minWidth: 340,
          maxWidth: 480,
          width: "100%",
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={3} align="center">
          Launchpad
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {icons.map((icon) => (
            <Grid
              item
              xs={6}
              key={icon.name}
              display="flex"
              justifyContent="center"
            >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  height: 56,
                  fontWeight: 600,
                  fontSize: 16,
                  borderRadius: 2,
                  textTransform: "none",
                  boxShadow: 2,
                }}
                onClick={() => navigate(icon.path)}
              >
                {icon.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}

export default Launchpad;
