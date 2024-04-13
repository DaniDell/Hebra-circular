import React from "react";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/system";
import TuneIcon from "@mui/icons-material/Tune";
import FilterDialog from "../Components/Utils/FilterDialog.jsx";
import { useScrollTrigger } from '@mui/material';



const SearchBar = () => {
  const [open, setOpen] = React.useState(false);
  const trigger = useScrollTrigger({
    disableHysteresis: false,
    threshold: 0,
  });

  const RoundedTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      borderRadius: 50,
      backgroundColor: '#F8F8F8',
      
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert('Esta versión es una demo de prueba que no incluye aún  el buscador por palabras clave.');
  };

  return (
    <Box
      display="flex"
      justifyContent="end"
      sx={{
        marginRight: "1.5rem",
        marginLeft: "1.4rem",
        marginTop: "1.5rem",
        gap: 1,
        '@media (min-width:950px)': {
          marginTop: "0.7rem",
          position: 'fixed',
          zIndex: 99999,
          top: '0', // Ajusta este valor según sea necesario
          right: '1.5rem', // Ajusta este valor según sea necesario
        },
      }}
    >
      <form onSubmit={handleSearchSubmit}>
      <RoundedTextField
        id="search"
        label=""
        variant="outlined"
        size="small"
        sx={{
          boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)",
          borderRadius: "50px",
          maxWidth: '200px',
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      
      </form>
      <IconButton
  sx={{
    boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)",
    backgroundColor: '#F8F8F8',
    color: "#4a4a46",
    '&:hover': {
      backgroundColor: '#D6D6D6', 
    },
  }}
        onClick={handleClickOpen}
      >
        <TuneIcon />
      </IconButton>

      <FilterDialog open={open} handleClose={handleClose} />
    </Box>
  );
};

export default SearchBar;