import React, { useEffect, useState } from "react";
import "../css/MyComparisons.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import MyComparisonItem from "../components/MyComparisonItem";

export default function MyComparisons({
  setShowUserDetails,
  currUser,
  setCurrUser,
}) {
  const [comparison, setComparison] = useState([]);
  const [toCompare, setToCompare] = useState([]);
  const [currentImg1, setCurrentImg1] = useState("");
  const [currentImg2, setCurrentImg2] = useState("");
  let { userid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setShowUserDetails(false);
    toast.loading(<b>Loading...</b>);
    axios
      .get(`https://trendify-ecommerce-backend.onrender.com/user/${userid}/mycomparison`)
      .then((res) => {
        toast.dismiss();
        if (res?.data?.msg === "Comparison Data Fetched Successfully") {
          setComparison(res?.data?.comparelist);
        }
      })
      .catch((err) => {
        toast.dismiss();
        console.log(err?.response?.data);
        toast.error("Something Went Wrong");
      });
  }, [currUser]);

  return (
    <div className="my-comparisons-page flex">
    {
      comparison.length>0 &&
      <h2>Select any two items to compare</h2>
    }
      <div className="my-comparisons flex gap-l">
        {comparison.length === 0 && (
          <div className="my-cart-empty">
            <h2>No Items in Comparison!!</h2>
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
        {comparison?.map((item, index) => (
          <MyComparisonItem
            key={index}
            toCompare={toCompare}
            setToCompare={setToCompare}
            setCurrUser={setCurrUser}
            setCurrentImg1={setCurrentImg1}
            setCurrentImg2={setCurrentImg2}
            item={item}
          />
        ))}
      </div>
      <hr />

      {toCompare?.length === 2 && (
        <div className="compare-container flex gap-s">
          <div className="compare-left">
            <div className="my-comparisons-title"><NavLink to={`/product/${toCompare[0]._id}`}>{toCompare[0]?.title}</NavLink></div>
            <div className="my-comparisons-desc">
              {toCompare[0]?.desc?.length > 70
                ? toCompare[0]?.desc?.substr(0, 70) + "..."
                : toCompare[0]?.desc}
            </div>

            <img
              src={currentImg1 === "" ? toCompare[0]?.mainImg : currentImg1}
              alt=""
            />

            <div className="compare-additional-img flex gap-l">
              <img
                src={toCompare[0]?.mainImg}
                alt=""
                onClick={() => setCurrentImg1(toCompare[0]?.mainImg)}
              />
              {toCompare[0]?.additionalImg.map((img, index) => (
                <img
                  src={img}
                  key={index}
                  alt=""
                  onClick={() => setCurrentImg1(img)}
                />
              ))}
            </div>
            <div className="my-comparisons-oldprice">MRP: ₹{parseFloat(toCompare[0]?.oldprice).toFixed(2)}</div>
            <div className="my-comparisons-price">₹{parseFloat(toCompare[0]?.price).toFixed(2)}</div>
            <div className="my-comparisons-price-off">
              ₹
              {parseFloat(toCompare[0].oldprice - toCompare[0].price).toFixed(
                2
              )}{" "}
              OFF
            </div>

            <div>Vendor: <span className="my-comparison-item">POLO</span></div>
            <div>Product Type: <span className="my-comparison-item">{toCompare[0]?.category}</span></div>

            <div className="flex gap-m">
              Section:
              {toCompare[0]?.section.map((sec, index) => (
                <li className="my-comparison-item" key={index}>{sec}</li>
              ))}
            </div>
            <div>
              {toCompare[0]?.keyword.map((item, index) => (
                <span style={{margin:"0 5px",textDecoration:"underline"}} key={index}>#{item}</span>
              ))}
            </div>
            <div className="my-comparison-item">
              {toCompare[0]?.newSeason
                ? "Recently Added"
                : "Added a long time ago"}
            </div>
          </div>

          <div className="compare-right">
            <div className="my-comparisons-title"><NavLink to={`/product/${toCompare[1]._id}`}>{toCompare[1]?.title}</NavLink></div>
            <div className="my-comparisons-desc">
              {toCompare[1]?.desc?.length > 70
                ? toCompare[1]?.desc?.substr(0, 70) + "..."
                : toCompare[1]?.desc}
            </div>

            <img
              src={currentImg2 === "" ? toCompare[1]?.mainImg : currentImg2}
              alt=""
            />

            <div className="compare-additional-img flex gap-l">
              <img
                src={toCompare[1]?.mainImg}
                alt=""
                onClick={() => setCurrentImg2(toCompare[1]?.mainImg)}
              />
              {toCompare[1]?.additionalImg.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  onClick={() => setCurrentImg2(img)}
                />
              ))}
            </div>

            <div className="my-comparisons-oldprice">MRP: ₹ {parseFloat(toCompare[1]?.oldprice).toFixed(2)}</div>
            <div className="my-comparisons-price">₹{parseFloat(toCompare[1]?.price).toFixed(2)}</div>
            <div className="my-comparisons-price-off">
              ₹
              {parseFloat(toCompare[1]?.oldprice - toCompare[1]?.price).toFixed(
                2
              )}{" "}
              OFF
            </div>
            <div>Vendor: <span className="my-comparison-item">POLO</span></div>
            <div>Product Type:  <span className="my-comparison-item">{toCompare[1]?.category}</span></div>
            <div className="flex gap-m">
              Section:
              {toCompare[1]?.section.map((sec, index) => (
                <li className="my-comparison-item" key={index}>{sec}</li>
              ))}
            </div>

            <div>
              {toCompare[1]?.keyword.map((item, index) => (
                <span style={{margin:"0 5px",textDecoration:"underline"}} key={index}>#{item}</span>
              ))}
            </div>
            <div className="my-comparison-item">
              {toCompare[1]?.newSeason
                ? "Recently Added"
                : "Added a long time ago"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
