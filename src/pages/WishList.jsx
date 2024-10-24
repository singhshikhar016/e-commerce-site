import React, { useEffect, useState } from "react";
import "../css/WishList.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Card from "../components/Card";
import { GoHeartFill } from "react-icons/go";

export default function WishList({ currUser, setCurrUser }) {
  const [wishList, setWishList] = useState([]);
  let { userid } = useParams();
  const navigate=useNavigate();

  useEffect(() => {
    toast.loading(<b>Loading...</b>);
    axios
      .get(`https://trendify-ecommerce-backend.onrender.com/user/${userid}/mywishlist`)
      .then((res) => {
        toast.dismiss();
        if (res?.data?.msg === "WishList Data Fetched Successfully") {
          setWishList(res?.data?.wishlist);
        }
      })
      .catch((err) => {
        toast.dismiss();
        console.log(err?.response?.data);
        toast.error("Something Went Wrong");
      });
  }, [userid, currUser]);

  function removeFromWishlistHandler(itemid) {
    toast.loading(<b>Loading...</b>);
    axios
      .post(`https://trendify-ecommerce-backend.onrender.com/user/${userid}/removefromwishlist`, {
        itemid,
      })
      .then((res) => {
        toast.dismiss();
        if (res?.data?.msg === "Removed from Wishlist") {
          toast.success("Item removed from Wishlist");
          setCurrUser(res?.data?.user);
          localStorage.setItem("currUser", JSON.stringify(res?.data?.user));
        }
      })
      .catch((err) => {
        toast.dismiss();
        console.log(err?.response?.data);
        toast.error("Something Went Wrong!!");
      });
  }

  return (
    <div className="wishlist-page flex">
      {wishList.length === 0 && (
        <div className="my-cart-empty">
          <h2>No Items in Wishlist!!</h2>
          <div
            className="my-cart-proceed-to-checkout"
            onClick={() => {
              navigate("/stores/allproducts");
            }}
          >
            ADD ITEMS
          </div>
        </div>
      )}
      {wishList?.map((item, index) => (
        <div key={index} style={{ position: "relative" }}>
          <Card data={item} />
          <abbr
            title="Remove from Wishlist"
            className="wishlist-card-heart-btn-container"
            onClick={() => removeFromWishlistHandler(item._id)}
          >
            <GoHeartFill className="wishlist-card-heart-btn" />
          </abbr>
        </div>
      ))}
    </div>
  );
}
