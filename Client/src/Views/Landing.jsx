import React, { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import { Button, Typography, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./Landing.css";
const HeadingComponent = React.lazy(() =>
  import("../Components/HeadingComponent")
);
import desktopImage from "../../src/assets/landing.png";

const Landing = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 146px)",
        width: "100vw",
      }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <Suspense fallback={<CircularProgress />}>
          <HeadingComponent />
        </Suspense>

        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          style={{
            marginTop: "1rem",
            backgroundColor: "#D6D6D6",
            width: "auto",
            borderRadius: "25px",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "50%" }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                style={{ margin: "6px", opacity: 0.8, maxWidth: "500px" }}
              >
                Descubrí como el reciclaje mecánico puede ahorrar litros de agua
                y kilos de gases de efecto invernadero (CO2e). Calculá tu huella
                textil aquí:
              </Typography>
              <Button
                variant="contained"
                color="custom2"
                component={Link}
                to="/calculadora"
                style={{
                  marginTop: "20px",
                  fontSize: "19px",
                  color: "#fff",
                  backgroundColor: "#00947a",
                }}
              >
                Probá nuestra calculadora demo
              </Button>
            </div>
            <img
              src={desktopImage}
              alt="Caluladora textil"
              className="desktopImage"
            />
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default Landing;
