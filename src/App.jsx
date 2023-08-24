import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Routes, Route, Navigate } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import { useUserContext } from "./context/UserContext";
import AccountPage from "./pages/AccountPage";
import PlaceForm from "./components/PlaceForm";
import Accomodation from "./components/Accomodation";
import Profile from "./components/Profile";

function Protected({ user, children }) {
  if (!!user) <Navigate to="/" />;
  return children;
}

function App() {
  const [count, setCount] = useState(0);
  const { user } = useUserContext();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<AccountPage />}>
          <Route path="/account/accomodations" element={<Accomodation />} />
          <Route path="/account/accomodations/new" element={<PlaceForm />} />
          <Route path="/account/accomodations/edit/:id" element={<PlaceForm />} />
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/account/bookings" element={<div>Bookings...</div>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
