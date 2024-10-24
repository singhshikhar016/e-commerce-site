import React from "react";
import "../css/footer.css";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="footer flex">
        <div className="foot-top flex">
          <div className="foot-item">
            <div className="foot-item-head">Categories</div>
            <NavLink to="/products/women">Womens</NavLink>
            <NavLink to="/products/men">Mens</NavLink>
            <NavLink to="/">Shoes</NavLink>
            <NavLink to="/">Accessories</NavLink>
            <NavLink to="/">New Arrivals</NavLink>
          </div>
          <div className="foot-item">
            <div className="foot-item-head">Links</div>
            <NavLink to="/">FAQs</NavLink>
            <NavLink to="/">Pages</NavLink>
            <NavLink to="/stores">Stores</NavLink>
            {localStorage.getItem("isLogin") === "true" && (
              <NavLink
                to={`/user/${
                  JSON.parse(localStorage.getItem("currUser"))._id
                }/mycomparisons`}
              >
                Compare
              </NavLink>
            )}
            <NavLink to="/">Cookies</NavLink>
          </div>
          <div className="foot-item">
            <div className="foot-item-head">About</div>
            <span>
            Trendify is a leading e-commerce platform renowned for its diverse
              selection of products and exceptional customer service. With a
              user-friendly interface and seamless shopping experience, Trendify
              offers a vast array of high-quality products ranging from
              electronics and fashion to home essentials and beyond.
            </span>
          </div>
          <div className="foot-item">
            <div className="foot-item-head">Contact</div>
            <span>
              For inquiries, feedback, or assistance, please reach out to
              Trendify's dedicated customer support team. You can contact us via
              email at{" "}
              <NavLink to="mailto:akashmishra15703@gmail.com" style={{ color: "blue" }}>
                support@trendify.com
              </NavLink>{" "}
              or by phone at{" "}
              <NavLink to="tel:9695437432" style={{ color: "blue" }}>
                1-800-TRENDIFY
              </NavLink>
              . Our friendly representatives are available around the clock to
              address your concerns and provide prompt assistance.
            </span>
          </div>
        </div>
        <div className="foot-bottom flex">
          <div className="flex gap-m">
            <span className="foot-logo">Trendify</span>
            <span>@ Copyright 2024. All rights Reserved</span>
          </div>
          <div>
            <img
              className="foot-pay-img"
              src="/assets/payment_methods.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
