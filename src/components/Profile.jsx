import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";

const Profile = () => {
  const { user } = useUserContext();
  return (
    <div>
      <div className=" max-w-lg mx-auto flex flex-col gap-4 items-center justify-center">
        <p>{`Logged in as ${user.first_name} ${user.last_name} ( ${user.email} )`}</p>
        <button className="p-2 w-full bg-red-500 text-white rounded-2xl">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
