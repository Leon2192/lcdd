import { Box, Typography, useMediaQuery, useTheme, Button, Fade } from "@mui/material";
import { useState, useEffect } from "react";

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100); // delay leve para suavidad
    return () => clearTimeout(timer);
  }, []);

  const desktopImage = "/images/book.jpg";
  const mobileImage = "/images/book.jpg";

  return (
    <Box
      id="inicio"
      sx={{
        position: "relative",
        height: "100vh",
        minHeight: "600px",
        width: "100vw",
        backgroundImage: `url(${isMobile ? mobileImage : desktopImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Fade in={show} timeout={1200}>
        <Box
          sx={{
            textAlign: "center",
            color: "#fff",
            maxWidth: 700,
            px: { xs: 2, sm: 3 },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.6rem", sm: "2.2rem", md: "2.8rem" },
              fontWeight: "bold",
              mb: 2,
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
            }}
          >
            Invitaciones digitales para tu evento
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.95rem", sm: "1rem" },
              fontWeight: 300,
              lineHeight: 1.5,
              mb: 3,
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
            }}
          >
            ¡Tu día más especial merece una invitación única!
            <br />
            Hacemos que compartir tu invitación con tus seres queridos
            es tan simple como enviar un enlace.
            <br />
            ¡Conocé nuestros modelos!
          </Typography>

          <Button
            variant="outlined"
            href="#invitaciones"
            sx={{
              color: "#fff",
              borderColor: "#fff",
              borderRadius: 999,
              px: 4,
              py: 1,
              fontWeight: 500,
              fontSize: "1rem",
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderColor: "#fff",
                color: "#fff",
              },
            }}
          >
            Ver modelos
          </Button>
        </Box>
      </Fade>
    </Box>
  );
};

export default Hero;
