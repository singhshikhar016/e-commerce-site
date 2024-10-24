import axios from "axios";
import "../css/Login.css";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function Login({ setIsLogin, setCurrUser }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);

  function eyeClickHandler() {
    setShowPass(!showPass);
  }

  function loginClickHandler(e) {
    e.preventDefault();
    let username = userData.username;
    let password = userData.password;
    toast.loading("Logging-in ...");
    axios
      .post("https://trendify-ecommerce-backend.onrender.com/login", { username, password })
      .then((res) => {
        toast.dismiss();
        if (res?.data?.msg === "Logged-In Successfully") {
          localStorage.setItem("isLogin", "true");
          localStorage.setItem("currUser", JSON.stringify(res?.data?.currUser));

          setIsLogin(true);
          setCurrUser(res?.data?.currUser);

          navigate("/");
          toast.success(<span>Welcome Back <b>{username}</b>!!</span>,{
            duration: 6000
          });
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          toast.dismiss();
          toast.error(<b>Unortherised User</b>);
          toast.error("Username or Password is incorrect",{
            duration:5000,
            style: {
              textAlign:"center",
            }
          });
        } else {

          console.log(err);
          let errMsg = err.response.data.message
            ? err?.response?.data?.message
            : "Something Went Wrong!!";
          toast.error(errMsg);
        }

        navigate("/login");
      });
  }

  function inputChangeHandler(e) {
    setUserData((preData) => {
      return { ...preData, [e.target.name]: e.target.value };
    });
  }


  return (
    <div className="login-page flex gap-l">
      <div className="login-head">Welcome Back!! Login on Trendify</div>
      <>
        <div className="login-form-container flex">
          <img src="assets/phone_with_cloud.png" alt="" />

          <form className="login-form flex gap-l" onSubmit={loginClickHandler}>
            <div className="login-form-item flex ">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                required
                onChange={inputChangeHandler}
              />
            </div>
            <div className="login-form-item flex login-pass">
              <label htmlFor="password">Password</label>
              <input
                type={showPass ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                onChange={inputChangeHandler}
              />
              <div className="eye-icons">
                {showPass ? (
                  <FaEyeSlash onClick={eyeClickHandler} />
                ) : (
                  <FaEye onClick={eyeClickHandler} />
                )}
              </div>
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            <hr />
            <div className="flex gap-m dontHaveAccount">
              <span>Don't have Trendify account? Signup Now!!</span>
              <NavLink to="/signup">
                <div className="login-page-signup-btn">SignUp</div>
              </NavLink>
            </div>
          </form>
        </div>
      </>
    </div>
  );
}
