import { Box, LinearProgress, Typography } from "@mui/material";
import { MdPlayCircle } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setSelectedMusic } from "../../store/slice/user";
import { addEmbedToSpotifyUrl } from "../../utils/hooks/helper";
import { searchQuery } from "../../utils/api/search";
import propTypes from "prop-types";

function SearchPage({ search, pageId, desktop, mobile, setOpenPlayer }) {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [renderUi, setRenderUi] = useState(null);
  const [content, setContent] = useState([]);

  useEffect(() => {
    setLoading(true);
    try {
      const fetch = async () => {
        const { data } = await searchQuery(
          search,
          pageId === "podcast" ? "show" : pageId
        );
        console.log(data?.data);
        switch (pageId) {
          case "album":
            return setContent(data?.data?.albums?.items);
          case "playlist":
            return setContent(data?.data?.playlists?.items);
          case "artist":
            return setContent(data?.data?.artists?.items);
          case "track":
            return setContent(data?.data?.tracks?.items);
          case "podcast":
            return setContent(data?.data?.shows?.items);
          default:
            return setContent(data?.data?.albums?.items);
        }
      };
      if (search?.length > 5) {
        fetch();
      }
    } catch {
      window.alert("Please try again");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [pageId, search]);

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
              height: "auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Adjusts the number of columns dynamically
              gridAutoRows: "auto", // Automatically adjust row height
              gap: mobile ? "0.5rem" : "1rem", // Optional: add spacing between items
              padding: !mobile && "2rem 0rem",
            }}
          >
            {content?.length > 0 ? (
              content?.map((data, idx) => (
                <Box
                  onClick={() => {
                    const embeddedUrl = addEmbedToSpotifyUrl(
                      data?.external_urls?.spotify
                    );
                    setOpenPlayer(true);
                    dispatch(setSelectedMusic(embeddedUrl));
                    return;
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
                    transition:
                      "background-color 0.3s ease, transform 0.3s ease",
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
                          ? `${data?.album?.images[0]?.url}`
                          : `${data?.images?.[0]?.url}`
                      }
                      alt="No Image attached"
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
                      {truncateText(data?.name)}
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
                        {pageId === "album" && `${data?.total_tracks} songs`}
                        {pageId === undefined && `${data?.total_tracks} songs`}
                        {pageId === "artist" &&
                          `Popularity: ${data?.popularity}`}
                        {pageId === "playlist" &&
                          `${data?.tracks?.total} songs`}
                        {pageId === "track" &&
                          formatDuration(data?.duration_ms)}
                        {pageId === "podcast" &&
                          `${data?.total_episodes} episodes`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography
                variant="h6"
                sx={{ fontSize: "40px", padding: ".5rem 0rem" }}
              >
                No Result
              </Typography>
            )}
          </Box>
        );
      });
    }
  }, [content, dispatch, loading, mobile, pageId, setOpenPlayer]);

  function truncateText(text) {
    const maxLength = 27; // Maximum allowed characters
    if (text?.length > maxLength) {
      return text?.slice(0, maxLength) + "...";
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
          padding: mobile ? "0rem 0rem 0rem 0rem" : ".5rem 0rem",
        }}
      >
        Results
      </Typography>
      {renderUi}
    </Box>
  );
}

export default SearchPage;

SearchPage.propTypes = {
  search: propTypes.string,
  pageId: propTypes.string,
  desktop: propTypes.any,
  mobile: propTypes.any,
  setOpenPlayer: propTypes.func,
};
