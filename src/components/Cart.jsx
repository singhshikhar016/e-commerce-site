import React, { useEffect, useRef, useState } from "react";
import "../css/cart.css";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { NavLink ,useNavigate} from "react-router-dom";

export default function Cart({ currUser, setShowCart, setCurrUser }) {
  const [cartItem, setCartItem] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const itemRef = useRef(null);
  const navigate=useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (itemRef.current && !itemRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    function fetchProductData() {
      axios
        .get(`https://trendify-ecommerce-backend.onrender.com/${currUser._id}/cartData`)
        .then((res) => {
          if (res?.data?.msg === "Fetched Successfully") {
            setCartItem(res?.data?.data);

            let total = 0;
            if (res?.data?.data.length > 0) {
              res?.data?.data.forEach((item) => {
                total += item?.productData?.price * item?.quantity;
              });

              setTotalAmount(parseFloat(total.toFixed(2)));
            }
          } else {
            toast.error("Something Unusual happened!!");
          }
        })
        .catch((err) => {
          toast.error("Something Went Wrong!!");
          console.log(err);
        });
    }

    fetchProductData();
  }, [currUser, totalAmount]);

  function resetClickHandler() {
    toast.loading();
    axios
      .get(`https://trendify-ecommerce-backend.onrender.com/${currUser._id}/clearcart`)
      .then((res) => {
        toast.dismiss();
        if (res?.data?.msg === "Cleared Cart") {
          setCurrUser(res?.data?.currUser);
          localStorage.setItem("currUser",JSON.stringify(res?.data?.currUser));
          toast.success("Cart Cleared Successfully!!",{
            duration:5000
          });
        }
        else{
          toast.error("Something unusual happened!!");
        }

      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Something Went Wrong!!");
      });
  }



  function deleteItemFromCart(itemId){
    toast.loading();
    axios
      .get(`https://trendify-ecommerce-backend.onrender.com/${currUser._id}/deleteitemfromcart/${itemId}`)
      .then((res) => {
        toast.dismiss();
        if (res?.data?.msg === "Removed From Cart") {
          setCurrUser(res?.data?.currUser);
          localStorage.setItem("currUser",JSON.stringify(res?.data?.currUser));
          toast.success("Item removed from cart!!",{
            duration:5000
          });
        }
        else{
          toast.error("Something unusual happened!!");
        }

      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Something Went Wrong!!");
      });
  }

  return (
    <div className="cart" ref={itemRef}>
      <h2>Products in your cart</h2>
      {cartItem.length === 0 && (
        <div className="no-item-in-cart flex">
          <h1>No Item in your Cart</h1>
          <div
            className="no-item-in-cart-btn"
            onClick={() =>{ setShowCart(false); navigate('/stores/allproducts')}}
          >
            Add Items
          </div>
        </div>
      )}
      {cartItem.length > 0 &&
        cartItem?.map((item) => (
          <div key={item?._id}>
            <div className="cart-item flex">
              <img
                src={item?.productData?.mainImg}
                alt=""
                className="cart-item-img"
              />
              <div className="cart-item-details flex gap-m">
                <span className="cart-item-title">
                  {item?.productData?.title}
                </span>
                <p className="cart-item-desc">{item?.productData?.desc}</p>
                <div className="cart-item-price-container flex">
                  <div>
                    <span>{item?.quantity} x </span>
                    <span className="cart-item-price">
                      {" "}
                      {parseFloat(item?.productData?.price).toFixed(2)}
                    </span>
                  </div>
                  <span className="cart-item-total-price">
                    ₹{parseFloat((item?.quantity * item?.productData?.price)).toFixed(2)}
                  </span>
                </div>
              </div>
              <div>
                <MdDelete className="cart-item-del-btn" onClick={()=>deleteItemFromCart(item?._id)}/>
              </div>
            </div>
            <hr />
          </div>
        ))}
      {currUser?.cart?.length > 0 && (
        <>
          <div className="cart-total-price flex">
            <span>SUBTOTAL</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="flex cart-total-price">
            <div className="cart-checkout-btn">PROCEED TO CHECKOUT</div>
            <div className="reset-cart" onClick={resetClickHandler}>
              Reset Cart
            </div>
          </div>
          <NavLink to={`/user/${currUser._id}/mycart`} className="visit-cart-link">Visit Cart to edit and see full details of the items added</NavLink>
        </>
      )}
    </div>
  );
}
