import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Users from "../pages/Users";
import Auth from "../pages/Auth";
import Search from "../pages/Search";
import Navbar from "../components/Navbar";
import Favorites from "../pages/Favorites";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
