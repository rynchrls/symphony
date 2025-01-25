import { Box } from "@mui/material";
import HighLight from "./highlight";
import ForYou from "./foryou";
import AlsoLike from "./alsoLike";
import DynamicPage from "./dynamicPage";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Selected from "./selected";
import SearchPage from "./searchPage";
import propTypes from "prop-types";

function Home({ desktop, mobile, openPlayer, setOpenPlayer }) {
  const { pageId, mId } = useParams();
  const [renderUI, setRenderUI] = useState(null);
  const urlParams = new URLSearchParams(window.location.search); // This gets the query string (e.g., ?id=123&name=abc)
  const search = urlParams.get("q");

  useEffect(() => {
    if (search) {
      setRenderUI(() => {
        return (
          <SearchPage
            search={search}
            pageId={pageId}
            desktop={desktop}
            mobile={mobile}
            setOpenPlayer={setOpenPlayer}
          />
        );
      });
    } else if (pageId && !mId) {
      setRenderUI(() => {
        return (
          <DynamicPage
            id={pageId}
            desktop={desktop}
            mobile={mobile}
            setOpenPlayer={setOpenPlayer}
          />
        );
      });
    } else {
      if (!mId) {
        setRenderUI(() => {
          return (
            <>
              {desktop ? (
                <>
                  <ForYou desktop={desktop} mobile={mobile} />
                  <AlsoLike
                    desktop={desktop}
                    mobile={mobile}
                    setOpenPlayer={setOpenPlayer}
                  />
                  <HighLight desktop={desktop} mobile={mobile} />
                </>
              ) : (
                <>
                  <HighLight desktop={desktop} />
                  <ForYou desktop={desktop} />
                  <AlsoLike desktop={desktop} />
                </>
              )}
            </>
          );
        });
      } else {
        setRenderUI(() => {
          return (
            <Selected
              desktop={desktop}
              mobile={mobile}
              setOpenPlayer={setOpenPlayer}
            />
          );
        });
      }
    }
  }, [desktop, mId, mobile, openPlayer, pageId, search, setOpenPlayer]);
  return (
    <Box
      sx={{
        width: desktop ? "auto" : "65%",
        height: "auto",
        gap: "2rem 0rem",
        display: "flex",
        flexDirection: "column",
        padding: desktop ? "3rem 0rem 0rem 0rem" : "0rem .5rem",
        overflowY: "scroll", // enable scroll, but hide the scrollbar
        "&::-webkit-scrollbar": {
          display: "none", // hide the scrollbar
        },
      }}
    >
      {renderUI}
      {/* <HighLight />
      <ForYou />
      <AlsoLike />
      <DynamicPage /> */}
    </Box>
  );
}

export default Home;

Home.propTypes = {
  desktop: propTypes.any,
  mobile: propTypes.any,
  openPlayer: propTypes.bool,
  setOpenPlayer: propTypes.func,
};
