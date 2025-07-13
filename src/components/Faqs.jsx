import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "¿Las invitaciones digitales se pueden personalizar?",
    answer:
      "¡Sí! Cada invitación se diseña especialmente para vos.Podés elegir los colores, el estilo, las fotos, el texto, la música y más.",
  },
  {
    question: "¿En cuánto tiempo recibo mi invitación digital una vez que la solicito?",
    answer:
      "Generalmente entre 3 y 5 días hábiles, dependiendo de la complejidad del diseño y las revisiones necesarias.",
  },
  {
    question: "Quiero que mi invitación digital sea igual a la física, ¿se puede?",
    answer:
      "¡Claro! Podemos hacer que ambas versiones tengan el mismo diseño, para que mantengan la misma estética y esencia.",
  },
  {
    question: "¿Cómo envío la invitación digital a mis invitados?",
    answer:
      "Muy fácil. Te enviamos un link personalizado que podés compartir por WhatsApp, redes o email.",
  },
  {
    question: "¿Qué incluye la invitación física?",
    answer:
      "Incluye el diseño personalizado, impresión en papeles especiales, sobres, detalles decorativos y todo el amor que merece tu evento.",
  },
  {
    question: "¿Puedo encargar solo la invitación digital o solo la física?",
    answer:
      "Sí. Podés elegir solo digital, solo física o ambas. ¡Vos elegís la combinación perfecta para tu evento!",
  },
  {
    question: "¿Con cuánta anticipación tengo que hacer el pedido?",
    answer:
      "Las invitaciones suelen enviarse entre un mes y medio y dos meses antes del evento. Te recomendamos pedir tu invitación con tiempo:\n\n• Digital: al menos una semana antes de la fecha en la que querés enviarla.\n• Física: entre 3 y 4 semanas antes, para diseñar, imprimir y preparar todos los detalles.",
  },
];

const Faqs = () => {
  return (
    <Box
      id="faqs"
      sx={{
        maxWidth: 800,
        mx: "auto",
        px: 2,
        py: 6,
        fontFamily:
          "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", mb: 4, color: "#555" }}
      >
        Preguntas Frecuentes
      </Typography>

      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ mb: 2, borderRadius: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: "bold", color: "#333" }}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: "#555", whiteSpace: "pre-line" }}>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Faqs;
