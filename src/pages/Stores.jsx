import React, { useEffect, useState } from "react";
import "../css/Stores.css";
import Card from "../components/Card";
import axios from "axios";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import { useParams } from "react-router-dom";

export default function Stores() {
  const { searchVal } = useParams();
  const [allData, setAllData] = useState([]);
  const [search, setSearch] = useState(
    searchVal === "allproducts" ? "" : searchVal
  );

  useEffect(() => {
    function fetchStoreData() {
      toast.loading(<b>Loading...</b>);
      axios
        .post(`https://trendify-ecommerce-backend.onrender.com/stores`, { search })
        .then((res) => {
          toast.dismiss();
          if (res?.data?.msg === "Fetched Stores Data") {
            setAllData(res?.data?.data);
          }
        })
        .catch((err) => {
          console.log(err?.response?.data);
          toast.dismiss();
          toast.error("Something Went error!!");
        });
    }
    fetchStoreData();
  }, [search]);

  function searchChangeHandler(e) {
    setSearch(e.target.value);
  }

  return (
    <div className="stores-page flex">
      <form
        action=""
        className="stores-serach-form flex"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          name="item"
          id="search-item"
          placeholder="Search eg:Mens, Shoes, Noise Watches"
          onChange={searchChangeHandler}
        />
        <button type="submit">
          <IoSearch />
        </button>
      </form>
      <div className="stores flex gap-m">
        {allData?.length === 0 && (
          <h3>No items Found!! Try some other keywords.</h3>
        )}
        {allData?.map((data) => (
          <Card key={data?._id} data={data} />
        ))}
      </div>
    </div>
  );
}
