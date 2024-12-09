import React, { useState } from "react";
import http from "../axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (pw) => {
    return /[a-z]/.test(pw) && /[0-9]/.test(pw) && pw.length > 4;
  };

  function validate() {
    if (username.length < 3) {
      alert("Username is not valid");
      username.focus();
      username.style.outlineColor = "red";
      return false;
    }
    if (!validateEmail(email)) {
      alert("Email is not valid");
      email.current.focus();
      email.current.style.outlineColor = "red";
      return false;
    }

    if (!validatePassword(password)) {
      alert("Password is not valid. It must be at least 5 characters long.");
      password.current.focus();
      password.current.style.outlineColor = "red";
      return false;
    }

    if (password != confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    return true;
  }

  function handleRegister(event) {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }

    const user = {
      username,
      email,
      password,
    }

    http.post("auth/local/register", user, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if(response.status == 200) {
          navigate("/login");
        }
      })
      .catch(error => {
        if(error.status == 404) {
          alert(error.message);
          return;
        }
      })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-white font-extrabold text-4xl mb-8">Register</h1>
      <form className="bg-gray-800 text-gray-300 p-8 rounded-md shadow-md w-[400px] flex flex-col gap-4">
        <label className="flex items-center gap-2 border-b border-gray-600 pb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-5 w-5 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => {setUsername(e.target.value)}} 
            className="bg-transparent border-none outline-none text-gray-300 placeholder-gray-500 flex-grow"
          />
        </label>
        <label className="flex items-center gap-2 border-b border-gray-600 pb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-5 w-5 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {setEmail(e.target.value)}}
            className="bg-transparent border-none outline-none text-gray-300 placeholder-gray-500 flex-grow"
          />
        </label>
        <label className="flex items-center gap-2 border-b border-gray-600 pb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-5 w-5 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {setPassword(e.target.value)}}
            className="bg-transparent border-none outline-none text-gray-300 placeholder-gray-500 flex-grow"
          />
        </label>
        <label className="flex items-center gap-2 border-b border-gray-600 pb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-5 w-5 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {setConfirmPassword(e.target.value)}}
            className="bg-transparent border-none outline-none text-gray-300 placeholder-gray-500 flex-grow"
          />
        </label>
        <button
          onClick={handleRegister}
          className="bg-blue-600 text-white font-bold py-2 rounded-md shadow-md hover:bg-blue-700 transition-all"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
