import React from "react";
import { MiniDrawer } from "../../components/SideBar";

interface HomeProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Home: React.FC<HomeProps> = ({isDarkMode, toggleDarkMode}) => {
  return <MiniDrawer isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>;
};

export default Home;
