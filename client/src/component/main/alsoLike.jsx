import { Box, Typography } from "@mui/material";
import { MdPlayCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEmbedToSpotifyUrl } from "../../utils/hooks/helper";
import { setSelectedMusic } from "../../store/slice/user";
import propTypes from "prop-types";

function AlsoLike({ desktop, mobile, setOpenPlayer }) {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.user.track);
  const validItems = track?.items?.filter(
    (item) => item !== null && item !== undefined
  ); // Remove null and undefined
  const extractedItems = validItems?.slice(0, 6);

  const navigate = useNavigate();

  function formatDuration(durationMs) {
    const minutes = Math.floor(durationMs / 60000); // Calculate total minutes
    const seconds = Math.floor((durationMs % 60000) / 1000); // Calculate remaining seconds

    // Format seconds to always have two digits
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        boxSizing: "border-box",
        padding: mobile ? "0rem 0rem" : "0rem 1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: mobile ? "12px" : "24px",
        }}
      >
        <Typography variant="h6" sx={{ fontSize: mobile ? "18px" : "24px" }}>
          You may also like
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: mobile ? "12px" : "14px",
            color: "rgba(255, 255, 255, 0.6)",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/track`, { replace: true })}
        >
          View all
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: desktop ? "repeat(1, 1fr)" : "repeat(2, 1fr)", // Two columns
          gap: 0, // Space between grid items
        }}
      >
        {track &&
          extractedItems?.map((obj, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                alignItems: "flex-end",
                width: "100%",
                height: "auto",
                gap: mobile ? 1 : 1.5,
                cursor: "pointer",
                padding: mobile ? "6px" : "8px",
                borderRadius: "6px",
                transition: "background-color 0.3s ease, transform 0.3s ease", // Smooth transition
                ":hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.16)", // Light grey on hover (compliments the dark background)
                  transition: "background-color 0.3s ease",
                },
                position: "relative",
              }}
              className="image-container"
              onClick={() => {
                const embeddedUrl = addEmbedToSpotifyUrl(
                  obj?.external_urls?.spotify
                );
                setOpenPlayer(true);
                dispatch(setSelectedMusic(embeddedUrl));
              }}
            >
              <img
                src={`${obj.album.images[0].url}`}
                width={"60px"}
                style={{ borderRadius: "8px" }}
              />
              <Box sx={{ alignSelf: "flex-start" }}>
                <Typography
                  sx={{
                    fontSize: mobile ? "13px" : "15px",
                    fontWeight: 600,
                    color: "rgba(255,255,255, 1)",
                  }}
                  color="rgba(255, 255, 255, 0.8)"
                  fontSize={"14px"}
                >
                  {obj.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: mobile ? "11px" : "13px",
                    fontWeight: 500,
                    color: "rgba(255,255,255, 1)",
                  }}
                >
                  {obj.artists[0].name}
                </Typography>
              </Box>
              <Typography
                sx={{
                  alignSelf: "center",
                  marginLeft: "auto",
                  fontSize: mobile ? "11px" : "13px",
                }}
              >
                {formatDuration(obj.duration_ms)}
              </Typography>
              <MdPlayCircle
                size={"32px"}
                color="#008080"
                opacity={0}
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                }}
                className="play-icon"
              />
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default AlsoLike;

AlsoLike.propTypes = {
  desktop: propTypes.any,
  mobile: propTypes.any,
  setOpenPlayer: propTypes.func,
};
