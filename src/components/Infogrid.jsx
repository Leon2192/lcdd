import {
    Box,
    Grid,
    Typography,
  } from "@mui/material";
  
  import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
  import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
  import MapIcon from "@mui/icons-material/Map";
  import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
  import CheckroomIcon from "@mui/icons-material/Checkroom";
  import MusicNoteIcon from "@mui/icons-material/MusicNote";
  import QueueMusicIcon from "@mui/icons-material/QueueMusic";
  import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
  
  const items = [
    {
      icon: <PhotoCameraIcon sx={{ fontSize: 50, color: "#f8bbd0" }} />,
      title: "Galería de fotos",
      subtitle: "Todas tus fotos significativas",
    },
    {
      icon: <CalendarTodayIcon sx={{ fontSize: 50, color: "#b3e5fc" }} />,
      title: "Asistencia",
      subtitle: "Confirmación de asistencia online.",
    },
    {
      icon: <MapIcon sx={{ fontSize: 50, color: "#c8e6c9" }} />,
      title: "GPS",
      subtitle: "Indicaciones para llegar al evento.",
    },
    {
      icon: <CardGiftcardIcon sx={{ fontSize: 50, color: "#d1c4e9" }} />,
      title: "Lista de regalos",
      subtitle: "Info sobre listas, cuentas bancarias y demás.",
    },
    {
      icon: <CheckroomIcon sx={{ fontSize: 50, color: "#ffe0b2" }} />, // naranja pastel
      title: "Dresscode",
      subtitle: "Info de vestimenta para tus invitados.",
    },
    {
      icon: <MusicNoteIcon sx={{ fontSize: 50, color: "#b2dfdb" }} />, // turquesa pastel
      title: "Musicalización",
      subtitle: "Tu canción preferida sonando en tu invite.",
    },
    {
      icon: <QueueMusicIcon sx={{ fontSize: 50, color: "#f48fb1" }} />, // rosa intenso pastel
      title: "Playlist",
      subtitle: "Sugerencia de canciones para tu fiesta.",
    },
    {
      icon: <InfoOutlinedIcon sx={{ fontSize: 50, color: "#cfd8dc" }} />, // gris azulado pastel
      title: "Información útil",
      subtitle: "Alojamientos, transportes y más.",
    },
  ];
  
  const InfoGrid = () => {
    return (
      <Box
        sx={{
          py: 6,
          px: 3,
          textAlign: "center",
          backgroundColor: "#f9f9f9",
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
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  
  export default InfoGrid;
  