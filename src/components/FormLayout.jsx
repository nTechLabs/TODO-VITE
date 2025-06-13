import React from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Navigation from "./Navigation";
import ContactForm from "./ContactForm";
import theme from "../styles/theme";

const FormLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <ContactForm />
      </Box>
    </ThemeProvider>
  );
};

export default FormLayout;
