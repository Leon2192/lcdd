import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const links = [
    { label: "Inicio", href: "#inicio" },
    { label: "Invitaciones", href: "#invitaciones" },
    { label: "Contacto", href: "#contacto" },
  ];

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
    <AppBar
  position={isMobile ? "fixed" : "static"}
  elevation={0}
  sx={{
    backgroundColor: isMobile ? "rgba(255,255,255,0.8)" : "transparent",
    backdropFilter: isMobile ? "blur(8px)" : "none",
  }}
>

        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 2, sm: 4 },
            py: { xs: 1, sm: 2 },
            fontFamily:
              "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
          }}
        >
          {/* Logo */}
          <a href="#inicio">
            <Box
              component="img"
              src="/images/logo.png"
              alt="Logo"
              sx={{ height: { xs: 80, sm: 100 } }}
            />
          </a>

          {/* Desktop nav links */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2 }}>
              {links.map(({ label, href }) => (
                <Button
                  key={label}
                  href={href}
                  sx={{
                    color: "#555",
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

          {/* Mobile hamburger icon */}
          {isMobile && (
            <IconButton onClick={toggleDrawer(true)} sx={{ color: "#555" }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer para mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            mt: 4,
            fontFamily:
              "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
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
    </>
  );
};

export default Navbar;
