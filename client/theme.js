import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif", // Using a clean and modern font for the main text
    h1: {
      fontFamily: "'Montserrat', sans-serif", // Bold and attention-grabbing for headings
      fontWeight: 700,
      letterSpacing: "0.5px", // Add a little letter spacing for style
    },
    h2: {
      fontFamily: "'Montserrat', sans-serif", // Bold style for secondary headings
      fontWeight: 600,
    },
    body1: {
      fontFamily: "'Roboto', sans-serif", // Clean and readable for body text
      fontWeight: 400,
      lineHeight: 1.5, // Make the body text more readable
    },
    button: {
      fontFamily: "'Poppins', sans-serif", // For buttons, a slightly more unique and stylish font
      fontWeight: 500,
      textTransform: "none", // Avoid the default uppercase transformation
    },
    subtitle1: {
      fontFamily: "'Poppins', sans-serif", // For smaller text like subtitles
      fontWeight: 300,
      fontSize: "1rem", // Slightly smaller for subtitles
    },
  },
});

export default theme;
