import React, { useState } from "react";
import "../css/slider.css";
import { FaCircleArrowLeft,FaCircleArrowRight } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export default function Slider() {
    const [currentSlide, setCurrentSlide]= useState(0);
  let data = [
    "/assets/young-beautiful-woman-looking-camera-trendy-girl-casual-summer-white-t-shirt-jeans-shorts-round-sunglasses-positive-female-shows-facial-emotions-funny-model-isola.jpg",
    "/assets/young-beautiful-smiling-female-trendy-summer-red-dress-sexy-carefree-woman-posing-near-blue-wall-studio-positive-model-having-fun-cheerful-happy-sunny-day-shadow-.jpg",
    "/assets/smiling-little-girl-child-standing-isolated.jpg",
    "/assets/portrait-two-handsome-confident-stylish-hipster-lambersexual-models-sexy-modern-men-dressed-white-elegant-suit-fashion-male-posing-studio-near-beige-wall.jpg",
    "/assets/portrait-smiling-beautiful-girl-her-handsome-boyfriend-laughing-happy-cheerful-couple-sunglasses.jpg",
    "/assets/portrait-excited-young-african-man-playing.jpg",
  ];

function nextSlide(){
 currentSlide===5? setCurrentSlide(0) : setCurrentSlide(currentSlide+1);
}

function prevSlide(){
    currentSlide===0? setCurrentSlide(5) : setCurrentSlide(currentSlide-1);
}

  return (
    <div className="slider">
      <div className="slider-container" style={{transform: `translateX(-${currentSlide*100}vw)`}}>
        <NavLink to="products/women"><img className="slider-img" src={data[0]} loading="lazy" alt="" /></NavLink>
        <NavLink to="products/women"><img className="slider-img" src={data[1]} loading="lazy" alt="" /></NavLink>
        <NavLink to="products/child"><img className="slider-img" src={data[2]} loading="lazy" alt="" /></NavLink>
        <NavLink to="products/men"><img className="slider-img" src={data[3]} loading="lazy" alt="" /></NavLink>
        <NavLink to="products/men/"><img className="slider-img" src={data[4]} loading="lazy" alt="" /></NavLink>
        <NavLink to="products/child"><img className="slider-img" src={data[5]} loading="lazy" alt="" /></NavLink>
      </div>
      <FaCircleArrowLeft  className="left-btn" onClick={prevSlide}/>
      <FaCircleArrowRight  className="right-btn" onClick={nextSlide}/>
    </div>
  );
}
