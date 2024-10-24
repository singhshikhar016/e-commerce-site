import React from "react";
import "../css/Navbar.css";
import { FaAngleDown } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Cart from "./Cart";
import UserDetails from "./UserDetails";

export default function Navbar({
  isLogin,
  setIsLogin,
  setCurrUser,
  currUser,
  showUserDetails,
  setShowUserDetails,
  showCart,
  setShowCart,
}) {
  return (
    <div className="navbar flex">
      <div className="nav-left flex gap-l">
        <div className="flex gap-s">
          <img className="nav-country-flag" src="/assets/flag.png" alt="" />
          <FaAngleDown />
        </div>

        <div className="flex gap-s">
          <span className="nav-country-name">
            <b>IND</b>
          </span>
          <FaAngleDown />
        </div>

        <div className="flex gap-l">
          <NavLink className="nav-link" to="/products/women">
            Women
          </NavLink>
          <NavLink className="nav-link" to="/products/men">
            Men
          </NavLink>
          <NavLink className="nav-link" to="/products/child">
            Children
          </NavLink>
        </div>
      </div>

      <div className="nav-center">
        <span className="nav-logo">TRENDIFY</span>
      </div>
      <div className="nav-right flex gap-l">
        <div className="flex gap-l">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
          <NavLink className="nav-link" to="/contact">
            Contact
          </NavLink>
          <NavLink className="nav-link" to="/stores/allproducts">
            Stores
          </NavLink>
        </div>

        <div className="nav-icons flex gap-s">
          <NavLink to="/stores/allproducts">
            <abbr title="Search" className="nav-icon">
              <IoSearch />
            </abbr>
          </NavLink>

          {!isLogin && (
            <NavLink to="/login" className="login-icon-box flex gap-s">
              <FaUser />
              <span>Login</span>
            </NavLink>
          )}

          {isLogin && (
            <>
              <abbr title="User" className="nav-icon">
                <FaUser
                  onClick={() => {
                    setShowUserDetails(true);
                    setShowCart(false);
                  }}
                />
              </abbr>
              <NavLink to={`/user/${currUser._id}/mywishlist`}>
                <abbr title="WishList" className="nav-icon">
                  <GoHeart fontSize="1.2em" />
                </abbr>
              </NavLink>
              <div
                className="nav-cart-icon"
                onClick={() => {
                  setShowCart(true);
                  setShowUserDetails(false);
                }}
              >
                <abbr title="Cart" className="nav-icon">
                  <FaShoppingCart />
                </abbr>
                {isLogin && (
                  <div className="nav-item-count">{currUser?.cart?.length}</div>
                )}
              </div>{" "}
            </>
          )}
        </div>
      </div>
      {showCart && (
        <Cart
          setShowCart={setShowCart}
          setCurrUser={setCurrUser}
          currUser={currUser}
        />
      )}
      {showUserDetails && (
        <UserDetails
          setShowUserDetails={setShowUserDetails}
          setIsLogin={setIsLogin}
          setCurrUser={setCurrUser}
          currUser={currUser}
        />
      )}
    </div>
  );
}
