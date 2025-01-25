import { Box, Typography } from "@mui/material";
import { MdPlayCircle } from "react-icons/md";
import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setSelectedMusic } from "../../store/slice/user";
import { addEmbedToSpotifyUrl } from "../../utils/hooks/helper";

function DynamicPage({ id, desktop, mobile, setOpenPlayer }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const content = useSelector((state) => {
    const user = state.user;
    switch (id) {
      case "album":
        return user.album;
      case "playlist":
        return user.playlist;
      case "artist":
        return user.artist;
      case "track":
        return user.track;
      case "podcast":
        return user.podcast;
      default:
        break;
    }
  });

  useEffect(() => {
    if (scrollRef?.current) {
      scrollRef?.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [id]);

  const dynamicContent = content?.items?.filter(
    (item) => item !== null && item !== undefined
  );

  function truncateText(text, desktop) {
    const maxLength = desktop ? 40 : 27; // Maximum allowed characters
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text; // Return the text as is if it's within the limit
  }
  function formatDuration(durationMs) {
    const minutes = Math.floor(durationMs / 60000); // Calculate total minutes
    const seconds = Math.floor((durationMs % 60000) / 1000); // Calculate remaining seconds

    // Format seconds to always have two digits
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  return (
    <Box
      ref={scrollRef}
      sx={{
        width: "100%",
        height: desktop ? "auto" : "300px",
        boxSizing: "border-box",
        padding: !mobile && "0rem 1rem",
        transition: "all 0.3s ease, transform 0.3s ease", // Smooth transition
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: mobile ? "32px" : "40px",
          padding: mobile ? "3rem 0rem 0rem 0rem" : ".5rem 0rem",
        }}
      >
        {id?.charAt(0).toUpperCase() + id?.slice(1).toLowerCase()}
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Adjusts the number of columns dynamically
          gridAutoRows: "auto", // Automatically adjust row height
          gap: mobile ? "0.5rem" : "1rem", // Optional: add spacing between items
          padding: "2rem 0rem",
        }}
      >
        {content &&
          dynamicContent?.map((data, idx) => (
            <Box
              onClick={() => {
                if (id === "album" || id === "playlist" || id === "podcast") {
                  navigate(`/${id}/selected/?href=${data?.href}`);
                } else {
                  const embeddedUrl = addEmbedToSpotifyUrl(
                    data?.external_urls?.spotify
                  );
                  setOpenPlayer(true);
                  dispatch(setSelectedMusic(embeddedUrl));
                  return;
                }
              }}
              key={idx}
              sx={{
                width: "100%",
                height: "auto",
                display: "flex",
                gap: ".7rem",
                padding: ".5rem .5rem",
                borderRadius: "4px",
                cursor: "pointer",
                position: "relative",
                transition: "background-color 0.3s ease, transform 0.3s ease",
                ":hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.16)", // Light grey on hover
                },
                flexDirection: "column",
              }}
              className="image-container"
            >
              <Box sx={{ width: "100%", position: "relative" }}>
                <img
                  src={
                    data?.album?.images?.[0]?.url
                      ? `${data.album.images[0].url}`
                      : `${data?.images?.[0].url}`
                  }
                  width="100%"
                  height="240px"
                  className="img"
                />

                <MdPlayCircle
                  size={"48px"}
                  color="#008080"
                  opacity={0}
                  style={{
                    position: "absolute",
                    left: 10,
                    top: 10,
                  }}
                  className="play-icon"
                />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontWeight: 600,
                  }}
                >
                  {truncateText(data?.name, desktop)}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "rgba(255, 255, 255, 0.6)",
                      fontWeight: 500,
                    }}
                  >
                    {id === "album" && `${data?.total_tracks} songs`}
                    {id === "artist" && `Popularity: ${data?.popularity}`}
                    {id === "playlist" && `${data?.tracks?.total} songs`}
                    {id === "track" && formatDuration(data?.duration_ms)}
                    {id === "podcast" && `${data?.total_episodes} episodes`}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        {/* <Typography sx={{ marginTop: "auto", cursor: "pointer" }}>
          Load more
        </Typography> */}
      </Box>
    </Box>
  );
}

export default DynamicPage;

DynamicPage.propTypes = {
  id: propTypes.string,
  desktop: propTypes.any,
  mobile: propTypes.any,
  setOpenPlayer: propTypes.func,
};
