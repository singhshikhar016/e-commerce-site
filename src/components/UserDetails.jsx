import React, { useEffect, useRef, useState } from "react";
import "../css/userDetails.css";
import axios from "axios";
import toast from "react-hot-toast";
import { LuLogIn } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { MdCompare } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FaUserEdit } from "react-icons/fa";

export default function UserDetails({setShowUserDetails, setIsLogin, setCurrUser, currUser }) {
  const navigate = useNavigate();
  const [showChangePass, setShowChangePass] = useState(false);
  const [changePassData, setChangePassData] = useState({oldPass:"",newPass:""});

  const itemRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (itemRef.current && !itemRef.current.contains(event.target)) {
        setShowUserDetails(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  function logoutClickHandler() {
    toast.loading("Logging-out...");
    axios
      .get("https://trendify-ecommerce-backend.onrender.com/logout")
      .then((res) => {
        toast.dismiss();
        if (res?.data?.msg === "Logout Successfully") {
          localStorage.setItem("isLogin", "false");

          localStorage.setItem("currUser", "null");
          setCurrUser({});
          setIsLogin(false);
          toast.success(<b>Logout Successfully!!</b>, {
            duration: 5000,
          });
          setShowUserDetails(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss();
        let errMsg = err?.response?.data?.message
          ? err?.response?.data?.message
          : "Something Went Wrong!!";
        toast.error(errMsg);
      });
  }

  function passChangeHandler(e){
    setChangePassData((preData) => {
        return { ...preData, [e.target.name]: e.target.value };
      });
  }

  function changePassHandler(e){
    e.preventDefault();
    toast.loading("Changing Password...");
    let oldPass=changePassData.oldPass;
    let newPass=changePassData.newPass;
    let id=currUser._id;
    axios.post('https://trendify-ecommerce-backend.onrender.com/changepass',{oldPass, newPass,id}).then(res=>{
            toast.dismiss();
            toast.success("Password Changed Successfully",{
                duration:5000,
            });
            console.log(res.data);
    }).catch(err=>{
        toast.dismiss();
        if(err?.response?.data?.message==='Password or username is incorrect'){
            toast.error("Password or username is incorrect",{
                duration:5000
            });
        }
        else{
            toast.error("Something went wrong");
            toast.error("Try agin after sometime",{
                duration:5000
            });
        }
    });
  }

  return (
    <div className="userDetails flex gap-l" ref={itemRef}>
      <div className="flex userDetails-top-img-box gap-m">
        <img src={currUser?.profilephoto?.url} alt="" className="profileImg" />
        <span className="userDetails-username">{currUser?.username}</span>
      </div>
      <NavLink to={`/user/${currUser._id}/myorders`} className="userDeatils-options flex gap-s">
        <span>Your Orders</span>
        <TbTruckDelivery style={{ fontSize: "1.3em" }} />
      </NavLink>
      <NavLink to={`/user/${currUser._id}/mycart`} className="userDeatils-options flex gap-s">
        <span>Your Cart</span>
        <FaShoppingCart />
      </NavLink>
      <NavLink to={`/user/${currUser._id}/mycomparisons`} className="userDeatils-options flex gap-s">
        <span>Items in Comparison</span>
        <MdCompare style={{ fontSize: "1.2em" }} />
      </NavLink>
      <NavLink to={`/user/${currUser._id}/editprofile`} className="userDeatils-options flex gap-s">
        <span>Edit Profile</span>
        <FaUserEdit style={{ fontSize: "1.2em" }} />
      </NavLink>
      <div
        className="userDeatils-options flex gap-s"
        onClick={() => setShowChangePass(!showChangePass)}
      >
        <span>Change Password</span>
        {showChangePass ? <FaLockOpen /> : <FaLock />}
      </div>
      {showChangePass && (
        <form className="changePass-form flex gap-m" onSubmit={changePassHandler}>
            <input type="password" name="oldPass" id="oldPass" placeholder="Enter your Old Password" onChange={passChangeHandler}/>
            <input type="password" name="newPass" id="newPass" placeholder="Enter your New Password" onChange={passChangeHandler}/>
            <button>Change</button>
        </form>
      )}
      <div
        className="userDeatils-options flex gap-s"
        onClick={logoutClickHandler}
      >
        <span>Logout</span>
        <LuLogIn />
      </div>
    </div>
  );
}
