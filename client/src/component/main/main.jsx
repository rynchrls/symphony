import { Box, LinearProgress, Typography } from "@mui/material";
import MainHeader from "./mainHeader";
import Home from "./home";
import PlayNow from "./playNow";
import propTypes from "prop-types";
import { FaItunesNote } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";

function Main({
  desktop,
  setOpen,
  mobile,
  openPlayer,
  setOpenPlayer,
  closeNav,
  setCloseNav,
}) {
  const selected = useSelector((state) => state.user.selectedMusic);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [selected]);

  // useEffect(() => {
  //   if (loading) {
  //     setRenderUi(() => {
  //       return (
  //         <Drawer
  //           anchor="top"
  //           open={openPlayer}
  //           onClose={() => toggleDrawer(false)}
  //           sx={{
  //             "& .MuiDrawer-paper": {
  //               width: "100%", // Set the width of the drawer
  //               height: "80%",
  //               backgroundColor: "rgb(25, 25, 25)",
  //               color: "#FFFFFF",
  //             },
  //           }}
  //         >
  //           <Box
  //             sx={{
  //               backgroundColor: "#121212", // Spotify-like dark background
  //               height: "100vh", // Full viewport height
  //               width: "100%", // Full width
  //               display: "flex",
  //               flexDirection: "column",
  //               justifyContent: "center",
  //               alignItems: "center",
  //               color: "#FFFFFF", // White text for contrast
  //               boxSizing: "border-box",
  //               gap: "2rem",
  //             }}
  //           >
  //             <Box sx={{ width: "50%" }}>
  //               <LinearProgress
  //                 sx={{
  //                   "& .MuiLinearProgress-bar": {
  //                     backgroundColor: "#008080", // Custom bar color
  //                   },
  //                   backgroundColor: "rgba(0, 128, 128, 0.2)", // Optional: track color
  //                 }}
  //               />
  //             </Box>
  //           </Box>
  //         </Drawer>
  //       );
  //     });
  //   } else {
  //     setRenderUi(() => {
  //       return (
  //         <Drawer
  //           anchor="top"
  //           open={openPlayer}
  //           onClose={() => toggleDrawer(false)}
  //           sx={{
  //             "& .MuiDrawer-paper": {
  //               width: "100%", // Set the width of the drawer
  //               height: "80%",
  //               backgroundColor: "rgb(25, 25, 25)",
  //               color: "#FFFFFF",
  //             },
  //           }}
  //         >
  //           <Box
  //             sx={{
  //               width: "100%",
  //               height: "100%",
  //               padding: "0rem 1rem",
  //               boxSizing: "border-box",
  //             }}
  //           >
  //             <Box
  //               sx={{
  //                 display: "flex",
  //                 alignItems: "center",
  //                 justifyContent: "space-between",
  //                 padding: "20px 0px 24px 0px",
  //               }}
  //             >
  //               <Typography
  //                 variant="h6"
  //                 sx={{ fontSize: "20px", fontWeight: 600 }}
  //               >
  //                 Playing now
  //               </Typography>
  //             </Box>
  //             <Box
  //               sx={{
  //                 width: "100%",
  //                 height: "85%",
  //               }}
  //             >
  //               {selected !== "" ? (
  //                 <iframe
  //                   title="Spotify Embed: Recommendation Playlist "
  //                   src={`${selected && selected}?utm_source=generator&theme=0`}
  //                   width="100%"
  //                   height="100%"
  //                   style={{ minHeight: "360px" }}
  //                   frameBorder="0"
  //                   allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  //                   loading="lazy"
  //                 />
  //               ) : (
  //                 <Box
  //                   sx={{
  //                     height: "100%",
  //                     display: "flex",
  //                     alignItems: "center",
  //                     justifyContent: "center",
  //                     flexDirection: "column",
  //                     gap: "1rem", // Reasonable gap between icon and text
  //                   }}
  //                 >
  //                   <FaItunesNote
  //                     size="64px" // Larger icon size
  //                     color="#008080" // Icon color
  //                   />
  //                   <Typography
  //                     sx={{
  //                       fontSize: "14px", // Smaller text size
  //                       color: "rgba(255, 255, 255, 0.7)", // Transparent white color
  //                       textAlign: "center", // Optional: Center align text
  //                     }}
  //                   >
  //                     Please select music to play.
  //                   </Typography>
  //                 </Box>
  //               )}
  //             </Box>
  //           </Box>
  //         </Drawer>
  //       );
  //     });
  //   }
  // }, [loading, selected]);
  return (
    <Box
      sx={{
        // flexGrow: 1,
        width: "100%",
        padding: desktop ? "0rem .5rem" : closeNav ? "0rem 0rem" : "0rem 1rem",
        height: "100%",
        backgroundColor: "rgb(25, 25, 25)",
        boxSizing: "border-box",
        transition: "width 0.3s ease, transform 0.3s ease",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <MainHeader
          desktop={desktop}
          setOpenSidebar={setOpen}
          setOpenPlayer={setOpenPlayer}
          mobile={mobile}
          closeNav={closeNav}
          setCloseNav={setCloseNav}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: desktop && "column-reverse",
            height: "87%",
          }}
        >
          <Home
            desktop={desktop}
            mobile={mobile}
            openPlayer={openPlayer}
            setOpenPlayer={setOpenPlayer}
          />
          {!desktop && (
            <Box
              sx={{
                flexGrow: 1,
                overflow: "auto",
                overflowY: "scroll", // enable scroll, but hide the scrollbar
                "&::-webkit-scrollbar": {
                  display: "none", // hide the scrollbar
                },
              }}
            >
              <PlayNow desktop={desktop} />
            </Box>
          )}
        </Box>

        {desktop && (
          <>
            {loading ? (
              <Box
                // variant="persistent"
                // anchor="top"
                // open={openPlayer}
                // onClose={() => toggleDrawer(false)}
                sx={{
                  width: "99%",
                  height: "80%",
                  backgroundColor: "rgb(25, 25, 25)",
                  color: "#FFFFFF",
                  opacity: openPlayer ? 1 : 0, // Toggle opacity (visible when openPlayer is true)
                  pointerEvents: openPlayer ? "auto" : "none", // Disable pointer events when not open
                  position: "absolute",
                  top: 1,
                  left: 1,
                  zIndex: 999,
                  transition: "opacity 0.3s ease, pointer-events 0s ease 0.3s", // Add transition for opacity and pointer events
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#121212", // Spotify-like dark background
                    height: "100%", // Full viewport height
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
              </Box>
            ) : (
              <Box
                // variant="persistent"
                // anchor="top"
                // open={openPlayer}
                // onClose={() => toggleDrawer(false)}
                sx={{
                  width: "99%",
                  height: "80%",
                  backgroundColor: "rgb(25, 25, 25)",
                  color: "#FFFFFF",
                  opacity: openPlayer ? 1 : 0, // Toggle opacity (visible when openPlayer is true)
                  pointerEvents: openPlayer ? "auto" : "none", // Disable pointer events when not open
                  position: "absolute",
                  top: 1,
                  left: 1,
                  zIndex: 999,
                  transition: "opacity 0.3s ease, pointer-events 0s ease 0.3s", // Add transition for opacity and pointer events
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    padding: mobile ? "0rem .5rem" : "0rem 1rem",
                    boxSizing: "border-box",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "20px 0px 24px 0px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "20px", fontWeight: 600 }}
                    >
                      Playing now
                    </Typography>
                    <MdCancel
                      onClick={() => setOpenPlayer(false)}
                      size={"32px"}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "85%",
                    }}
                  >
                    {selected !== "" ? (
                      <iframe
                        title="Spotify Embed: Recommendation Playlist "
                        src={`${
                          selected && selected
                        }?utm_source=generator&theme=0`}
                        width="100%"
                        height="100%"
                        style={{ minHeight: "360px" }}
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                      />
                    ) : (
                      <Box
                        sx={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          gap: "1rem", // Reasonable gap between icon and text
                        }}
                      >
                        <FaItunesNote
                          size="64px" // Larger icon size
                          color="#008080" // Icon color
                        />
                        <Typography
                          sx={{
                            fontSize: "14px", // Smaller text size
                            color: "rgba(255, 255, 255, 0.7)", // Transparent white color
                            textAlign: "center", // Optional: Center align text
                          }}
                        >
                          Please select music to play.
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default Main;

Main.propTypes = {
  desktop: propTypes.any,
  setOpen: propTypes.func,
  mobile: propTypes.any,
  openPlayer: propTypes.bool,
  setOpenPlayer: propTypes.func,
  closeNav: propTypes.bool,
  setCloseNav: propTypes.func,
};
