import React, { useEffect, useState } from "react";
import "../css/featuredProducts.css";
import Card from "./Card";
import { NavLink } from "react-router-dom";

export default function FeaturedProducts({ title, data, desc }) {
  const [showMore, setShowMore] = useState(false);
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    if (data.length > 5) {
      setShowMore(true);
      setCardsData(data.slice(0, 5));
    }
    else{
      setCardsData(data);
    }
  },[data]);

  return (


    <div className="featuredProducts flex">
      <div className="featured-top flex">
        <h1>{title}</h1>
        <p>
          {desc}
        </p>
      </div>
      <div className="featured-bottom flex">
        {cardsData.map((item) => (
          <Card data={item} key={item._id} />
        ))}
        {showMore &&
         <div className="featured-show-more-btn">
          <NavLink to="/stores/allproducts">Show More</NavLink>
        </div>
        }
      </div>
    </div>
  );
}
