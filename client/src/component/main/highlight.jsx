import { Box, Button, Typography } from "@mui/material";
import { FaPlay } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addEmbedToSpotifyUrl } from "../../utils/hooks/helper";
import { setSelectedMusic } from "../../store/slice/user";
import propTypes from "prop-types";

function HighLight({ desktop, mobile }) {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.user.track);
  const [highlight, setHighLight] = useState({});

  useEffect(() => {
    // Ensure track and items are defined and not empty
    if (track?.items?.length > 0) {
      const randomIndex = Math.floor(Math.random() * track.items.length); // Random index
      const highlightTrack = track.items[randomIndex]; // Select random track
      setHighLight(highlightTrack);
    }
  }, [track?.items]);

  return (
    <Box
      sx={{
        width: "100%",
        height: desktop ? "auto" : "300px",
        boxSizing: "border-box",
        padding: desktop
          ? mobile
            ? "0rem 0rem 2rem"
            : "0rem .5rem 4rem"
          : "0rem 1rem",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: mobile ? "18px" : "40px",
          padding: mobile ? "1.5rem 0rem" : ".5rem 0rem",
        }}
      >
        Highlight
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: desktop ? "auto" : "80%",
          // backgroundColor: "#008080",
          background:
            "linear-gradient(to bottom, #008080 0%, rgba(0, 128, 128, 0.9) 10%, rgba(0, 128, 128, 0.6) 25%, rgba(0, 128, 128, 0.3) 50%, transparent 100%)",
          borderRadius: "24px",
          display: "flex",
          justifyContent: desktop ? "center" : "space-between",
          boxSizing: "border-box",
          padding: mobile ? "0.5rem" : "1rem",
          flexDirection: desktop && "column-reverse",
          gap: desktop ? (mobile ? "1.5rem" : "2.5rem") : "0rem",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: desktop ? ".5rem" : ".2rem",
            alignItems: "flex-start",
          }}
        >
          <Typography
            sx={{ fontSize: desktop ? (mobile ? "14px" : "16px") : "20px" }}
          >
            {highlight?.artists &&
              highlight.artists
                .map((obj) => obj.name)
                .reduce((acc, name, index, array) => {
                  if (index === array.length - 1 && array.length > 1) {
                    // Add 'and' before the last name
                    return `${acc} and ${name}`;
                  }
                  return acc ? `${acc}, ${name}` : name; // Add comma only if acc is not empty
                }, "")}
          </Typography>
          <Typography
            sx={{
              fontSize: desktop ? (mobile ? "20px" : "28px") : "32px",
              fontWeight: "bold",
              flexGrow: desktop && 1,
            }}
          >
            {highlight?.name}
          </Typography>
          <Button
            sx={{
              marginTop: "auto",
              backgroundColor: "white", // Set the button background to white
              color: "black", // Set the text and icon color to black
              borderRadius: "40px", // Add border radius
              padding: mobile ? "10px 16px" : "12px 24px", // Add padding for a better look
              position: "relative", // Ensure the icon can be positioned within the button
              display: "flex", // Flexbox for proper alignment
              alignItems: "center", // Center items vertically
              justifyContent: "center",
              gap: mobile ? "8px" : "12px",
              transition: "background-color 0.3s ease", // Smooth hover transition
              ":hover": {
                backgroundColor: "#f0f0f0", // Light grey on hover
              },
              textTransform: "none", // Prevent text from being uppercase
              pointerEvents: "auto",
            }}
          >
            <FaPlay size={mobile ? "12px" : "14px"} color="black" />
            <Typography
              sx={{
                color: "black", // Ensure the text remains black
                fontSize: mobile ? "10px" : "12px", // Adjust font size
                fontWeight: "bold", // Optional: make the text bold
              }}
              onClick={() => {
                const embeddedUrl = addEmbedToSpotifyUrl(
                  highlight?.external_urls?.spotify
                );
                dispatch(setSelectedMusic(embeddedUrl));
              }}
            >
              Listen Now
            </Typography>
          </Button>
        </Box>
        <img
          src={`${highlight?.album?.images[0]?.url}`}
          width={desktop ? "50%" : "auto"}
          style={{ borderRadius: "16px" }}
        />
      </Box>
    </Box>
  );
}

export default HighLight;

HighLight.propTypes = {
  desktop: propTypes.any,
  mobile: propTypes.any,
};
