import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import React, { useEffect, useState } from "react";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "./config/theme";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <AppRouter isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
          <ToastContainer />
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
