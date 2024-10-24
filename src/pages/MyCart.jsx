import React, { useEffect, useState } from "react";
import "../css/MyCart.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import MyCartItem from "../components/MyCartItem";

export default function MyCart({
  setShowUserDetails,
  setShowCart,
  setCurrUser,
  totalPrice,
  setTotalPrice,
}) {
  const { userid } = useParams();
  const [cartData, setCartData] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    setShowCart(false);
    setShowUserDetails(false);

    toast.loading(<b>Loading...</b>);
    axios
      .get(`https://trendify-ecommerce-backend.onrender.com/user/${userid}/mycart`)
      .then((res) => {
        toast.dismiss();
        if (res?.data?.msg === "Cart Data Fetched") {
          setCartData(res?.data?.cartData);
          let x = 0;
          res?.data?.cartData?.forEach((item) => {
      x += parseFloat((item?.quantity * item?.productData?.price).toFixed(2));
    });
    setTotalPrice(parseFloat(x).toFixed(2));
        }
      })
      .catch((err) => {
        toast.dismiss();
        console.log(err?.response?.data);
        toast.error("Something Went Wrong!!");
      });

  }, [userid,setShowCart,setShowUserDetails,setCartData,totalPrice,setTotalPrice]);


  function resetClickHandler() {
    toast.loading();
    axios
      .get(`https://trendify-ecommerce-backend.onrender.com/${userid}/clearcart`)
      .then((res) => {
        toast.dismiss();
        if (res?.data?.msg === "Cleared Cart") {
          setCurrUser(res?.data?.currUser);
          localStorage.setItem("currUser",JSON.stringify(res?.data?.currUser));
          toast.success("Cart Cleared Successfully!!",{
            duration:5000
          });
          setTotalPrice(0.00);
        }
        else{
          toast.error("Something unusual happened!!");
          navigate('/');
        }
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Something Went Wrong!!");
      });
  }

  return (
    <div className="mycart-page flex">
        {
            cartData?.length===0 &&
             <div className="my-cart-empty">
                <h2 >No Items in Cart!!</h2>
                 <div className="my-cart-proceed-to-checkout" onClick={()=>{navigate("/stores/allproducts")}}>ADD ITEMS</div>
             </div>
        }
      {cartData?.map((item) => (
        <MyCartItem
          setShowCart={setShowCart}
          setCartData={setCartData}
          userid={userid}
          setCurrUser={setCurrUser}
          item={item}
          key={item._id}
        />
      ))}
      <hr />
      <div
        className="flex gap-m"
        style={{ justifyContent: "space-between", width: "70%" }}
      >
        <div>
          Total Billing:{" "}
          <span className="my-cart-total-billing">₹{totalPrice}</span>
        </div>
        <div className="my-cart-proceed-to-checkout">Proceed to checkout</div>
        <div className="my-cart-reset-btn" onClick={resetClickHandler}>Reset Cart</div>
      </div>
    </div>
  );
}
