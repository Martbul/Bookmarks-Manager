import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQ() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container
      id="faq"
      sx={{
        py: { xs: 4, sm: 12 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          mb: 4,
          textAlign: "center",
          fontFamily: "inherit",
        }}
      >
        Frequently Asked Questions
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{
            borderRadius: 8,
            mb: 3,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography component="h3" variant="subtitle2">
              How do I contact customer support if I have a question or issue?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ maxWidth: "100%" }}>
              You can reach our customer support team by emailing{" "}
              <Link
                href="mailto:support@email.com"
                color="primary"
                sx={{ textDecoration: "none" }}
              >
                support@email.com
              </Link>{" "}
              or calling our toll-free number. We're here to assist you
              promptly.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          sx={{
            borderRadius: 8,
            mb: 3,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Typography component="h3" variant="subtitle2">
              Can I return the product if it doesn't meet my expectations?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ maxWidth: "100%" }}>
              Absolutely! We offer a hassle-free return policy. If you're not
              completely satisfied, you can return the product within [number of
              days] days for a full refund or exchange.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          sx={{
            borderRadius: 8,
            mb: 3,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3d-content"
            id="panel3d-header"
          >
            <Typography component="h3" variant="subtitle2">
              What makes your product stand out from others in the market?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ maxWidth: "100%" }}>
              Our product distinguishes itself through its adaptability,
              durability, and innovative features. We prioritize user
              satisfaction and continually strive to exceed expectations in
              every aspect.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
          sx={{
            borderRadius: 8,
            mb: 3,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4d-content"
            id="panel4d-header"
          >
            <Typography component="h3" variant="subtitle2">
              Is there a warranty on the product, and what does it cover?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ maxWidth: "100%" }}>
              Yes, our product comes with a [length of warranty] warranty. It
              covers defects in materials and workmanship. If you encounter any
              issues covered by the warranty, please contact our customer
              support for assistance.
            </Typography>
          </AccordionDetails>
        </Accordion>
        {/* Add more FAQ items here */}
      </Box>
    </Container>
  );
}
