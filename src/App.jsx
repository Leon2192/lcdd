// App.jsx
import './App.css';
import {
  BackgroundImage,
  Overlay,
  Center,
  Stack,
  Title,
  Container,
  Grid,
  Card,
  Image,
  Text,
  SimpleGrid,
  AspectRatio,
  Modal,        // 👈 nuevo
  ThemeIcon,    // 👈 nuevo
  Button,       // ya lo usábamos arriba en cards, pero por las dudas
} from '@mantine/core';
import { IconGift } from '@tabler/icons-react';
import { IconMusic } from '@tabler/icons-react';
import {
  // ...
  Group, Anchor, ActionIcon, Box, Divider,
} from '@mantine/core';
import {
  IconBrandWhatsapp, IconMail, IconBrandInstagram, IconPhone,
} from '@tabler/icons-react';
import { IconShirt } from '@tabler/icons-react';
import { Hero } from './components/Hero';
import { Servicios } from './components/Servicios';
// arriba, junto a los otros imports de Tabler







const galleryImages = [
  {
    src: 'https://cdn0.casamientos.com.ar/usr/2/1/0/7/cfb_2x_123621.jpg',
    title: 'Invitación QR',
    href: 'https://qr-casamientos.lacasadeldetalle.com.ar/', // 👈 tu enlace aquí
  },
  {
    src: 'https://images.unsplash.com/photo-1705095164628-a21b0f550234?w=500&auto=format&fit=crop',
    title: 'Invitación Black',
    href: 'https://demoblack01.lacasadeldetalle.com.ar/',
  },
  {
    src: 'https://images.unsplash.com/photo-1731469749173-db1724c4d038?w=500&auto=format&fit=crop',
    title: 'Invitación XV',
    href: 'https://fiestasxv.lacasadeldetalle.com.ar/',
  },
  {
    src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=500&auto=format&fit=crop',
    title: 'Invitación Premium',
    href: 'https://casamientospremium.lacasadeldetalle.com.ar/',
  },
  {
    src: 'https://images.unsplash.com/photo-1573676048035-9c2a72b6a12a?q=80&w=871&auto=format&fit=crop',
    title: 'Invitación Clásica',
    href: 'https://premium.lacasadeldetalle.com.ar/',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1718119441185-f68982796c63?q=80&w=870&auto=format&fit=crop',
    title: 'Invitación Física',
  },
];



export default function App() {




  return (
    <>
    <Hero/>
    <Servicios/>

    <Container size="lg" py="xl">
  <Title order={2} ta="center" mb="lg">
    Nuestras invitaciones 
  </Title>

  <SimpleGrid
  cols={2} // mobile → 2 columnas
  spacing="lg"
  breakpoints={[
    { minWidth: 'sm', cols: 2 }, // tablets → 2 columnas
    { minWidth: 'md', cols: 3 }, // desktop → 3 columnas
  ]}
>

  {galleryImages.map(({ src, title, href }, i) => (
  <AspectRatio
    key={i}
    ratio={1}
    style={{
      overflow: 'hidden',
      borderRadius: 12,
      position: 'relative',
    }}
  >
    <Box style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Imagen */}
      <Image
        src={src}
        alt={title}
        fit="cover"
        loading="lazy"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Overlay oscuro */}
      <Overlay opacity={0.4} color="black" zIndex={1} />

      {/* Texto + Botón */}
      <Center
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
        }}
      >
        <Stack align="center" gap="sm">
          <Text
            c="white"
            fw={600}
            ta="center"
            style={{
              fontSize: '1.2rem',
              textShadow: '0 2px 6px rgba(0,0,0,0.6)',
            }}
          >
            {title}
          </Text>

          <Button
            component="a"
            href={href} 
            variant="outline"
            radius="xl"
            color="white"
            styles={{
              root: {
                borderWidth: 2,
                fontWeight: 500,
                paddingInline: '1.2rem',
              },
              label: { color: 'white' },
            }}
          >
            Ver demo
          </Button>
        </Stack>
      </Center>
    </Box>
  </AspectRatio>
))}

  </SimpleGrid>
</Container>




{/* 8) Footer */}
<Box
id='contacto'
  component="footer"
  pt="xl"
  pb="xl"
  style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}
>
  <Container size="lg">
    <Grid gutter="xl">
      {/* Columna izquierda */}
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <Stack gap="xs">
          <Title order={4} tt="uppercase" fw={700}>
            Somos La Casa del Detalle
          </Title>
          <Text c="dimmed">
            ¡Contactanos! Trabajamos desde Argentina al mundo.
          </Text>

          <Group gap="sm" align="center" mt="sm">
            <ThemeIcon color="green" variant="light" radius="xl" size="lg">
              <IconBrandWhatsapp stroke={1.7} />
            </ThemeIcon>
            <Anchor
              href="https://wa.me/5491135939460"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              c="teal.7"
              fw={600}
            >
              ¡Envíanos un Whatsapp!
            </Anchor>
          </Group>

          <Group gap="sm" align="center">
            <ThemeIcon color="gray" variant="light" radius="xl" size="lg">
              <IconPhone stroke={1.7} />
            </ThemeIcon>
            <Text>+54 11 35939460 | +54 11 21650320</Text>
          </Group>

          <Group gap="sm" align="center">
            <ThemeIcon color="gray" variant="light" radius="xl" size="lg">
              <IconMail stroke={1.7} />
            </ThemeIcon>
            <Anchor
              href="mailto:contacto.lacasadeldetalle@gmail.com"
              size="lg"
              c="teal.7"
            >
              contacto.lacasadeldetalle@gmail.com
            </Anchor>
          </Group>
        </Stack>
      </Grid.Col>

      {/* Columna derecha */}
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <Stack gap="xs">
          <Title order={4} tt="uppercase" fw={700}>
            Seguinos en Instagram
          </Title>
          <Text c="dimmed">
            Para ver ejemplos de nuestro trabajo y enterarte de todas nuestras
            novedades.
          </Text>

          <Group gap="sm" align="center" mt="sm">
            <ThemeIcon color="gray" variant="light" radius="xl" size="lg">
              <IconBrandInstagram stroke={1.7} />
            </ThemeIcon>
            <Anchor
              href="https://instagram.com/lacasadeldetalle_arg"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              c="teal.7"
            >
              La casa del detalle
            </Anchor>
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
  </Container>
</Box>




    </>
  );
}
