import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import React from "react";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <AppRouter />
          <ToastContainer />
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
