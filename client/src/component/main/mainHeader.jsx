import {
  Box,
  Button,
  CircularProgress,
  Input,
  InputAdornment,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { SiSymphony } from "react-icons/si";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmbedToSpotifyUrl } from "../../utils/hooks/helper";
import { setSelectedMusic } from "../../store/slice/user";
import propTypes from "prop-types";
import { GiHamburgerMenu } from "react-icons/gi";

function MainHeader({
  desktop,
  setOpenSidebar,
  setOpenPlayer,
  mobile,
  closeNav,
  setCloseNav,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [state, setState] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: mobile ? "250px" : "400px",
    bgcolor: "#121212", // Dark background
    color: "#ffffff", // White text
    boxShadow: 24,
    p: mobile ? 2 : 4,
    borderRadius: "8px", // Rounded corners
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsLoading(false);
    setIsSuccess(false);
    setText("");
  };

  const handleImport = () => {
    if (text === "") return;

    if (isValidSpotifyLink(text)) {
      setIsLoading(true);
      setIsSuccess(false);
      const embeddedUrl = addEmbedToSpotifyUrl(text);
      dispatch(setSelectedMusic(embeddedUrl));
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        setOpenPlayer(true);
        setOpen(false);
      }, 2000);
    } else {
      setState((prev) => {
        return { ...prev, open: true };
      });
    }
  };

  function isValidSpotifyLink(link) {
    const regex =
      /https:\/\/open\.spotify\.com\/(playlist|track|album|artist|show)\/[a-zA-Z0-9]+/;
    return regex.test(link);
  }

  const handleChange = (event) => {
    // Get the current URL
    const currentUrl = window.location.href;
    const url = new URL(currentUrl); // Create a URL object
    const params = new URLSearchParams(url.search); // Extract query parameters

    // Update or add the `q` parameter
    params.set("q", event.target.value);

    // Navigate to the new URL with the updated query string
    navigate(`${url.pathname}?${params.toString()}`, { replace: true });
    setValue(event.target.value); // Update the state with the input value
  };

  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState(false);
  };

  const toggleDrawer = () => {
    setOpenPlayer(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        padding: desktop ? "0.5rem 0rem" : "1rem 1rem",
        gap: "1rem",
      }}
    >
      {desktop && (
        <button className="slanted-button" onClick={toggleDrawer}>
          Open Music Player
        </button>
      )}
      {desktop && (
        <Box
          sx={{ padding: !desktop && "0rem 1rem" }}
          onClick={() => setOpenSidebar(true)}
        >
          <GiHamburgerMenu
            size={"24px"}
            color="rgba(255, 255, 255, 0.5)"
            cursor={"pointer"}
          />
        </Box>
      )}
      {closeNav && (
        <Box
          sx={{ padding: !desktop && "0rem 1rem" }}
          onClick={() => setCloseNav(false)}
        >
          <GiHamburgerMenu
            size={"24px"}
            color="rgba(255, 255, 255, 0.5)"
            cursor={"pointer"}
          />
        </Box>
      )}
      <Box sx={{ width: desktop ? "58%" : "65%" }}>
        <Input
          value={value} // Bind the state
          onChange={handleChange} // Update the state on input change
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <CiSearch
                style={{ color: "rgba(255, 255, 255, 0.8)" }}
                size={mobile ? "20px" : "24px"}
              />
            </InputAdornment>
          }
          disableUnderline
          sx={{
            width: "100%",
            color: "white",
            fontSize: mobile && "14px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.6)",
            padding: mobile ? "0.2rem" : "0.5rem 0",
            "&:hover": {
              borderBottom: "1px solid white",
            },
            "&.Mui-focused": {
              borderBottom: "1px solid white",
            },
            "& input": {
              color: "white",
            },
            "&::placeholder": {
              color: "rgba(255, 255, 255, 0.6)",
            },
          }}
        />
      </Box>
      <Button
        onClick={handleOpen}
        sx={{
          backgroundColor: "#ffffff",
          color: "black",
          borderRadius: "24px",
          padding: desktop ? "0.3rem .7rem " : "0.5rem 1rem",
          fontWeight: "bold",
          textTransform: "none",
          fontSize: mobile ? "8px" : "12px",
          transition: "background-color 0.3s ease",
          ":hover": {
            backgroundColor: "#f0f0f0",
          },
          marginLeft: !mobile && "auto",
        }}
      >
        Import Playlist
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component={mobile ? "h3" : "h2"}
            sx={{
              fontWeight: "bold",
              mb: mobile ? 1 : 2,
              fontSize: mobile && "14px",
            }}
          >
            Import playlist from Spotify
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mb: mobile ? 2 : 3,
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: mobile && "12px",
            }}
          >
            Paste the Spotify playlist link below to import your favorite songs.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Playlist link"
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
              InputProps={{
                style: {
                  color: "#ffffff",
                  backgroundColor: "#1e1e1e",
                  borderRadius: "4px",
                  fontSize: mobile && "12px",
                },
              }}
            />
            <Button
              onClick={handleImport}
              variant="contained"
              sx={{
                backgroundColor: "#e0e0e0",
                color: "#000000",
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "4px",
                px: mobile ? 2 : 3,
                height: mobile ? "48px" : "56px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ":hover": {
                  backgroundColor: "#d6d6d6",
                },
              }}
            >
              {isLoading ? (
                <CircularProgress
                  size={mobile ? 16 : 24}
                  sx={{ color: "#4d4d4d" }}
                />
              ) : isSuccess ? (
                "Imported!"
              ) : (
                "Import"
              )}
            </Button>
          </Box>
        </Box>
      </Modal>

      <SiSymphony
        size={mobile ? "40px" : "48px"}
        color="#008080"
        onClick={() => navigate(`/`, { replace: "true" })}
        cursor={"pointer"}
      />
      <Snackbar
        open={state}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={2000}
        onClose={handleClose1}
        message="Your link is not from spotify"
      />
    </Box>
  );
}

export default MainHeader;

MainHeader.propTypes = {
  desktop: propTypes.any,
  setOpenSidebar: propTypes.func,
  setOpenPlayer: propTypes.func,
  mobile: propTypes.any,
  closeNav: propTypes.bool,
  setCloseNav: propTypes.func,
};
