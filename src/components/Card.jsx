import React from "react";
import { NavLink } from "react-router-dom";
import "../css/card.css";

export default function Card({ data }) {
  return (
    <NavLink to={`/product/${data._id}`}>
      <div className="card flex ">
        <div className="card-img-container">
          <img
            src={data.mainImg}
            alt={`${data.title} mainIMg`}
            className="main-img"
            loading="lazy"
            onMouseEnter={(e)=>{e.target.setAttribute("src",data?.additionalImg[0])}}
            onMouseLeave={(e)=>{e.target.setAttribute("src",data?.mainImg)}}
          />
          {data?.newSeason && <span className="card-new-text">New Season</span>}
        </div>
        <span className="card-title">{data.title}</span>
        <div className="card-price-container flex gap-m">
          <span className="card-price">₹{parseFloat(data.price).toFixed(2)}</span>
          <span className="card-oldPrice">MRP : ₹{parseFloat(data.oldprice).toFixed(2)}</span>
        </div>
          <span className="card-price-off">₹{parseFloat((data.oldprice - data.price).toFixed(2))} OFF</span>
      </div>
    </NavLink>
  );
}
