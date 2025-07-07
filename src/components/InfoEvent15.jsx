import { Box, Grid, Typography, Button, Divider } from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";

const InfoEvent = () => {
  return (
    <Box
      sx={{
        py: 6,
        px: 2,
        backgroundColor: "#fff",
      }}
    >
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
      >
        {/* Única columna centrada */}
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: "center" }}>
            <CelebrationIcon sx={{ fontSize: 50, color: "#b0b0b0", mb: 1 }} />
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Fiesta
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Sábado 23 de octubre
            </Typography>
            <Typography variant="body1" color="text.secondary">
              21:00 a 05:00 hs.
            </Typography>
            <Typography variant="body1" color="text.secondary">
             Palacio Duhau
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Av. Alvear 1661, C1014AAD Cdad. Autónoma de Buenos Aires
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Clickeá en el botón de abajo y encontrá las indicaciones para llegar,
              ¡nos vemos!😉
            </Typography>

            <a
              href="https://www.google.com/maps/place/Palacio+Duhau+-+Park+Hyatt+Buenos+Aires/@-34.5893841,-58.3888138,17z/data=!3m2!4b1!5s0x95bccabb2a425bb7:0xe8260627de010b22!4m9!3m8!1s0x95bccabb2e3f7af9:0x2b820ee8b1a83f72!5m2!4m1!1i2!8m2!3d-34.5893841!4d-58.3862335!16s%2Fm%2F064qgcm"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                sx={{
                  borderRadius: 999,
                  px: 4,
                  backgroundColor: "#d1c4e9",
                  color: "#4a148c",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#fff",
                    border: "2px solid #d1c4e9",
                    color: "#4a148c",
                  },
                }}
              >
                Cómo llegar
              </Button>
            </a>
          </Box>
        </Grid>
      </Grid>

      {/* Divider al final */}
      <Divider
        sx={{
          mt: 6,
          mx: "auto",
          width: "40px",
          borderBottomWidth: 2,
          borderColor: "#ccc",
        }}
      />
    </Box>
  );
};

export default InfoEvent;
