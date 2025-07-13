import { Box, Grid, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";

const NuevoServicio = () => {
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Box
      id="servicios"
      ref={ref}
      sx={{
        py: 6,
        px: 3,
        mt:4,
        backgroundColor: "#f9f9f9",
        fontFamily:
          "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
      }}
    >
      <Grid
        container
        spacing={4}
        justifyContent="space-around"
        alignItems="center"
        maxWidth="lg"
        margin="0 auto"
      >
        {/* Columna izquierda */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              textAlign: "center",
              maxWidth: "500px",
              mx: "auto",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#555", mb: 2 }}
            >
              ¿Qué hacemos?
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ color: "#666", fontSize: "1.2rem", lineHeight: 1.4 }}
            >
              Invitaciones digitales para compartir en un clic. Modernas,
              personalizadas y listas para emocionar desde el celular.
              Invitaciones físicas para entregar con amor. Diseños únicos con
              papeles especiales y todos los detalles que hacen la diferencia.
              En pantalla o en mano, cada invitación es un recuerdo inolvidable.
            </Typography>
          </Box>
        </Grid>

        {/* Columna derecha con imagen */}
        <Grid item xs={12} md={5}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Box
              component="img"
              src="/imagenes/idigital.webp"
              alt="QR"
              sx={{
                maxWidth: "100%",
                width: { xs: "220px", sm: "300px" },
                borderRadius: 2,
                boxShadow: 2,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NuevoServicio;
