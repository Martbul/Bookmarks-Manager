import { alpha, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link } from 'react-router-dom';
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Grid from '@mui/material/Grid';

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
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: "clamp(3.5rem, 8vw, 4rem)",
            color: theme.palette.mode === "light"
              ? theme.palette.primary.main
              : theme.palette.primary.light,
            fontWeight: 700,
            marginBottom: theme.spacing(2),
          }}
        >
          Your all bookmarks&nbsp;
          <Typography
            component="span"
            variant="h1"
            sx={{
              fontSize: "clamp(3rem, 8vw, 4rem)",
              fontWeight: 700,
              color: theme.palette.mode === "light"
                ? theme.palette.secondary.main
                : theme.palette.secondary.light,
            }}
          >
            at the same place
          </Typography>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            width: { xs: "100%", sm: "70%" },
            color: theme.palette.text.secondary,
            marginBottom: theme.spacing(3),
          }}
        >
          Explore our cutting-edge dashboard, delivering high-quality solutions tailored to your needs. Elevate your experience with top-tier features and services.
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ marginBottom: theme.spacing(3) }}
        >
          <Link to='/register' style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderRadius: 8,
                padding: `${theme.spacing(1.5)} ${theme.spacing(4)}`,
                textTransform: "none",
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.8),
                },
              }}
            >
              Sign Up
            </Button>
          </Link>
          <Link to='/bookmarks' style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<CheckCircleIcon />}
              sx={{
                borderRadius: 8,
                padding: `${theme.spacing(1.5)} ${theme.spacing(4)}`,
                textTransform: "none",
                fontWeight: 700,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              Dashboard
            </Button>
          </Link>
        </Stack>
        <TextField
          id="outlined-basic"
          hiddenLabel
          size="small"
          variant="outlined"
          placeholder="Your email address"
          sx={{
            width: { xs: "100%", sm: "auto" },
            marginBottom: theme.spacing(2),
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
              background: theme.palette.background.paper,
            },
            "& .MuiOutlinedInput-input": {
              padding: "14px 20px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: alpha(theme.palette.divider, 0.23),
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: alpha(theme.palette.divider, 0.6),
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<EmailIcon />}
          sx={{
            borderRadius: 8,
            padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
            textTransform: "none",
            marginTop: theme.spacing(2),
            "&:hover": {
              backgroundColor: alpha(theme.palette.secondary.main, 0.8),
            },
          }}
        >
          Start Now
        </Button>
        <Typography
          variant="caption"
          sx={{ opacity: 0.8, marginBottom: theme.spacing(4), marginTop: theme.spacing(1) }}
        >
          By clicking `Start now` you agree to our&nbsp;
          <Link to="/terms" style={{ color: theme.palette.primary.main }}>
            Terms & Conditions
          </Link>
        </Typography>
        <IconButton
          color="primary"
          aria-label="play demo video"
          sx={{ marginBottom: theme.spacing(4) }}
        >
          <PlayCircleOutlineIcon sx={{ fontSize: 50 }} />
        </IconButton>
        <Box
          id="image"
          sx={{
            marginTop: theme.spacing(8),
            width: "100%",
            height: { xs: 200, sm: 400 },
            backgroundImage:
              theme.palette.mode === "light"
                ? 'url("/static/images/templates/templates-images/hero-light.png")'
                : 'url("/static/images/templates/templates-images/hero-dark.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
            boxShadow: theme.shadows[3],
          }}
        />
        <Grid container spacing={4} sx={{ marginTop: theme.spacing(6) }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: "center", padding: theme.spacing(2) }}>
              <CheckCircleIcon color="primary" sx={{ fontSize: 40, marginBottom: theme.spacing(1) }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Feature One
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description of feature one that highlights its benefits and usability.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: "center", padding: theme.spacing(2) }}>
              <CheckCircleIcon color="primary" sx={{ fontSize: 40, marginBottom: theme.spacing(1) }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Feature Two
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description of feature two that highlights its benefits and usability.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: "center", padding: theme.spacing(2) }}>
              <CheckCircleIcon color="primary" sx={{ fontSize: 40, marginBottom: theme.spacing(1) }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Feature Three
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description of feature three that highlights its benefits and usability.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
