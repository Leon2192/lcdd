import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const links = [
    { label: "Inicio", href: "#inicio" },
    { label: "Invitaciones", href: "#invitaciones" },
    { label: "Preguntas frecuentes", href: "#invitaciones" },
    { label: "Contacto", href: "#contacto" },
  ];

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const slides = [
    {
      title: "¡INVITACIONES DIGITALES PARA TU EVENTO!",
     // subtitle: "INVITACIONES DIGITALES PARA TU EVENTO",
      subtitle: `Transformá tu invitación en una experiencia. 
      Facil de compartir, imposible de olvidar. Conocé 
       nuestros modelos y sorprendé  a tus invitados.`,
background: {
  backgroundColor: "#FCB0D3",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%23fcb1cd' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%23fcb2c8' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%23fcb3c2' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%23fcb4bd' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%23FCB5B8' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%23fcaeb9' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%23fca6bb' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%23fc9fbe' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%23fc97c3' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%23FC90CA' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E")`,
  backgroundAttachment: "fixed",
  backgroundSize: "cover",
},
      cards: [
        {
          title: "Invitación XV",
          description: "La emocion de tus 15 empoieza aca.",
          image: "/images/15.jpg",
          shift: true,
          link: "https://tmp-xv.vercel.app/",
        },
        {
          title: "Código QR",
          description: "Con QR tu invitacion se comparte facil y tus invitados tambien sus fotos .",
          image: "/images/qr.webp",
          highlight: true,
          link: "https://tmp-qr.vercel.app/",
        },
        {
          title: " Casamiento",
          description: "¡Romanticas, unicas y listas para compartir!",
          image: "/images/test4.jpeg",
          shift: true,
          link: "https://tmp-premium.vercel.app/",
        },
       
      ],
    },
//     {
//       title: "ENCONTRÁ",
//       subtitle: "TODOS LOS DETALLES PARA TU EVENTO",
//       text: `Souvenirs, papelería, invitaciones y más.
// Hecho a medida, con cariño y creatividad.`,
// backgroundColor: "#fce4ec",
//       cards: [
//         {
//           title: "Souvenir glitter",
//           description: "El detalle que todos recordarán.",
//           image: "/imagenes/ifisica.jpeg",
//           shift: false,
//           link: "#productos",
//         },
//         {
//           title: "Papelería personalizada",
//           description: "Tu estilo en cada rincón.",
//           image: "/imagenes/idigital.webp",
//           highlight: true,
//           link: "#productos",
//         },
//         {
//           title: "Invitación animada",
//           description: "Con movimiento y música.",
//           image: "/imagenes/souvenirs.jpeg",
//           shift: true,
//           link: "#productos",
//         },
//       ],
//     },
  ];

  return (
    <Box sx={{ position: "relative" }}>
      <AppBar position="absolute" elevation={0} sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 2, sm: 4 },
            py: { xs: 1, sm: 2 },
          }}
        >
          <a href="#inicio">
            <Box
              component="img"
              src="/images/logo.png"
              alt="Logo"
              sx={{ height: { xs: 120, sm: 180 } }}
            />
          </a>

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2 }}>
              {links.map(({ label, href }) => (
                <Button
                  key={label}
                  href={href}
                  fontWeight='bold'
                  sx={{
                    color: "#558396",
                    fontWeight: 500,
                    fontSize: "1rem",
                    textTransform: "none",
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#222",
                    },
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>
          )}

          {isMobile && (
            <IconButton onClick={toggleDrawer(true)} sx={{ color: "#555" }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, mt: 4 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            {links.map(({ label, href }) => (
              <ListItem
                button
                key={label}
                component="a"
                href={href}
                sx={{
                  color: "#555",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Autoplay]}
        style={{ width: "100%", height: "100%" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                px: { xs: 2, md: 4 },
                minHeight: { xs: "auto", md: "80vh" },
                backgroundColor: slide.backgroundColor || "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pt: { xs: 12, md: 16 },
              }}
            >
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                  <Box
  component="h2"
  sx={{
    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
    fontWeight: "bold",
    color: "#e27a9d",
    mb: 2,
    fontFamily: "'Tan Pearl', sans-serif",
    maxWidth: { xs: "100%", sm: "80%", md: "500px" },
    whiteSpace: "normal",
    overflowWrap: "break-word",
    wordBreak: "break-word",
    textAlign: { xs: "center", md: "left" },
    mx: { xs: "auto", md: 0 },
  }}
>
  {slide.title}
</Box>

<Typography
  variant="h5"
  fontWeight="bold"
  sx={{
    fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.5rem" },
    color: "#558396",
    mb: 2,
    maxWidth: { xs: "100%", sm: "90%", md: "500px" },
    whiteSpace: "normal",
    overflowWrap: "break-word",
    wordBreak: "break-word",
    textAlign: { xs: "center", md: "left" },
    mx: { xs: "auto", md: 0 },
  }}
>
  {slide.subtitle}
</Typography>

                

                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  {isMobile ? (
                    <Grid container spacing={3} justifyContent="center">
                      {slide.cards.map((card, i) => (
                        <Grid item xs={12} key={i} sx={{ display: "flex", justifyContent: "center" }}>
                          <Card
                            sx={{
                              width: 250,
                              height: card.highlight ? 400 : 320,
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
                              sx={{ objectFit: "cover" }}
                            />
                            <CardContent
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                flexGrow: 1,
                              }}
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
                                  mt: "auto",
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
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        gap: 3,
                        flexWrap: "wrap",
                      }}
                    >
                      {slide.cards.map((card, i) => (
                        <Card
                          key={i}
                          sx={{
                            width: 180,
                            height: card.highlight ? 400 : 320,
                            mt: card.shift ? "40px" : "0px",
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
                            sx={{ objectFit: "cover" }}
                          />
                          <CardContent
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                              flexGrow: 1,
                            }}
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
                                mt: "auto",
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
                              Ver demo
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Hero;
