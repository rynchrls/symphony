import { Box, Drawer } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import Navigation from "./navigation";
import Featured from "./featured";
import propTypes from "prop-types";

function SideNav({
  desktop,
  open,
  setOpen,
  setOpenPlayer,
  mobile,
  setCloseNav,
  closeNav,
}) {
  const toggleDrawer = (open) => {
    setOpen(open);
  };
  return (
    <>
      {desktop ? (
        <Drawer
          anchor="left"
          open={open}
          onClose={() => toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: "230px", // Set the width of the drawer
            },
          }}
        >
          <Box
            sx={{
              width: "230px",
              height: "100%",
              backgroundColor: "#0E0E0E",
              padding: "1rem 0rem 0rem 0rem",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
              transition: "width 0.3s ease, transform 0.3s ease", // Smooth transition
            }}
          >
            <Navigation setOpen={setOpen} mobile={mobile} />
            <Featured
              setOpenPlayer={setOpenPlayer}
              setOpen={setOpen}
              mobile={mobile}
            />
          </Box>
        </Drawer>
      ) : (
        <Box
          sx={{
            width: closeNav ? "0px" : "260px",
            height: "100%",
            backgroundColor: "#0E0E0E",
            padding: "1rem 0rem 0rem 0rem",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            transition: "width 0.3s ease, transform 0.3s ease", // Smooth transition
          }}
        >
          <Box sx={{ padding: "1rem 1rem" }}>
            <GiHamburgerMenu
              size={"24px"}
              color="rgba(255, 255, 255, 0.5)"
              cursor={"pointer"}
              onClick={() => setCloseNav(true)}
            />
          </Box>
          <Navigation setOpen={setOpen} />
          <Featured setOpenPlayer={setOpenPlayer} setOpen={setOpen} />
        </Box>
      )}
    </>
  );
}

export default SideNav;

SideNav.propTypes = {
  desktop: propTypes.any,
  open: propTypes.bool,
  setOpen: propTypes.func,
  setOpenPlayer: propTypes.func,
  mobile: propTypes.any,
  closeNav: propTypes.bool,
  setCloseNav: propTypes.func,
};
