import { alpha, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Hero() {
  const theme = useTheme();

  return (
    <Box
      id="hero"
      sx={{
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
        paddingTop: theme.spacing(14),
        paddingBottom: theme.spacing(8),
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            textAlign: "center",
            fontSize: "clamp(3.5rem, 8vw, 4rem)",
            color: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.primary.main
                : theme.palette.primary.light,
            marginBottom: theme.spacing(2),
          }}
        >
          Our latest&nbsp;
          <Typography
            component="span"
            variant="h1"
            sx={{
              fontSize: "clamp(3rem, 8vw, 4rem)",
              fontWeight: 700,
            }}
          >
            products
          </Typography>
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{
            width: { xs: "100%", sm: "70%" },
            marginBottom: theme.spacing(3),
          }}
        >
          Explore our cutting-edge dashboard, delivering high-quality solutions
          tailored to your needs. Elevate your experience with top-tier features
          and services.
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ marginBottom: theme.spacing(3) }}
        >
          <TextField
            id="outlined-basic"
            hiddenLabel
            size="small"
            variant="outlined"
            placeholder="Your email address"
            sx={{
              width: { xs: "100%", sm: "auto" },
              borderRadius: 8,
              "& .MuiOutlinedInput-root": {
                borderRadius: 8,
                background: theme.palette.background.paper,
              },
              "& .MuiOutlinedInput-input": {
                padding: "14px 20px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor:
                  theme.palette.mode === "light"
                    ? alpha("#000", 0.23)
                    : alpha("#fff", 0.23),
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor:
                  theme.palette.mode === "light"
                    ? alpha("#000", 0.6)
                    : alpha("#fff", 0.6),
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 8,
              paddingLeft: theme.spacing(4),
              paddingRight: theme.spacing(4),
              textTransform: "none",
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? alpha(theme.palette.primary.main, 0.8)
                    : alpha(theme.palette.primary.light, 0.8),
              },
            }}
          >
            Start now
          </Button>
        </Stack>
        <Typography
          variant="caption"
          textAlign="center"
          sx={{ opacity: 0.8, marginBottom: theme.spacing(1) }}
        >
          By clicking "Start now" you agree to our&nbsp;
          <Link href="#" color="primary">
            Terms & Conditions
          </Link>
          .
        </Typography>
        <Box
          id="image"
          sx={{
            marginTop: theme.spacing(8),
            alignSelf: "center",
            height: { xs: 200, sm: 400 },
            width: "100%",
            backgroundImage:
              theme.palette.mode === "light"
                ? 'url("/static/images/templates/templates-images/hero-light.png")'
                : 'url("/static/images/templates/templates-images/hero-dark.png")',
            backgroundSize: "cover",
            borderRadius: "10px",
            boxShadow: theme.shadows[3],
          }}
        />
      </Container>
    </Box>
  );
}
