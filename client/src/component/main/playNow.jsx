import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaItunesNote } from "react-icons/fa6";
import propTypes from "prop-types";

function PlayNow() {
  const [renderUi, setRenderUi] = useState(null);
  const [loading, setLoading] = useState(true);
  const selected = useSelector((state) => state.user.selectedMusic);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [selected]);

  useEffect(() => {
    if (loading) {
      setRenderUi(() => {
        return (
          <Box
            sx={{
              backgroundColor: "#121212", // Spotify-like dark background
              height: "100vh", // Full viewport height
              width: "100%", // Full width
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#FFFFFF", // White text for contrast
              boxSizing: "border-box",
              gap: "2rem",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <LinearProgress
                sx={{
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#008080", // Custom bar color
                  },
                  backgroundColor: "rgba(0, 128, 128, 0.2)", // Optional: track color
                }}
              />
            </Box>
          </Box>
        );
      });
    } else {
      setRenderUi(() => {
        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              padding: "0rem .5rem",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 0px 24px 0px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontSize: "20px", fontWeight: 600 }}
              >
                Playing now
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "85%",
              }}
            >
              {selected !== "" ? (
                <iframe
                  title="Spotify Embed: Recommendation Playlist "
                  src={`${selected && selected}?utm_source=generator&theme=0`}
                  width="100%"
                  height="100%"
                  style={{ minHeight: "360px" }}
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "1rem", // Reasonable gap between icon and text
                  }}
                >
                  <FaItunesNote
                    size="64px" // Larger icon size
                    color="#008080" // Icon color
                  />
                  <Typography
                    sx={{
                      fontSize: "14px", // Smaller text size
                      color: "rgba(255, 255, 255, 0.7)", // Transparent white color
                      textAlign: "center", // Optional: Center align text
                    }}
                  >
                    Please select music to play.
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        );
      });
    }
  }, [loading, selected]);

  return <>{renderUi}</>;
}

export default PlayNow;

PlayNow.propTypes = {
  desktop: propTypes.any,
  setOpenSidebar: propTypes.func,
};
