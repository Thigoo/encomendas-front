import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "../pages/RegisterPage";
import Home from "../pages/Home";

interface AppRouterProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const AppRouter: React.FC<AppRouterProps> = ({
  isDarkMode,
  toggleDarkMode,
}) => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute
            element={
              <Home isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            }
          />
        }
      />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRouter;
