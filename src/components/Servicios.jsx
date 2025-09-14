// src/components/Servicios/Servicios.jsx
import { Container, Title, Grid, Card, Image, Text } from '@mantine/core';

export function Servicios() {
  return (
    <Container size="lg" py="xl" id='servicios'>
      <Title order={2} ta="center" mb="lg">
        Nuestros Servicios
      </Title>

      <Grid gutter="lg">
        {/* 1) Invitaciones digitales */}
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card shadow="md" radius="md" withBorder>
            <Card.Section>
              <Image
                src="https://i.etsystatic.com/21274866/r/il/55e900/2692058642/il_1080xN.2692058642_daq8.jpg"
                alt="Invitaciones digitales"
                height={180}
              />
            </Card.Section>
            <Title order={3} mt="md">
              Invitaciones digitales
            </Title>
            <Text c="dimmed" mt="xs">
              Invitaciones únicas, modernas y listas para compartir en cualquier dispositivo.
            </Text>
          </Card>
        </Grid.Col>

        {/* 2) Invitaciones físicas */}
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card shadow="md" radius="md" withBorder>
            <Card.Section>
              <Image
                src="https://images.unsplash.com/photo-1641317136698-284db1e10c1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW52aXRhY2lvbmVzJTIwZmlzaWNhc3xlbnwwfHwwfHx8MA%3D%3D"
                alt="Invitaciones físicas"
                height={180}
              />
            </Card.Section>
            <Title order={3} mt="md">
              Invitaciones físicas
            </Title>
            <Text c="dimmed" mt="xs">
              Diseños impresos en papeles de calidad, con acabados personalizados.
            </Text>
          </Card>
        </Grid.Col>

        {/* 3) Papelería */}
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card shadow="md" radius="md" withBorder>
            <Card.Section>
              <Image
                src="https://plus.unsplash.com/premium_photo-1661657801128-459e612ef2c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW52aXRhY2lvbmVzJTIwZmlzaWNhc3xlbnwwfHwwfHx8MA%3D%3D"
                alt="Papelería"
                height={180}
              />
            </Card.Section>
            <Title order={3} mt="md">
              Papelería
            </Title>
            <Text c="dimmed" mt="xs">
              Tarjetas, etiquetas y detalles gráficos que complementan tu evento.
            </Text>
          </Card>
        </Grid.Col>

        {/* 4) Souvenirs personalizados */}
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card shadow="md" radius="md" withBorder>
            <Card.Section>
              <Image
                src="https://images.unsplash.com/photo-1711509424209-0ac59fd8fe4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c291dmVuaXJzJTIwcGVyc29uYWxpemFkb3N8ZW58MHx8MHx8fDA%3D"
                alt="Souvenirs personalizados"
                height={180}
              />
            </Card.Section>
            <Title order={3} mt="md">
              Souvenirs personalizados
            </Title>
            <Text c="dimmed" mt="xs">
              Recuerdos únicos y hechos a medida para sorprender a tus invitados.
            </Text>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
