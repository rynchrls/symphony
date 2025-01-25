import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import propTypes from "prop-types";

function Navigation({ setOpen, mobile }) {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const nav = [
    {
      title: "Album",
    },
    {
      title: "Artist",
    },
    {
      title: "Playlist",
    },
    {
      title: "Track",
    },
    {
      title: "Podcast",
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        heigth: "auto",
        display: "flex",
        flexDirection: "column",
        // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)", // Shadow only on the bottom
        padding: "1rem 1rem",
        // zIndex: 2
      }}
    >
      {nav.map((obj, idx) => (
        <Typography
          key={idx}
          sx={{
            fontSize: mobile ? "14px" : "16px",
            fontWeight: "normal",
            cursor: "pointer",
            transition: "background-color 0.3s ease, transform 0.3s ease", // Smooth transition
            ":hover": {
              backgroundColor: "rgba(255, 255, 255, 0.16)", // Light grey on hover (compliments the dark background)
              transition: "background-color 0.3s ease",
            },
            padding: ".7rem",
            borderRadius: "6px",
            letterSpacing: "1px",
            color: "rgba(255, 255, 255, 0.8)",
            backgroundColor:
              pageId &&
              pageId?.charAt(0).toUpperCase() +
                pageId?.slice(1).toLowerCase() ===
                obj.title &&
              "rgba(255, 255, 255, 0.16)",
          }}
          onClick={() => {
            setOpen(false);
            navigate(`/${obj.title?.toLowerCase()}`, { replace: true });
          }}
        >
          {obj.title}
        </Typography>
      ))}
    </Box>
  );
}

export default Navigation;

Navigation.propTypes = {
  setOpen: propTypes.func,
  mobile: propTypes.any,
};
