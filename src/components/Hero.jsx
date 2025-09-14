// src/components/Hero/Hero.jsx
import {
    BackgroundImage,
    Overlay,
    Center,
    Stack,
    Title,
    Group,
    Burger,
    Drawer,
    ScrollArea,
    Button,
    Image as MantineImage,
    Container,
  } from '@mantine/core';
  import { useDisclosure } from '@mantine/hooks';
  
  export function Hero() {
    const [drawerOpened, { toggle, close }] = useDisclosure(false);
  
    return (
      <>
        {/* 🔹 Navbar fijo arriba */}
        <header
        id='inicio'
          style={{
            backgroundColor: 'white',
            borderBottom: '1px solid #eee',
          }}
        >
          <Container
            size="lg"
            style={{
              padding: '0.5rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Logo */}
            <MantineImage
              src="/images/logo.png"
              alt="Logo"
              w={100}
              h={100}
              fit="contain"
            />
  
            {/* Links desktop */}
            <Group gap="lg" visibleFrom="sm">
              <Button component="a" href="#inicio" variant="subtle" color="dark">
                Inicio
              </Button>
              <Button component="a" href="#servicios" variant="subtle" color="dark">
                Servicios
              </Button>
              <Button component="a" href="#contacto" variant="subtle" color="dark">
                Contacto
              </Button>
            </Group>
  
            {/* Burger mobile */}
            <Burger
              opened={drawerOpened}
              onClick={toggle}
              hiddenFrom="sm"
              color="black"
            />
          </Container>
        </header>
  
        {/* Drawer mobile */}
        <Drawer
          opened={drawerOpened}
          onClose={close}
          size="100%"
          padding="md"
          hiddenFrom="sm"
          title="Menú"
          zIndex={20}
        >
          <ScrollArea h="calc(100vh - 60px)" mx="-md">
            <Stack gap="lg" align="center" justify="center">
              <Button
                component="a"
                href="#inicio"
                variant="subtle"
                size="lg"
                onClick={close}
              >
                Inicio
              </Button>
              <Button
                component="a"
                href="#servicios"
                variant="subtle"
                size="lg"
                onClick={close}
              >
                Servicios
              </Button>
              <Button
                component="a"
                href="#contacto"
                variant="subtle"
                size="lg"
                onClick={close}
              >
                Contacto
              </Button>
            </Stack>
          </ScrollArea>
        </Drawer>
  
        {/* 🔹 Hero debajo del navbar */}
        <BackgroundImage
          id="inicio" // 👈 sección Inicio
          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=80"
          style={{
            minHeight: '80vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            position: 'relative',
          }}
        >
          <Overlay
            gradient="linear-gradient(180deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,.35) 35%, rgba(0,0,0,.55) 100%)"
            zIndex={0}
          />
          <Overlay
            zIndex={0}
            opacity={0}
            style={{
              backdropFilter: 'grayscale(14%) brightness(0.7) contrast(1.05)',
              WebkitBackdropFilter:
                'grayscale(14%) brightness(0.7) contrast(1.05)',
            }}
          />
  
          {/* Contenido */}
          <Center style={{ minHeight: '80vh', position: 'relative', zIndex: 1 }}>
            <Stack align="center" gap="md">
              <Title
                order={1}
                c="white"
                ta="center"
                style={{
                  fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                  lineHeight: 1.2,
                  textShadow: '0 6px 18px rgba(0,0,0,.45)',
                }}
              >
                Invitaciones personalizadas <br /> digitales y físicas
              </Title>
  
              <Title
                order={2}
                c="white"
                ta="center"
                style={{
                  fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
                  fontWeight: 400,
                  lineHeight: 1.3,
                  textShadow: '0 4px 12px rgba(0,0,0,.4)',
                }}
              >
                Papelería, souvenirs y mucho más
              </Title>
  
              <Button
                component="a"
                href="#servicios"
                variant="outline"
                radius="xl"
                size="md"
                color="white"
                styles={{
                  root: {
                    borderWidth: 2,
                    fontWeight: 500,
                    paddingInline: '1.8rem',
                  },
                  label: { color: 'white' },
                }}
              >
                Ver servicios
              </Button>
            </Stack>
          </Center>
        </BackgroundImage>
      </>
    );
  }
  