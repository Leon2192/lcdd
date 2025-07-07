// Whatsapp.jsx
import { Box, Link } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Whatsapp = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 999,
      }}
    >
      <Link
        href="https://wa.me/541127682286"
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
      >
        <Box
          sx={{
            backgroundColor: "#25D366",
            borderRadius: "50%",
            width: 56,
            height: 56,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <WhatsAppIcon sx={{ color: "#fff", fontSize: 30 }} />
        </Box>
      </Link>
    </Box>
  );
};

export default Whatsapp;
