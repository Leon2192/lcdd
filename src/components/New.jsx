import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,

  } from "@mui/material";
  
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

  
    return (
      <Box
        sx={{
          py: 6,
          px: 2,
          textAlign: "center",
          fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
        }}
      >
        {/* Título principal */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#333", // gris oscuro
            mb: 1,
            fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
          }}
        >
          ¡Nuevo Servicio!
        </Typography>
  
        {/* Subtítulo */}
        <Typography
          variant="body1"
          sx={{
            color: "#666", // gris medio
            mb: 4,
            fontSize: { xs: "1rem", sm: "1.1rem" },
            fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
          }}
        >
          Descubrí las nuevas propuestas que tenemos para tu evento
        </Typography>
  
        {/* Grilla de cards */}
        <Grid container spacing={3} justifyContent="center">
          {servicios.map((servicio, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  
  export default NuevoServicio;
  