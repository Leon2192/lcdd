import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const cards = [
    {
      title: "Invitacion XV",
      description: "Dejá tu mensaje en el recuerdo.",
      image: "/images/15.jpg",
      shift: true,
      link: "https://tmp-xv.vercel.app/",
    },
    {
      title: "Invitacion Casamiento",
      description: "¡Sobreviví al día después!",
      image: "/images/test4.jpeg",
      highlight: true,
      link: "https://tmp-premium.vercel.app/",
    },
    {
      title: "Codigo QR",
      description: "Un mensaje de corazón grabado.",
      image: "/images/qr.webp",
      shift: true,
      link: "https://template-prem.vercel.app/",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
        pt: { xs: 14, md: 10 }, // más espacio arriba en mobile
        backgroundColor: "#fce4ec",
        overflow: "hidden",
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* COLUMNA IZQUIERDA */}
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                fontWeight: "bold",
                color: "#c2185b",
                mb: 2,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              BIENVENIDO
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.5rem" },
                color: "#303f9f",
                mb: 2,
              }}
            >
              INVITACIONES DIGITALES PARA TU EVENTO
            </Typography>

            <Typography
              sx={{
                mb: 3,
                fontSize: { xs: "1rem", sm: "1.1rem" },
                whiteSpace: "pre-line",
              }}
            >
              {`¡Tu día más especial merece una invitación única!
Hacemos que compartir tu invitación con tus seres queridos sea simple.
¡Conocé nuestros modelos!`}
            </Typography>

            <Button
              component="a"
              href="#invitaciones"
              variant="outlined"
              sx={{
                borderRadius: 999,
                px: 4,
                borderColor: "#84cc16",
                color: "#84cc16",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#84cc16",
                  color: "#fff",
                  borderColor: "#84cc16",
                },
              }}
            >
              VER MÁS
            </Button>
          </Box>
        </Grid>

        {/* COLUMNA DERECHA */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { xs: "center", md: "center" },
              alignItems: { xs: "center", md: "flex-start" },
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            {cards.map((card, index) => (
              <Card
                key={index}
                sx={{
                  width: isMobile ? "90%" : 180,
                  height: card.highlight ? 400 : 320,
                  mt: isMobile ? 0 : card.shift ? "40px" : "0px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: 3,
                  borderRadius: 3,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={card.image}
                  alt={card.title}
                />
                <CardContent
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                  <Button
                    component="a"
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    sx={{
                      mt: 1,
                      borderRadius: 999,
                      borderColor: "#84cc16",
                      color: "#84cc16",
                      textTransform: "none",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#84cc16",
                        borderColor: "#84cc16",
                        color: "#fff",
                      },
                    }}
                  >
                    Ver más
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
