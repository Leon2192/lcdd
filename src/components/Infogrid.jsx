import {
  Box,
  Grid,
  Typography,
  Zoom,
} from "@mui/material";

import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MapIcon from "@mui/icons-material/Map";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useInView } from "react-intersection-observer";

const items = [
  {
    icon: <PhotoCameraIcon sx={{ fontSize: 50, color: "#424242" }} />,
    title: "Galería de fotos",
    subtitle: "Todas tus fotos significativas",
  },
  {
    icon: <CalendarTodayIcon sx={{ fontSize: 50, color: "#424242" }} />,
    title: "Asistencia",
    subtitle: "Confirmación de asistencia online.",
  },
  {
    icon: <MapIcon sx={{ fontSize: 50, color: "#424242" }} />,
    title: "GPS",
    subtitle: "Indicaciones para llegar al evento.",
  },
  {
    icon: <CardGiftcardIcon sx={{ fontSize: 50, color: "#424242" }} />,
    title: "Lista de regalos",
    subtitle: "Info sobre listas, cuentas bancarias y demás.",
  },
  {
    icon: <CheckroomIcon sx={{ fontSize: 50, color: "#424242" }} />,
    title: "Dresscode",
    subtitle: "Info de vestimenta para tus invitados.",
  },
  {
    icon: <MusicNoteIcon sx={{ fontSize: 50, color: "#424242" }} />,
    title: "Musicalización",
    subtitle: "Tu canción preferida sonando en tu invite.",
  },
  {
    icon: <QueueMusicIcon sx={{ fontSize: 50, color: "#424242" }} />,
    title: "Playlist",
    subtitle: "Sugerencia de canciones para tu fiesta.",
  },
  {
    icon: <InfoOutlinedIcon sx={{ fontSize: 50, color: "#424242" }} />,
    title: "Información útil",
    subtitle: "Alojamientos, transportes y más.",
  },
];


const InfoGrid = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Box
      ref={ref}
      sx={{
        py: 6,
        px: 3,
        textAlign: "center",
        // backgroundColor: "#f9f9f9",
        fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#555",
          mb: 4,
        }}
      >
        Algunas funcionalidades
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {items.map((item, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Zoom
              in={inView}
              timeout={400 + index * 100}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Box>
                {item.icon}

                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#555",
                    mt: 2,
                    fontSize: "1.1rem",
                  }}
                >
                  {item.title}
                </Typography>

                {item.subtitle && (
                  <Typography
                    sx={{
                      color: "#777",
                      mt: 1,
                      fontSize: "0.95rem",
                      maxWidth: 200,
                    }}
                  >
                    {item.subtitle}
                  </Typography>
                )}
              </Box>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InfoGrid;
