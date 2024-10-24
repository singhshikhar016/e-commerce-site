import React, { useState } from "react";
import "../css/myComparisonItem.css";
import { NavLink, useParams } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import axios from "axios";

export default function MyComparisonItem({
  toCompare,
  setToCompare,
  item,
  setCurrUser,
  setCurrentImg1,
  setCurrentImg2
}) {
  const [selectedForComparison, setSelectedForComparison] = useState(false);
  let { userid } = useParams();

  function selectIconClickHandler(btnType) {
    if (btnType === "removed") {
      const newComparison = toCompare?.filter((pre) => pre._id !== item._id);
      setToCompare(newComparison);
      setSelectedForComparison(false);
    } else if (btnType === "added") {
      if (toCompare?.length === 2) {
        return toast.error(<b>Two items already selected for Comparison</b>, {
          icon: "⚠️",
          duration: 5000,
          style: {
            textAlign: "center",
          },
        });
      }

      let newComparison = [...toCompare, item];
      setToCompare(newComparison);
      setSelectedForComparison(true);
    }
  }

  function deleteFromComparisonHandler() {
    setSelectedForComparison(false);
    setCurrentImg1("");
    setCurrentImg2("");
    let itemid = item._id;

    const newComparison = toCompare?.filter((pre) => pre._id !== itemid);
    setToCompare(newComparison);

    toast.loading(<b>Loading...</b>);
    axios
      .post(`https://trendify-ecommerce-backend.onrender.com/user/${userid}/deletefromcomparison`, {
        itemid,
      })
      .then((res) => {
        toast.dismiss();
        if (res?.data?.msg === "Deleted from Comparison") {
          setCurrUser(res?.data?.user);
          localStorage.setItem("currUser", JSON.stringify(res?.data?.user));
          toast.success("Item deleted from Comparison List", {
            duration: 8000,
          });
        }
      })
      .catch((err) => {
        console.log(err?.response?.data);
        toast.dismiss();
        toast.error("Something  went wrong!!");
      });
  }

  return (
    <div className="my-comparsion-item flex">
      {selectedForComparison ? (
        <FaRegCheckCircle
          className="select-icon"
          onClick={() => selectIconClickHandler("removed")}
        />
      ) : (
        <abbr title="Select for Comparison">
          <FaRegCircle
            className="select-icon"
            onClick={() => selectIconClickHandler("added")}
          />
        </abbr>
      )}

      <div
        className="my-comparison-del-btn flex"
        onClick={deleteFromComparisonHandler}
      >
        <abbr title="Remove from Comparison List">
          <MdDelete />
        </abbr>
      </div>

      <NavLink to={`/product/${item._id}`}>
        <img src={item?.mainImg} alt="" />
      </NavLink>
      <hr />
      <div className="my-comparison-item-title">{item?.title}</div>
      <div className="flex gap-s my-comparison-item-price-container">
        <div className="my-comparison-item-price">
          ₹{parseFloat(item?.price).toFixed(2)}
        </div>
        <div className="my-comparison-item-oldprice">
          MRP : ₹{parseFloat(item?.oldprice).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
