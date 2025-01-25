import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useEffect } from "react";
import { SiSymphony } from "react-icons/si";
import { renderToString } from "react-dom/server";

function App() {
  useEffect(() => {
    // Convert the icon to an SVG string
    const svgString = encodeURIComponent(
      renderToString(
        <SiSymphony style={{ fontSize: "64px", color: "#008080" }} />
      )
    );

    // Create a new favicon using the SVG string
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = `data:image/svg+xml;charset=utf-8,${svgString}`;
    document.head.appendChild(favicon);

    // Clean up the old favicon (optional)
    return () => {
      document.head.removeChild(favicon);
    };
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
