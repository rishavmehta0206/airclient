import React from "react";
import { BiLogoAirbnb } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Header = () => {
  const { user } = useUserContext();
  return (
    <div>
      <header className="flex justify-between">
        <a href="" className="flex gap-1 items-center">
          <BiLogoAirbnb className="h-8 w-8" />
          <span className="font-bold">airbcd</span>
        </a>
        <div className="flex items-center gap-2 rounded-3xl shadow-md shadow-gray-300 border border-gray-300 py-1 px-4">
          <div className="">Anywhere</div>
          <div className="border-l h-full border-gray-300"></div>
          <div className="">Anyweek</div>
          <div className="border-l h-full border-gray-300"></div>
          <div className="">Add Guests</div>
          <div className="bg-red-500 text-white rounded-full flex items-center justify-center h-10 w-10">
            <BsSearch />
          </div>
        </div>

        <Link
          to="/login"
          className="flex items-center gap-2 rounded-3xl  border border-gray-300 py-1 px-4"
        >
          <RxHamburgerMenu />
          <div className="rounded-full flex items-center justify-center h-10 w-10 bg-gray-500 text-white">
            <AiOutlineUser />
          </div>
          {!!user && <div className="">{user.first_name}</div>}
        </Link>
      </header>
    </div>
  );
};

export default Header;
