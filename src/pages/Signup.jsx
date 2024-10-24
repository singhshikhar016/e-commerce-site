import React, { useEffect, useState } from "react";
import "../css/Signup.css";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup({ setIsLogin, setCurrUser }) {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [sameConfirmPass, setSameConfirmPass] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpass: "",
  });

  function eyeClickHandler() {
    setShowPass(!showPass);
  }

  function inputChangeHandler(e) {
    setUserData((preData) => {
      return { ...preData, [e.target.name]: e.target.value };
    });
  }

  useEffect(() => {
    userData?.password === userData?.confirmpass
      ? setSameConfirmPass(true)
      : setSameConfirmPass(false);
    console.log(userData);
  }, [userData]);

  function signupFormSubmitHandler(e) {
    e.preventDefault();
    if (sameConfirmPass) {
      toast.loading("Signing Up...");
      let username = userData.username;
      let email = userData.email;
      let password = userData.password;

      axios
        .post("https://trendify-ecommerce-backend.onrender.com/signup", { username, email, password })
        .then((res) => {
          
          if (res?.data?.msg === "Signup-Login Successful") {
            localStorage.setItem("isLogin", "true");
            localStorage.setItem("currUser", JSON.stringify(res?.data?.currUser));
            setIsLogin(true);
            setCurrUser(res?.data?.currUser);

            toast.success("Signup Successfull!!");

            toast.success(
              <span>
                Welocome <b>{username}</b>!!
              </span>,
              {
                duration: 5000,
              }
            );

          }
          navigate("/");
        })
        .catch((err) => {
          let errName = err?.response?.data?.err?.name;
          let errMsg = err?.response?.data?.err?.message;

          if (errMsg.length > 70) {
            errMsg = `${err?.response?.data?.err?.name}. Error in SignUp`;
          }

          toast.error(
            <div>
              {" "}
              <b>{errName}</b> <br /> {errMsg}
            </div>
          );
        });
    } else {

      toast.error("Password and Confirm Password are not same", {
        duration: 5000,
        style: {
          textAlign: "center",
        },
      });

      console.log("Pass is not same");
    }
  }

  return (
    <div className="login-page flex gap-l">
      <div className="login-head">Be a part of Trendify family</div>
      <>
        <div className="login-form-container signup-form flex">
          <img id="signup-left-img" src="assets/password_protect.jpg" alt="" />

          <form
            className="login-form flex gap-l"
            onSubmit={signupFormSubmitHandler}
          >
            <div className="login-form-item flex ">
              <label htmlFor="emailid">Email Id</label>
              <input
                type="text"
                id="emailid"
                name="email"
                placeholder="Enter your Email Id"
                required
                onChange={inputChangeHandler}
              />
            </div>
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
            <div className="login-form-item flex">
              <label htmlFor="confirmpass">Confirm Password</label>
              <input
                type="text"
                id="confirmpass"
                name="confirmpass"
                placeholder="Confirm password"
                required
                onChange={inputChangeHandler}
              />
              {userData?.confirmpass !== "" && !sameConfirmPass && (
                <div className="confirmPass-hidden">
                  *Password and Confirm Password are not same
                </div>
              )}
            </div>
            <button type="submit" className="signup-btn">
              Signup
            </button>
          </form>
        </div>
      </>
    </div>
  );
}
