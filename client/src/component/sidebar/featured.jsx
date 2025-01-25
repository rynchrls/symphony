import { Box, Popover, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { LuLibrary } from "react-icons/lu";
import { MdOutlineGridView } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import { CiGrid42 } from "react-icons/ci";
import { IoMdCheckmark } from "react-icons/io";
import Feature from "./feature";
import { useSelector } from "react-redux";
import propTypes from "prop-types";

function Featured({ setOpenPlayer, setOpen, mobile }) {
  const artist = useSelector((state) => state.user.artist);
  const [anchorEl, setAnchorEl] = useState(null);
  const [grid, setGrid] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box
      sx={{
        width: "100%",
        flexGrow: 1,
        padding: "0rem .5rem",
        height: "auto",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "6px", // makes the scrollbar thin
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "grey", // sets the scrollbar color to grey
          borderRadius: "10px", // optional: rounds the scrollbar thumb
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent", // removes the background color
          borderRadius: "10px", // optional: rounds the track
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
        }}
      >
        <LuLibrary
          size={mobile ? "18px" : "24px"}
          color="rgba(255, 255, 255, 0.8)"
        />
        <Typography
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: mobile ? "13px" : "15px",
          }}
        >
          Library
        </Typography>
        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: ".3rem",
            fontSize: "15px",
          }}
        >
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: mobile ? "13px" : "15px",
            }}
          >
            View
          </Typography>
          <MdOutlineGridView
            size={mobile ? "18px" : "20px"}
            color="rgba(255, 255, 255, 0.8)"
            onClick={handleClick}
            cursor={"pointer"}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              "& .MuiPopover-paper": {
                backgroundColor: "rgba(73, 73, 73, 0.9)", // Background color of popover
                color: "white", // Text color
                padding: "8px", // Padding inside the popover
                borderRadius: "8px", // Optional rounded corners
                width: "140px",
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "10px",
                fontWeight: "bold",
                color: "rgba(255, 255, 255, 0.6)",
                padding: "8px 0px",
              }}
            >
              View as
            </Typography>
            <Stack
              direction="column" // Flex column layout
              sx={{
                width: "auto",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".5rem",
                  transition: "background-color 0.3s ease, transform 0.3s ease", // Smooth transition
                  ":hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.16)", // Light grey on hover (compliments the dark background)
                    transition: "background-color 0.3s ease",
                  },
                  padding: "8px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onClick={() => setGrid(false)}
              >
                <MdFormatListBulleted color={!grid ? "#008080" : "white"} />
                <Typography
                  sx={{ fontSize: "14px", color: !grid ? "#008080" : "white" }}
                >
                  List
                </Typography>
                <Box sx={{ marginLeft: "auto" }}>
                  <IoMdCheckmark color={!grid ? "#008080" : "white"} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".5rem",
                  transition: "background-color 0.3s ease, transform 0.3s ease", // Smooth transition
                  ":hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.16)", // Light grey on hover (compliments the dark background)
                    transition: "background-color 0.3s ease",
                  },
                  padding: "8px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onClick={() => setGrid(true)}
              >
                <CiGrid42 color={grid ? "#008080" : "white"} />
                <Typography
                  sx={{ fontSize: "14px", color: grid ? "#008080" : "white" }}
                >
                  Grid
                </Typography>
                <Box sx={{ marginLeft: "auto" }}>
                  <IoMdCheckmark color={grid ? "#008080" : "white"} />
                </Box>
              </Box>
            </Stack>
          </Popover>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          padding: mobile ? "1rem 0rem" : "2rem 0rem",
        }}
      >
        {artist &&
          artist?.items?.map((obj, idx) => (
            <Feature
              key={idx}
              data={obj}
              grid={grid}
              setOpenPlayer={setOpenPlayer}
              setOpen={setOpen}
              mobile={mobile}
            />
          ))}
      </Box>
    </Box>
  );
}

export default Featured;

Featured.propTypes = {
  setOpenPlayer: propTypes.func,
  setOpen: propTypes.func,
  mobile: propTypes.any,
};
