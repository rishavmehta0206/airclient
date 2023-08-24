import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [auth, setAuth] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    confirmPassword: "",
  });
  const [selection, setSelection] = useState("login");

  async function registerUser() {
    try {
      let response = await axios.post(
        "http://localhost:5000/auth/register",
        auth
      );
      console.log("register user", response);
    } catch (error) {}
  }

  return (
    <div className="flex items-center grow justify-center ">
      <div className="flex flex-col gap-3 w-[400px] text-center">
        <h1 className=" mb-[30px] text-3xl">Register</h1>
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
        <input
          type="text"
          placeholder="first name"
          className="rounded-2xl outline-none border border-gray-300 p-2"
          value={auth.first_name}
          onChange={(e) =>
            setAuth((prev) => ({ ...prev, first_name: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="last name"
          className="rounded-2xl outline-none border border-gray-300 p-2"
          value={auth.last_name}
          onChange={(e) =>
            setAuth((prev) => ({ ...prev, last_name: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="confirm password"
          className="rounded-2xl outline-none border border-gray-300 p-2"
          value={auth.confirmPassword}
          onChange={(e) =>
            setAuth((prev) => ({ ...prev, confirmPassword: e.target.value }))
          }
        />
        <button
          onClick={registerUser}
          className="rounded-3xl bg-red-500 text-white p-2"
        >
          Register
        </button>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-800 font-bold cursor-pointer">
            Login.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
