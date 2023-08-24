import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext.jsx";

const LoginPage = () => {
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useUserContext();
  const [selection, setSelection] = useState("login");
  const navigate = useNavigate();
  async function loginUser() {
    try {
      let response = await axios.post("http://localhost:5000/auth/login", auth);
      if (response.status === 200) {
        setUser(response.data);
        navigate("/");
      }
      console.log("login user", response);
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <div className="flex items-center grow justify-center ">
      <div className="flex flex-col gap-3 w-[400px] text-center">
        <h1 className=" mb-[30px] text-3xl">Login</h1>
        <input
          type="text"
          placeholder=" email"
          className="rounded-2xl outline-none border border-gray-300 p-2"
          value={auth.email}
          onChange={(e) =>
            setAuth((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder=" password"
          className="rounded-2xl outline-none border border-gray-300 p-2"
          value={auth.password}
          onChange={(e) =>
            setAuth((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <button
          onClick={loginUser}
          className="rounded-3xl bg-red-500 text-white p-2"
        >
          Login
        </button>
        <p>
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-800 font-bold cursor-pointer"
          >
            Register.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
