import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Users from "../pages/Users";
import Auth from "../pages/Auth";
import Search from "../pages/Search";
import Navbar from "../components/Navbar";
import Favorites from "../pages/Favorites";
import Profile from "../pages/Profile";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../pages/MyProfile";
import MoreDetails from "../pages/MoreDetails";

const AppRouter = () => {
  const auth = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
      
        <Route
          path="/auth"
          element={!auth.isAuthorized ? <Auth /> : <Navigate to="/home" />}
        />

        <Route path="/search" element={<Search />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/moreDetails/:id" element={<MoreDetails />} />

        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path="/myProfile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
