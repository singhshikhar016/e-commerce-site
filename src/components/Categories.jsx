import React from "react";
import "../css/categories.css";
import { NavLink } from "react-router-dom";

export default function Categories() {
  return (
    <div className="categories">
      <div className="col">
        <NavLink to="/products/women" className="row">
        <img src="assets/young-beautiful-woman-looking-camera-trendy-girl-casual-summer-white-t-shirt-jeans-shorts-round-sunglasses-positive-female-shows-facial-emotions-funny-model-isola.jpg" alt="" loading="lazy"/>
        <div className="categories-link">Women</div>
        </NavLink>
        <NavLink to="/products/child" className="row">
        <img src="assets/portrait-excited-young-african-man-playing.jpg" alt="" loading="lazy"/>
        <div className="categories-link">Child</div>
        </NavLink>
      </div>
      <div className="col">
        <NavLink to="/products/men" className="row">
        <img src="assets/handsome-retro-man-dressed-shirt.jpg" alt="" loading="lazy"/>
        <div className="categories-link">Men</div>
        </NavLink>
      </div>
      <div className="col col-l">
        <div className="row">
          <div className="col">
            <NavLink to="/stores/jackets" className="row">
            <img src="assets/beautiful-blonde-model-with-leather-jacket-sunglasses.jpg" alt="" loading="lazy"/>
            <div className="categories-link">Jackets</div>
            </NavLink>
          </div>
          <div className="col">
            <NavLink to="/stores/accessories" className="row">
            <img src="assets/portrait-smiling-beautiful-girl-her-handsome-boyfriend-laughing-happy-cheerful-couple-sunglasses (1).jpg" alt="" loading="lazy"/>
            <div className="categories-link">Accessories</div>
            </NavLink>
          </div>
        </div>
        <NavLink to="/stores/goggles" className="row">
        <img src="assets/glasses-with-slightly-rounded-frame.jpg" alt="" loading="lazy"/>
        <div className="categories-link">Goggles</div>
        </NavLink>
      </div>
    </div>
  );
}
