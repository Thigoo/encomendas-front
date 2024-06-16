import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import React from "react";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
