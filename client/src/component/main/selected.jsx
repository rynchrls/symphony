import { Box, Button, LinearProgress, Typography } from "@mui/material";
// import { MdPlayCircle } from "react-icons/md";
import { useEffect, useState } from "react";
import { selected } from "../../utils/api/selected";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEmbedToSpotifyUrl } from "../../utils/hooks/helper";
import { setSelectedMusic } from "../../store/slice/user";
import propTypes from "prop-types";

function Selected({ desktop, mobile, setOpenPlayer }) {
  const dispatch = useDispatch();
  const { pageId } = useParams();
  const urlParams = new URLSearchParams(window.location.search); // This gets the query string (e.g., ?id=123&name=abc)
  const href = urlParams.get("href"); // Get the value of the 'id' parameter

  const [fetch, setFetch] = useState(null);

  const [renderUi, setRenderUI] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (href !== null) {
        const get = async () => {
          const { data } = await selected(href);
          if (data.message === "successful") {
            setFetch(data?.data);
          } else {
            console.log("error");
          }
        };
        get();
      }
    } catch {
      window.alert("Error please refresh the page");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [href]);

  const [background, setBackground] = useState("");

  // Function to generate a random primary color
  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Function to generate the gradient
  const generateGradient = () => {
    const primaryColor = generateRandomColor();
    return `linear-gradient(to bottom, ${primaryColor} 0%, rgba(${primaryColor.slice(
      4,
      -1
    )}, 0.9) 10%, rgba(${primaryColor.slice(
      4,
      -1
    )}, 0.6) 25%, rgba(${primaryColor.slice(
      4,
      -1
    )}, 0.3) 50%, transparent 100%)`;
  };

  // Update the gradient on mount or re-render
  useEffect(() => {
    setBackground(generateGradient());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty

  function formatDuration(durationMs) {
    const minutes = Math.floor(durationMs / 60000); // Calculate total minutes
    const seconds = Math.floor((durationMs % 60000) / 1000); // Calculate remaining seconds

    // Format seconds to always have two digits
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  useEffect(() => {
    if (loading) {
      setRenderUI(() => {
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
      setRenderUI(() => {
        return (
          <Box
            sx={{
              width: "100%",
              height: desktop ? "auto" : "500px", // Adjusts to content height
              boxSizing: "border-box",
              padding: mobile ? "0rem 0.5rem" : "0rem 1rem",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              transition: "all 0.3s ease, transform 0.3s ease", // Smooth transition
              background: background,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: "2rem",
                padding: desktop
                  ? mobile
                    ? "0.5rem 0rem 1rem 0rem"
                    : "1rem 0rem 2rem 0rem"
                  : "1rem 0rem 3rem 0rem",
                flexDirection: desktop && "column",
              }}
            >
              <img
                src={`${fetch?.images[0].url}`}
                width={desktop ? "50%" : "35%"}
                style={{ borderRadius: "8px" }}
              />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: desktop ? "1rem" : ".5rem",
                  alignItems: "flex-start",
                }}
              >
                {fetch?.artists && (
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "16px",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {fetch?.artists &&
                      fetch?.artists
                        .map((obj) => obj.name)
                        .reduce((acc, name, index, array) => {
                          if (index === array.length - 1 && array.length > 1) {
                            // Add 'and' before the last name
                            return `${acc} and ${name}`;
                          }
                          return acc ? `${acc}, ${name}` : name; // Add comma only if acc is not empty
                        }, "")}
                  </Typography>
                )}
                <Typography variant="h5" fontWeight={900}>
                  {fetch?.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 400,
                    paddingTop: ".5rem",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  {fetch?.label || fetch?.description}
                </Typography>
                <Button
                  sx={{
                    marginTop: !desktop && "auto",
                    backgroundColor: "white",
                    color: "black",
                    padding: desktop ? ".4rem 1.7rem" : ".7rem 2.5rem",
                    borderRadius: "32px",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    fontSize: desktop ? "14px" : "16px",
                  }}
                  onClick={() => {
                    const embeddedUrl = addEmbedToSpotifyUrl(
                      fetch?.external_urls?.spotify
                    );
                    dispatch(setSelectedMusic(embeddedUrl));
                  }}
                >
                  Listen
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)", // Two columns
                gap: 0, // Space between grid items
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  width: "100%",
                  height: "auto",
                  gap: desktop ? 1 : 1.5,
                  padding: desktop ? ".5rem" : "1rem",
                  borderRadius: "6px",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    alignSelf: "flex-start",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    width: "42%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: 400,
                      color: "rgba(255,255,255, 0.8)",
                      width: "5%",
                    }}
                    color="rgba(255, 255, 255, 0.8)"
                  ></Typography>
                  <Typography
                    sx={{
                      fontSize: desktop ? "12px" : "13px",
                      fontWeight: 400,
                      color: "rgba(255,255,255, 0.8)",
                    }}
                  >
                    Name
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    alignSelf: "center",
                    marginLeft: "auto",
                    fontSize: desktop ? "12px" : "13px",
                    color: "rgba(255,255,255, 0.8)",
                    width: "30%",
                    textAlign: "end",
                  }}
                >
                  Duration
                </Typography>
              </Box>
              {fetch &&
                (fetch.tracks?.items || fetch?.episodes?.items)?.map(
                  (obj, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        height: "auto",
                        cursor: "pointer",
                        padding: desktop ? ".5rem" : "1rem",
                        borderRadius: "6px",
                        transition:
                          "background-color 0.3s ease, transform 0.3s ease", // Smooth transition
                        ":hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.16)", // Light grey on hover (compliments the dark background)
                          transition: "background-color 0.3s ease",
                        },
                        position: "relative",
                      }}
                      className="image-container"
                      onClick={() => {
                        if (pageId === "playlist") {
                          const embeddedUrl = addEmbedToSpotifyUrl(
                            obj?.track?.external_urls?.spotify
                          );
                          setOpenPlayer(true);
                          dispatch(setSelectedMusic(embeddedUrl));
                        } else {
                          const embeddedUrl = addEmbedToSpotifyUrl(
                            obj?.external_urls?.spotify
                          );
                          setOpenPlayer(true);
                          dispatch(setSelectedMusic(embeddedUrl));
                        }
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: 400,
                          color: "rgba(255,255,255, 0.8)",
                          width: "auto",
                          paddingRight: "6px",
                        }}
                        color="rgba(255, 255, 255, 0.8)"
                      >
                        {`${idx + 1}.`}
                      </Typography>
                      <Box
                        sx={{
                          alignSelf: "flex-start",
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          width: pageId === "playlist" ? "35%" : "auto",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: desktop ? "12px" : "15px",
                            fontWeight: 600,
                            color: "rgba(255,255,255, 0.8)",
                          }}
                        >
                          {pageId === "album" && obj?.name}
                          {pageId === "playlist" && obj?.track?.name}
                          {pageId === "podcast" && obj?.name}
                        </Typography>
                        {/* <MdPlayCircle
                          size={"22px"}
                          color="#008080"
                          opacity={0}
                          style={{
                            position: "absolute",
                            top: 8,
                            left: 4,
                          }}
                          className="play-icon"
                        /> */}
                      </Box>
                      <Typography
                        sx={{
                          alignSelf: "center",
                          marginLeft: "auto",
                          fontSize: desktop ? "12px" : "13px",
                          color: "rgba(255,255,255, 0.8)",
                          width: "30%",
                          textAlign: "end",
                        }}
                      >
                        {pageId === "album" && formatDuration(obj?.duration_ms)}
                        {pageId === "playlist" &&
                          formatDuration(obj?.track?.duration_ms)}
                        {pageId === "podcast" &&
                          formatDuration(obj?.duration_ms)}
                      </Typography>
                    </Box>
                  )
                )}
            </Box>
          </Box>
        );
      });
    }
  }, [background, desktop, dispatch, fetch, loading, mobile, pageId, setOpenPlayer]);

  return <>{renderUi}</>;
}

export default Selected;

Selected.propTypes = {
  desktop: propTypes.any,
  mobile: propTypes.any,
  setOpenPlayer: propTypes.func,
};
