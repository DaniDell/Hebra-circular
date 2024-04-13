import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 3,
        pb: "0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        height: "6rem",
        overflow: "auto",
        paddingRight: "3%", // 1 unit equals 8px
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 0.5,
          p: 0,
        }}
      >
        <Typography
          variant="h7"
          sx={{ color: theme.palette.custom2.main, fontWeight: "bold" }}
        >
          Hebra Circular
        </Typography>

        <Link
          href="/terminos-y-condiciones"
          sx={{
            color: theme.palette.custom2.main,
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Ver términos y Condiciones
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, p: 1 }}>
          <Link
            href="https://www.instagram.com/trama_b_textil/"
            target="_blank"
            rel="noopener"
            aria-label="Instagram de Trama B Textil"
          >
            <InstagramIcon
              style={{ color: theme.palette.custom2.main, fontSize: 32 }}
            />
          </Link>

          <Link
            href="https://www.linkedin.com/company/trama-b-textil/"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn de Trama B Textil"
          >
            <LinkedInIcon
              style={{ color: theme.palette.custom2.main, fontSize: 32 }}
            />
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, p: 1 }}>
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
    </Box>
  );
};

export default Footer;
