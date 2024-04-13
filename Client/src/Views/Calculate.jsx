import React, { Suspense, useState, useEffect } from "react";
import { CircularProgress, Fab, Tooltip } from "@mui/material";
import DemoCalculator from "../Components/DemoCalculator";
import AlertDialog from "../Components/AlertDialog";
import { styled } from "@mui/system";

const StyledFab = styled(Fab)({
  fontSize: "25px",
  float: 'left', // Añade esta línea
  "&:hover": {
    backgroundColor: "#f2f2f2",
  },
});

const Calculate = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchmove", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, []);

  const bottomValue = scrollPosition > 100 || window.innerWidth <= 1100 ? "10rem" : "20vh";
  const rightValue = scrollPosition > 100 || window.innerWidth <= 1100 ? "1.5rem" : "15vw";
 
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        minHeight: "calc(100vh - 3rem - 4rem)",
        paddingTop: "1vh",
        paddingBottom: "1vh",
      }}
    >
      <Suspense fallback={<CircularProgress />}>
        <DemoCalculator />
      </Suspense>
      <div
        style={{
          position: "fixed",
          bottom: bottomValue,
          right: rightValue,
          transition: "bottom 3.3s ease-out",
        }}
      >
<Tooltip title="Ver información adicional" placement="top">
    <StyledFab color="" onClick={handleOpenDialog} style={{ fontSize: '30px', height: '48px', width: '48px', float: 'left' }}>
        ♻️
    </StyledFab>
</Tooltip>
        
        <AlertDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          title="Gestión y Reciclaje en Argentina:"
          content={
            <>
              Hebra Circular puede reciclar todo tipo de fibras mediante el
              reciclaje mecánico, generando paños reconstituidos para variados
              usos. Gestionando el remanente textil desde la mesa de corte.
              <br />
              <br />
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSc7uAJWs8KeIIxCZ-CLyKvJ-rNxPp67bLku3n_NLhwZbMLsGQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                Si deseas más información, por favor completa el formulario.
              </a>
            </>
          }
          confirmText="Cerrar"
          onConfirm={handleCloseDialog}
        />
      </div>
    </div>
  );
};

export default Calculate;
