import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Fade,
    Button,
  } from "@mui/material";
  import { useInView } from "react-intersection-observer";
  
  const productos = [
    {
      image: "/imagenes/ifisica.jpeg",
      title: "Invitaciones impresas",
      subtitle:
        "Invitaciones con papel importado, creadas especialmente para vos. Con el mismo estilo creamos la decoración de tu fiesta!",
    },
    {
      image: "/imagenes/idigital.webp",
      title: "Invitaciones digitales",
      subtitle:
        "Diseñamos tus invitaciones digitales para enviar por mail o whatsapp!",
    },
    {
      image: "/imagenes/souvenirs.jpeg",
      title: "Souvenirs personalizados",
      subtitle:
        "Regalá a tus invitados un souvenir super original para que nunca se olviden de tu fiesta!",
    },
  ];
  
  const Servicios = () => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.2,
    });
  
    return (
      <Box
        ref={ref}
        sx={{
          py: 6,
          px: 2,
          textAlign: "center",
          fontFamily:
            "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#333",
            mb: 4,
          }}
        >
          Nuestros productos
        </Typography>
  
        <Grid container spacing={4} justifyContent="center">
          {productos.map((producto, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              display="flex"
              justifyContent="center"
            >
              <Fade
                in={inView}
                timeout={800}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                <Card
                  sx={{
                    width: 300,
                    height: 460,
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: 4,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={producto.image}
                    alt={producto.title}
                    sx={{
                      height: 200,
                      objectFit: "cover",
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      px: 2,
                      py: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      textAlign: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                          fontSize: "1.15rem",
                          lineHeight: 1.4,
                        }}
                      >
                        {producto.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          fontSize: "1rem",
                          lineHeight: 1.6,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {producto.subtitle}
                      </Typography>
                    </Box>
                    <a
  href="https://wa.me/5491135939460"
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
   Consultar servicio
  </Button>
</a>


                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  
  export default Servicios;
  