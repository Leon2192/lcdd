import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useInView } from "react-intersection-observer";

// const servicios = [
//   {
//     image: "/imagenes/bat.jpg",
//     title: "15 AÑOS",
//     subtitle: "Fiestas temáticas inolvidables para cada estilo.",
//   },
//   {
//     image: "/imagenes/decocasamiento.jpeg",
//     title: "CASAMIENTOS",
//     subtitle: "Detalles únicos para el día más importante.",
//   },
//   {
//     image: "/imagenes/15.avif",
//     title: "CUMPLEAÑOS",
//     subtitle: "Celebraciones llenas de magia y personalización.",
//   },
// ];

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
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        fontFamily:
          "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "#555", mb: 2 }}
      >
        ¿Qué hacemos?
      </Typography>

      <Box sx={{ maxWidth: 800, mx: "auto", mb: 4 }}>
        <Typography
          variant="subtitle1"
          sx={{ color: "#666", fontSize: "1.2rem", lineHeight: 1.3 }}
        >
          Invitaciones digitales para compartir en un clic. Modernas, personalizadas y listas para emocionar desde el celular. Invitaciones fisicas para entregar con amor. Disenos unicos con papeles especiales y todos los detalles que hacen la diferencia.EN pantalla o en mano, cada invitacion es un recuerdo inolvidable.
        </Typography>
      </Box>

     
    </Box>
  );
};

export default NuevoServicio;
