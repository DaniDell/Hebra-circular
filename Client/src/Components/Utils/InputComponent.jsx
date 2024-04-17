import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from "@mui/material";

const InputComponent = ({
  onInputChange,
  onTextileCompositionChange,
  onCalculateClick,
}) => {
  const [composition, setComposition] = useState("");
  const [kilos, setKilos] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [compositionError, setCompositionError] = useState("");
  const [open, setOpen] = useState(false);
  const [newKilosError, setNewKilosError] = useState("");

  useEffect(() => {
    setIsValid(composition !== "" && kilos !== "" && kilos >= 0.001);
  }, [composition, kilos]);

  const handleKilosChange = (e) => {
    const value = e.target.value;
    if (value === "" || isNaN(value) || value < 0 || value.includes("e")) {
      setError(
        "El valor debe ser un número mayor o igual a 0 y no puede contener la letras."
      );
    } else {
      setKilos(Number(value));
      onInputChange(Number(value));
      setError("");
    }
  };

  const handleCompositionChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setCompositionError("Debe seleccionar una composición textil.");
    } else {
      setComposition(value);
      onTextileCompositionChange(value);
      setCompositionError("");
    }
  };

  const handleCalculateClick = () => {
    let isValid = true;
    let newCompositionError = "";
    let newKilosError = "";

    if (!composition) {
      isValid = false;
      newCompositionError = "Seleccione una composición.";
    }

    if (!kilos) {
      isValid = false;
      newKilosError = "Introduzca los kilos.";
    }

    setCompositionError(newCompositionError);
    setNewKilosError(newKilosError);

    if (!isValid) {
      setOpen(true);
    } else {
      onCalculateClick();
      setTimeout(() => {
        document.body.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 0);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h3>Proyectá la huella de tus remanentes:</h3>
      <Box mb={1.5}>
        
        <FormControl fullWidth error={!!compositionError}>
          <InputLabel id="textile-composition-label">
          Composición base fibra textil{" "}
          </InputLabel>
          <Select
            labelId="textile-composition-label"
            label="Composición base fibra textil"
            value={composition}
            onChange={handleCompositionChange}
            sx={{  textAlign: "left" }}
          >
            <MenuItem
              value="algodon Reciclado"
              style={{ whiteSpace: "normal" }}
            >
               Algodón
            </MenuItem>
            <MenuItem
              value="poliester Reciclado"
              style={{ whiteSpace: "normal" }}
            >
              Poliéster 
            </MenuItem>
            <MenuItem
              value="Mezcla sin definición Reciclado"
              style={{ whiteSpace: "normal" }}
            >
              Mezcla de fibras 
            </MenuItem>
            {/* <MenuItem
              value="algodon Reutilizado"
              style={{ whiteSpace: "normal" }}
            >
              🔄 Recirculado Tela de algodón
            </MenuItem>
            <MenuItem
              value="poliester Reutilizado"
              style={{ whiteSpace: "normal" }}
            >
              🔄 Recirculado Tela de Poliéster
            </MenuItem>
            <MenuItem
              value="Mezcla sin definición Reutilizado"
              style={{ whiteSpace: "normal" }}
            >
              🔄 Recirculado Tela mezcla de fibras
            </MenuItem> */}
          </Select>
          <FormHelperText>{compositionError}</FormHelperText>
        </FormControl>
      </Box>
      <Grid container spacing={2} alignItems="start">
      <Grid item xs={8} sm={7}>
          <TextField
            type="number"
            onChange={(event) => {
              if (event.target.value.length > 7) {
                event.target.value = event.target.value.slice(0, 7);
              }
              handleKilosChange(event);
            }}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            label="kilos gestionados"
            fullWidth
            size="small"
            error={!!newKilosError}
            helperText={newKilosError}
          />
        </Grid>

        <Grid item xs={4} sm={5}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleCalculateClick}
            sx={{
              boxShadow:
                "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)", // Agrega sombra
            }}
          >
            Calcular
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"¿Deseas hacer tu cálculo?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Por favor, rellene todos los campos requeridos.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </div>
  );
};

export default InputComponent;
