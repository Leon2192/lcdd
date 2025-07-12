import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    Button,
  } from "@mui/material";
  
  import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import GroupIcon from "@mui/icons-material/Group";
  import CelebrationIcon from "@mui/icons-material/Celebration";
  import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
  import HotelClassIcon from "@mui/icons-material/HotelClass";
  
  const servicios = [
    {
      icon: <WorkspacePremiumIcon sx={{ fontSize: 40, color: "#f8bbd0" }} />,
      title: "Invitación BLACK",
      description:
        "La opción más completa: incluye Dress Code, Instagram Wall, sugerencia de canciones y más.",
      url: "https://tmp-premium.vercel.app/",
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 40, color: "#b3e5fc" }} />,
      title: "Invitación PREMIUM",
      description:
        "Todas las funciones básicas más cuenta regresiva y álbum con hasta 10 fotos de la pareja.",
      url: "https://template-prem.vercel.app/",
    },
    {
      icon: <HotelClassIcon sx={{ fontSize: 40, color: "#c8e6c9" }} />,
      title: "Invitación TRADICIONAL",
      description:
        "Funciones esenciales: RSVP online, fotos de la pareja, y toda la info para tus invitados.",
      url: "https://tmp-classic.vercel.app/",
    },
    {
      icon: <CelebrationIcon sx={{ fontSize: 40, color: "#ffe0b2" }} />,
      title: "Invitación 15 años",
      description:
        "Todas las funcionalidades pensadas para compartir los detalles de tu fiesta de 15 con todos.",
      url: "https://tmp-xv.vercel.app/",
    },
  ];
  
  const Invitaciones = () => {
    return (
      <Box
      id="invitaciones"
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
          sx={{ fontWeight: "bold", color: "#555", mb: 4 }}
        >
          Invitaciones Digitales
        </Typography>
  
        <Grid container spacing={4} justifyContent="center">
          {servicios.map((servicio, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: "100%",
                  minHeight: 340,
                  borderRadius: 3,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textAlign: "center",
                  padding: 3,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {servicio.icon}
                </Box>
  
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 0,
                    mt: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#555",
                      mb: 1,
                      maxWidth: 280,
                      textAlign: "center",
                      wordBreak: "break-word",
                    }}
                  >
                    {servicio.title}
                  </Typography>
  
                  <Typography
                    sx={{
                      color: "#777",
                      fontSize: "0.95rem",
                      maxWidth: 280,
                      textAlign: "center",
                      lineHeight: 1.4,
                      wordBreak: "break-word",
                    }}
                  >
                    {servicio.description}
                  </Typography>
  
                  <Box sx={{ mt: 3 }}>
                    <a
                      href={servicio.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          borderRadius: 999,
                          px: 3,
                          py: 0.8,
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color: "#555",
                          borderColor: "#bbb",
                          fontFamily:
                            "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#f0e6f6",
                            borderColor: "#aaa",
                          },
                        }}
                      >
                        Ver Demo
                      </Button>
                    </a>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  
  export default Invitaciones;
  