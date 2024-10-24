import React, { useState } from "react";
import "../css/myCartItem.css";
import axios from "axios";
import toast from "react-hot-toast";

export default function MyCartItem({ item, userid, setCurrUser, setCartData,setShowCart}) {
  let product = item?.productData;
  const [mainImg, setMainImg] = useState(product?.mainImg);
  const [quantity, setQuantity] = useState(item?.quantity);

  function removeFromCartHandler() {
    setShowCart(false);
    toast.loading(<b>Loading...</b>);
    axios
      .get(`https://trendify-ecommerce-backend.onrender.com/${userid}/deleteitemfromcart/${item._id}`)
      .then((res) => {
        toast.dismiss();
        if (res?.data?.msg === "Removed From Cart") {
          toast.success("Item Removed From Cart", {
            duration: 5000,
          });

          localStorage.setItem("currUser", JSON.stringify(res?.data?.currUser));
          setCurrUser(res?.data?.currUser);

          setCartData(res?.data?.currUser?.cart);
        }
      })
      .catch((err) => {
        toast.dismiss();
        console.log(err?.response?.data);
        toast.error("Something went Wrong!!");
      });
  }

  async function changeQuantityHandler(q) {
    setShowCart(false);
    let itemid= item._id;
    axios
      .post(`https://trendify-ecommerce-backend.onrender.com/user/${userid}/setquantity`, {
        q,
        itemid
      })
      .then((res) => {
        if (res?.data?.msg === "Quantity Changed Successfully") {
          setCurrUser(res?.data?.currUser);
          localStorage.setItem("currUser",JSON.stringify(res?.data?.currUser));
        }
      })
      .catch((err) => {
        toast.error("Error in changing quantity!!");
        console.log(err?.response?.data);
      });
  }

  return (
    <div className="my-cart-item flex gap-m">
      {product?.newSeason && <span className="my-cart-new-text">New Season</span>}
      <img className="my-cart-mainImg" src={mainImg} alt="" />
      <div className=" additional-img-container flex gap-l">
        <img
          className="my-cart-additional-img"
          src={product?.mainImg}
          alt=""
          onClick={() => setMainImg(product?.mainImg)}
        />
        {product?.additionalImg?.map((img, index) => (
          <img
            src={img}
            alt=""
            className="my-cart-additional-img"
            key={index}
            onClick={() => setMainImg(img)}
          />
        ))}
      </div>
      <h2 className="my-cart-title">{product?.title}</h2>
      <p className="my-cart-desc">{product?.desc}</p>
      <div className="my-cart-price-container flex gap-m">
        <span className="my-cart-price">
          ₹{parseFloat(product.price).toFixed(2)}
        </span>
        <span className="my-cart-oldPrice">
          MRP: ₹{parseFloat(product.oldprice).toFixed(2)}
        </span>
        <span className="my-cart-price-off">
          ({parseFloat((product.oldprice - product.price).toFixed(2))}₹ OFF)
        </span>
      </div>
      <div className="flex gap-l">
        <div>
          Quantity: <b style={{ fontSize: "20px" }}>{quantity}</b>
        </div>
        <div
          className="my-cart-quantity-inc"
          onClick={() => {setQuantity(quantity + 1);changeQuantityHandler(quantity+1)}}
        >
          INC
        </div>
        <div
          className="my-cart-quantity-dec"
          onClick={() => {setQuantity(quantity===1?1:quantity-1);changeQuantityHandler(quantity-1)}}
        >
          DEC
        </div>
      </div>
      <div className="flex gap-m">
        Total Amount:{" "}
        <span className="my-cart-total-amount">
          ₹{parseFloat(product.price * quantity).toFixed(2)}
        </span>
      </div>
      <div className="my-cart-btn-container flex">
        <div className="my-cart-buy-now">Buy Now!</div>
        <div
          className="my-cart-remove-from-cart"
          onClick={removeFromCartHandler}
        >
          Remove From Cart
        </div>
      </div>
    </div>
  );
}
