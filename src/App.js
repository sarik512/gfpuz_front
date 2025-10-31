import { Box } from "@mui/material";
import Routers from "./Components/Routers/Routers";
import Navigation from "./Components/Main/Navigation/Navigation";
import Footer from "./Components/Footer/Footer";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "ru");
    }
  }, []);
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Navigation />
      <Box
        sx={{
          maxWidth: "2200px",
          margin: "auto",
        }}
      >
        <Routers />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
