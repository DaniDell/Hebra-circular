import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

const root = document.getElementById("root");

const customTheme = createTheme({
  ...theme,
  typography: {
    fontFamily: "'Nunito','', 'Open Sans', Roboto, Helvetica, Arial",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          "&:hover": {
            backgroundColor: "#45C4A2",
          },
          "&.MuiButton-contained.Mui-active": {
            backgroundColor: "#009d71",
          },
          "&.MuiButton-outlined": {
            color: "#333", // Color de texto casi negro
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 769,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
);
