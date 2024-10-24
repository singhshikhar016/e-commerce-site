import React, { useEffect, useState } from "react";
import "../css/Product.css";
import { FaShoppingCart } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { MdCompare } from "react-icons/md";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Product({ currUser, setCurrUser }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState("");
  const [productData, setProductData] = useState({});
  const [inWishlist, setInWishlist] = useState(false);
  const [inComparelist, setInComparelist] = useState(false);

  let { id } = useParams();

  async function addtoCartHandler() {
    let Userid = currUser._id;
    let flag = 0;
    currUser?.cart?.forEach((item) => {
      if (item?.productData?._id === id) {
        flag = 1;
        return;
      }
    });

    if (flag === 1) {
      toast.error(<b>Item already in cart!!</b>, {
        icon: "⚠️",
        duration: 3000,
      });

      toast.error(
        <NavLink to={`/user/${currUser._id}/mycart`}>
          <b>Visit cart for any modification</b>
        </NavLink>,
        {
          icon: "⚠️",
          duration: 5000,
          style: {
            textDecoration: "Underline",
            color: "blue",
          },
        }
      );
      return;
    }

    toast.loading(<b>Loading...</b>);
    await axios
      .post(`https://trendify-ecommerce-backend.onrender.com/product/${id}/addtocart`, {
        Userid,
        quantity,
      })
      .then((res) => {
        toast.dismiss();
        if (res?.data?.msg === "Added to cart") {
          setCurrUser(res?.data?.user);
          localStorage.setItem("currUser", JSON.stringify(res?.data?.user));
          toast.success("Item Addded to Cart", {
            duration: 5000,
          });
        } else {
          toast.error(<b>Try Again!!</b>);
        }
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Something went wrong");
        console.log(err);
      });
  }

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("currUser"));
    if (!user) {
      return navigate("/login");
    }

    function fetchProduct() {
      axios
        .get(`https://trendify-ecommerce-backend.onrender.com/product/${id}`)
        .then((res) => {
          if (res?.data?.msg === "Product Fetched Successfully") {
            setProductData(res.data?.data);
            setSelectedImg(res.data?.data?.mainImg);
          }
        })

        .catch((err) => {
          console.log(err);
          let errMsg = err?.response?.data?.message
            ? err?.response?.data?.message
            : "Something Went Wrong!!";

          toast.error(errMsg);
          navigate("/");
        });
    }
    fetchProduct();

    currUser?.wishlist?.forEach((item) => {
      if (item?._id === id) {
        setInWishlist(true);
      }
    });

    currUser?.comparelist?.forEach((item) => {
      if (item?._id === id) {
        setInComparelist(true);
      }
    });
  }, [setProductData]);

  function addtoWishlistHandler() {
    if (inWishlist) {
      return toast.success(<b>Item already in Wishlist!!</b>, {
        icon: "⚠️",
        duration: 5000,
      });
    }
    setInWishlist(true);
    let Userid = currUser?._id;
    axios
      .post(`https://trendify-ecommerce-backend.onrender.com/product/${id}/addtowishlist`, { Userid })
      .then((res) => {
        if (res?.data?.msg === "Added to Wishlist") {
          toast.success("Item added to Wishlist");
          setCurrUser(res?.data?.user);
          localStorage.setItem("currUser", JSON.stringify(res?.data?.user));
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong!!");
        console.log(err?.response?.data);
      });
  }

  function addtoComparelist() {
    if (inComparelist) {
      return toast.success(<b>Item already in Comparelist!!</b>, {
        icon: "⚠️",
        duration: 5000,
      });
    }
    setInComparelist(true);
    let Userid = currUser?._id;
    axios
      .post(`https://trendify-ecommerce-backend.onrender.com/product/${id}/addtocomparelist`, { Userid })
      .then((res) => {
        if (res?.data?.msg === "Added to Comparelist") {
          toast.success("Item added to Comparelist!!");
          setCurrUser(res?.data?.user);
          localStorage.setItem("currUser", JSON.stringify(res?.data?.user));
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong!!");
        console.log(err?.response?.data);
      });
  }

  return (
    <div className="product flex gap-l">
      <div className="product-left flex gap-m">
        <img
          src={productData && productData?.mainImg}
          alt=""
          onClick={(e) => setSelectedImg(productData?.mainImg)}
        />
        {productData &&
          productData?.additionalImg &&
          productData?.additionalImg.map((image, index) => (
            <img
              src={image}
              alt=""
              onClick={(e) => setSelectedImg(image)}
              key={index}
            />
          ))}
      </div>

      <div className="product-mid">
        <img src={selectedImg} alt="" />
      </div>
      <div className="product-right flex">
        <h2>{productData?.title}</h2>
        <div className="flex gap-m">
          <span className="product-price">
            ₹ {parseFloat(productData?.price).toFixed(2)}
          </span>
          <span className="my-cart-oldPrice">
            MRP : ₹{parseFloat(productData?.oldprice).toFixed(2)}
          </span>
          <span className="my-cart-price-off">
            (
            {parseFloat(
              (productData?.oldprice - productData?.price).toFixed(2)
            )}
            ₹ OFF)
          </span>
        </div>
        <p className="product-desc">{productData?.desc}</p>

        <div className="flex gap-m">
          <div
            className="quantity-add"
            onClick={(e) => setQuantity(quantity + 1)}
          >
            +
          </div>
          <span>{quantity}</span>
          <div
            className="quantity-minus"
            onClick={(e) => (quantity > 1 ? setQuantity(quantity - 1) : "")}
          >
            -
          </div>
        </div>

        <div className="addtocart flex gap-m" onClick={addtoCartHandler}>
          <FaShoppingCart />
          <span>ADD TO CART</span>
        </div>

        <div className="flex gap-l">
          <div className="flex gap-s wishlist" onClick={addtoWishlistHandler}>
            {!inWishlist ? (
              <div className="flex gap-s">
                <GoHeart fontSize="1.2em" />
                <span>ADD TO WISHLIST</span>
              </div>
            ) : (
              <div className="flex gap-s">
                <GoHeartFill fontSize="1.2em" />
                <span>ADDED TO WISHLIST</span>
              </div>
            )}
          </div>
          <div className="flex gap-s compare" onClick={addtoComparelist}>
            {!inComparelist ? (
              <div className="flex gap-s">
                <MdCompare fontSize="1.2em" />
                <span>ADD TO COMPARE</span>
              </div>
            ) : (
              <div className="flex gap-s">
                <MdCompare fontSize="1.2em" />
                <span>ADDED TO COMPARE</span>
              </div>
            )}
          </div>
        </div>

        <div className="product-info flex gap-s">
          <span>Vendor: Polo</span>
          <span>Product Type: {productData?.category}</span>
          <div>
            Tag:{" "}
            {productData &&
              productData?.keyword?.map((e, index) => (
                <span key={index}>#{e} &nbsp;</span>
              ))}
          </div>
        </div>
        <hr />
        <div className="product-details flex gap-m">
          <span>DESCRIPTION</span>
          <hr />
          <span>ADDITIONAL INFORMATION</span>
          <hr />
          <span>FAQ</span>
        </div>
      </div>
    </div>
  );
}
