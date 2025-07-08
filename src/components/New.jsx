import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Fade,
} from "@mui/material";
import { useInView } from "react-intersection-observer";

const servicios = [
  {
    image: "/images/qr.webp",
    alt: "Stand de glitter",
  },
  {
    image: "/images/qr2.avif",
    alt: "Cabina 360",
  },
  {
    image: "/images/qr3.webp",
    alt: "Audio Guestbook",
  },
];

const NuevoServicio = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // solo una vez
    threshold: 0.2, // porcentaje visible para activar
  });

  return (
    <Box
      ref={ref}
      sx={{
        py: 6,
        px: 2,
        textAlign: "center",
        fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#333",
          mb: 1,
        }}
      >
        ¡Nuevo Servicio!
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "#666",
          mb: 4,
          fontSize: { xs: "1rem", sm: "1.1rem" },
        }}
      >
        Descubrí las nuevas propuestas que tenemos para tu evento
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {servicios.map((servicio, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Fade
              in={inView}
              style={{ transitionDelay: `${index * 300}ms` }}
              timeout={800}
            >
              <Card
                sx={{
                  height: 400,
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: 4,
                }}
              >
                <CardMedia
                  component="img"
                  image={servicio.image}
                  alt={servicio.alt}
                  sx={{
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NuevoServicio;
