import { Box, Typography } from "@mui/material";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../App.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { useState } from "react";
import { MdPlayCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import propTypes from "prop-types";

function ForYou({ desktop, mobile }) {
  const playlist = useSelector((state) => state.user.playlist);
  const validItems = playlist?.items?.filter(
    (item) => item !== null && item !== undefined
  ); // Remove null and undefined
  const extractedItems = validItems?.slice(0, 5);

  const navigate = useNavigate();
  const [, setSwiperRef] = useState(null);

  function truncateText(text) {
    const maxLength = 28; // Maximum allowed characters
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text; // Return the text as is if it's within the limit
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
          Playlist for you
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: mobile ? "12px" : "14px",
            color: "rgba(255, 255, 255, 0.6)",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/playlist`, { replace: true })}
        >
          View all
        </Typography>
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {sampleData.map((obj, idx) => (
          <Box
            key={idx}
            sx={{
              height: "150px",
              width: "200px",
              backgroundColor: "greenyellow",
            }}
          ></Box>
        ))}
      </Box> */}
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={desktop ? 2.5 : 3.5} // Display 3.5 slides at once
        centeredSlides={false} // Align slides to the left side
        spaceBetween={desktop ? 0 : 1} // Adjust the space between slides
        pagination={false} // Disable pagination
        navigation={true} // Enable navigation buttons
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {playlist &&
          extractedItems?.map((obj, idx) => (
            <SwiperSlide key={idx}>
              <Box
                sx={{
                  padding: mobile ? "4px" : "12px",
                  borderRadius: "6px",
                  transition: "background-color 0.3s ease, transform 0.3s ease", // Smooth transition
                  ":hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.16)", // Light grey on hover (compliments the dark background)
                    transition: "background-color 0.3s ease",
                    position: "relative",
                  },
                }}
                className="image-container"
                onClick={() => navigate(`/playlist/selected/?href=${obj.href}`)}
              >
                <img
                  src={`${obj.images[0]?.url}`}
                  style={{ borderRadius: "8px" }}
                />
                <Typography
                  textAlign={"left"}
                  marginTop={"12px"}
                  color="rgba(255, 255, 255, 0.8)"
                  fontSize={mobile ? "13px" : "14px"}
                >
                  {truncateText(obj.name)}
                  <Typography
                    fontSize={mobile ? "11px" : "13px"}
                  >{`${obj.tracks.total} songs`}</Typography>
                </Typography>
                <MdPlayCircle
                  size={"48px"}
                  color="#008080"
                  opacity={0}
                  style={{
                    position: "absolute",
                    bottom: 70,
                    right: 20,
                  }}
                  className="play-icon"
                />
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
}

export default ForYou;

ForYou.propTypes = {
  desktop: propTypes.any,
  mobile: propTypes.any,
};
