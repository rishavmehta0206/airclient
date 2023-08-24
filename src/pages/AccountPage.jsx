import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BiBuildingHouse } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import Accomodation from "../components/Accomodation";
import Profile from "../components/Profile";
import { Outlet } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  let selection = location.pathname.split("account");
  console.log(selection);

  if (!user) {
    return <Navigate to="/" />;
  }
  let content;
  if (selection === "profile") {
    content = <Profile />;
  }
  if (selection === "accomodations") {
    content = <Accomodation />;
  }
  return (
    <div>
      <nav className="w-full flex mt-8 justify-center gap-2">
        <span
          className={`p-2 px-6 flex items-center gap-2  ${
            selection[1].includes("profile") && "bg-red-500 text-white"
          } rounded-full`}
          onClick={() => navigate("/account/profile")}
        >
          <BiUser />
          My Profile
        </span>
        <span
          className={`p-2 px-6 flex items-center gap-2  ${
            selection[1].includes("bookings") && "bg-red-500 text-white"
          } rounded-full`}
          onClick={() => navigate("/account/bookings")}
        >
          <FaClipboardList />
          My Bookings
        </span>
        <span
          className={`p-2 px-6 flex items-center gap-2  ${
            selection[1].includes("accomodations") && "bg-red-500 text-white"
          } rounded-full`}
          onClick={() => navigate("/account/accomodations")}
        >
          <BiBuildingHouse />
          My Accomodations
        </span>
      </nav>
      <div className="mt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AccountPage;
