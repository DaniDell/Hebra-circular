import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 1,
        pl: 3,
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        height: "6rem",
        paddingRight: "3%", 
        gap: 2,
      }}
    >
      <Box
sx={{
  flex: 1, // La primera columna ocupa 2/3 del espacio
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start", // Alineación a la izquierda
}}
      >
<Typography
  variant="h7"
  sx={{ color: theme.palette.custom2.main, fontWeight: "bold", textAlign: 'left' }}
>
  Hebra Circular
</Typography>
        <Box sx={{ display: "flex", gap: 1, p: 1 }}>
          <Link
            href="https://www.instagram.com/hebra.circular/"
            target="_blank"
            rel="noopener"
            aria-label="Instagram de Hebra Circular"
          >
            <InstagramIcon
              style={{ color: theme.palette.custom2.main, fontSize: 32 }}
            />
          </Link>

          <Link
            href="https://www.linkedin.com/company/hebra-circular/"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn de Hebra Circular"
          >
            <LinkedInIcon
              style={{ color: theme.palette.custom2.main, fontSize: 32 }}
            />
          </Link>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1.8, // La segunda columna ocupa 1/3 del espacio
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end", alignItems: "flex-end" , gap: 1, 
        }}
      >
        <Link
          href="/terminos-y-condiciones"
          sx={{
            color: theme.palette.custom2.main,
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
            fontSize: '0.8rem',
          }}
        >
          Términos y Condiciones
        </Link>
        <Box sx={{ display: "flex", justifyContent: "flex-end", }}>
          <Link
            href="https://www.linkedin.com/company/trama-b-textil/"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn de Trama B Textil"
          >
            <Typography
              sx={{ color: theme.palette.custom2.main, fontSize: "0.8rem" }}
            >
              Plataforma impulsada x Trama B
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;