import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { FaPlay } from "react-icons/fa6";
import { MdPlayCircle } from "react-icons/md";
import { addEmbedToSpotifyUrl } from "../../utils/hooks/helper";
import { setSelectedMusic } from "../../store/slice/user";
import { useDispatch } from "react-redux";

function Feature({ data, grid, setOpenPlayer, setOpen, mobile }) {
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        alignItems: !grid && "center",
        gap: ".7rem",
        padding: mobile ? "0.3rem .5rem" : ".5rem .5rem",
        borderRadius: "4px",
        cursor: "pointer",
        position: "relative",
        transition: "background-color 0.3s ease, transform 0.3s ease",
        ":hover": {
          backgroundColor: "rgba(255, 255, 255, 0.16)", // Light grey on hover
        },
        flexDirection: grid && "column",
      }}
      className="image-container"
      onClick={() => {
        const embeddedUrl = addEmbedToSpotifyUrl(data?.external_urls?.spotify);
        setOpenPlayer(true);
        setOpen(false);
        dispatch(setSelectedMusic(embeddedUrl));
      }}
    >
      <Box sx={{ width: grid ? "100%" : "22%", position: "relative" }}>
        <img
          src={data.images[0]?.url}
          width={"100%"}
          height={"100%"}
          className="img"
        />
        {grid ? (
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
        ) : (
          <FaPlay
            size={"20px"}
            color="white"
            opacity={0}
            style={{
              position: "absolute",
              left: 12,
              top: 9,
            }}
            className="play-icon"
          />
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          sx={{
            fontSize: mobile ? "14px" : "16px",
            color: "rgba(255, 255, 255, 0.9)",
            fontWeight: 600,
          }}
        >
          {data.name}
        </Typography>
        {grid ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: mobile ? "12px" : "14px",
                color: "rgba(255, 255, 255, 0.6)",
                fontWeight: 500,
              }}
            >
              {data?.type?.charAt(0).toUpperCase() +
                data?.type?.slice(1).toLowerCase()}
            </Typography>
            <Typography
              sx={{
                fontSize: mobile ? "10px" : "12px",
                color: "rgba(255, 255, 255, 0.6)",
                fontWeight: 500,
              }}
            >
              {`Popularity: ${data?.popularity}`}
            </Typography>
          </Box>
        ) : (
          <Typography
            sx={{
              fontSize: mobile ? "10px" : "12px",
              color: "rgba(255, 255, 255, 0.6)",
              fontWeight: 500,
            }}
          >
            {`Popularity: ${data?.popularity}`}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Feature;

Feature.propTypes = {
  data: PropTypes.object,
  grid: PropTypes.bool,
  setOpenPlayer: PropTypes.func,
  setOpen: PropTypes.func,
  mobile: PropTypes.any,
};
