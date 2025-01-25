import { Box, LinearProgress, Typography, useMediaQuery } from "@mui/material";
import SideNav from "../component/sidebar/SideNav";
import Main from "../component/main/main";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setInitialState } from "../store/slice/user";
import {
  fetchInitialAlbum,
  fetchInitialPlaylist,
  fetchInitialArtist,
  fetchInitialTrack,
  fetchInitialPodcast,
} from "../utils/api/initial.fetch";

function HomePage() {
  const landing = JSON.parse(localStorage.getItem("firstLanding"));
  const [renderUi, setRenderUi] = useState(null);
  const [loading, setLoading] = useState(() => {
    if (landing === true) {
      return false;
    } else {
      return true;
    }
  });

  const dispatch = useDispatch();

  const [openPlayer, setOpenPlayer] = useState(false);
  const [closeNav, setCloseNav] = useState(false);

  const desktop = useMediaQuery("(max-width: 1100px)");
  const mobile = useMediaQuery("(max-width: 700px)");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!landing) {
      setLoading(true);
    }
    const InitialFetch = async () => {
      try {
        const albums = await fetchInitialAlbum();
        const playlist = await fetchInitialPlaylist();
        const artist = await fetchInitialArtist();
        const track = await fetchInitialTrack();
        const podcast = await fetchInitialPodcast();
        const params = {
          album: albums?.data.data.albums,
          playlist: playlist?.data?.data?.playlists,
          artist: artist?.data?.data?.artists,
          track: track?.data?.data?.tracks,
          podcast: podcast?.data?.data?.podcasts,
        };
        dispatch(setInitialState(params));
        localStorage.setItem("initial", JSON.stringify(params));
      } catch {
        window.alert("Error please refresh the page");
      } finally {
        setTimeout(() => {
          setLoading(false);
          localStorage.setItem("firstLanding", JSON.stringify(true));
        }, 1000);
      }
    };
    InitialFetch();
  }, [dispatch, landing]);

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
            <Typography variant="h1">Symphony</Typography>
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
              backgroundColor: "#121212", // Spotify-like dark background
              height: "100vh", // Full viewport height
              width: "100%", // Full width
              display: "flex",
              color: "#FFFFFF", // White text for contrast
              boxSizing: "border-box",
            }}
          >
            <SideNav
              desktop={desktop}
              open={open}
              setOpen={setOpen}
              setOpenPlayer={setOpenPlayer}
              mobile={mobile}
              closeNav={closeNav}
              setCloseNav={setCloseNav}
            />
            <Main
              desktop={desktop}
              setOpen={setOpen}
              mobile={mobile}
              openPlayer={openPlayer}
              setOpenPlayer={setOpenPlayer}
              closeNav={closeNav}
              setCloseNav={setCloseNav}
            />
          </Box>
        );
      });
    }
  }, [closeNav, desktop, loading, mobile, open, openPlayer]);
  return <>{renderUi}</>;
}

export default HomePage;
