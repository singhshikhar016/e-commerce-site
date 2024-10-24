import React, { useEffect, useState } from "react";
import "../css/Products.css";
import { useParams } from "react-router-dom";
import Lists from "../components/Lists";
import axios from "axios";
import toast from "react-hot-toast";

export default function Products() {
  const [minPriceLimit, setMinPriceLimit] = useState(0);
  const [maxPriceLimit, setMaxPriceLimit] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const section = useParams().section;
  const [sort, setSort] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sectionData, setSectionData] = useState(null);

  useEffect(() => {
    async function setPriceRange() {
      toast.loading(<b>Loading...</b>);
      axios
        .post(`https://trendify-ecommerce-backend.onrender.com/products/${section}/setrange`)
        .then((res) => {
          toast.dismiss();
          setMinPriceLimit(res?.data?.minPriceLimit);
          setMaxPriceLimit(res?.data?.maxPriceLimit);
        })
        .catch((err) => {
          console.log(err?.response?.data);
          toast.dismiss();
          toast.error("Something Went Wrong!!");
        });
    }
    setPriceRange();
  }, [section]);

  useEffect(() => {
    function fetchSectionData() {
      axios
        .post(`https://trendify-ecommerce-backend.onrender.com/products/${section}`, {
          categories,
          maxPrice,
          sort,
        })
        .then((res) => {
          setSectionData(res?.data?.data);
        })
        .catch((err) => {
          toast.dismiss();
          toast.error("Something went wrong!!");
          console.log(err?.response?.data);
        });
    }
    fetchSectionData();
  }, [section, categories, maxPrice, sort]);

  async function filterDataByCategory(e) {
    if (e.target.checked) {
      setCategories([...categories, e.target.value]);
    } else {
      setCategories(categories.filter((cat) => cat !== e.target.value));
    }
  }

  function resetFilterHandler(e, name) {
    if (name === "filter") {
      setMaxPrice(0);
    }
    if (name === "sort") {
      setSort(null);
    }
  }

  return (
    <div className="products flex">
      <div className="left flex gap-l">
        <div className="filter-item flex gap-s">
          <span className="filter-head">Product Categories</span>
          <div className="flex filter-category-row">
            <div className="flex gap-m w-5">
              <input
                type="checkbox"
                name="category"
                id="Watches"
                value="Watches"
                onChange={(event) => filterDataByCategory(event)}
              />
              <label htmlFor="Watches">Watches</label>
            </div>

            <div className="flex gap-m w-5">
              <input
                type="checkbox"
                name="category"
                id="T-Shirt"
                value="T-Shirt"
                onChange={(event) => filterDataByCategory(event)}
              />
              <label htmlFor="T-Shirt">T-shirt</label>
            </div>
          </div>
          <div className="flex filter-category-row">
            <div className="flex gap-m w-5">
              <input
                type="checkbox"
                name="category"
                id="Shoes"
                value="Shoes"
                onChange={(event) => filterDataByCategory(event)}
              />
              <label htmlFor="Shoes">Shoes</label>
            </div>
            <div className="flex gap-m w-5">
              <input
                type="checkbox"
                name="category"
                id="Goggles"
                value="Goggles"
                onChange={(event) => filterDataByCategory(event)}
              />
              <label htmlFor="Goggles">Goggles</label>
            </div>
          </div>
          <div className="flex filter-category-row">
            <div className="flex gap-m w-5">
              <input
                type="checkbox"
                name="category"
                id="Jacket"
                value="Jacket"
                onChange={(event) => filterDataByCategory(event)}
              />
              <label htmlFor="Jacket">Jacket</label>
            </div>

            <div className="flex gap-m w-5">
              <input
                type="checkbox"
                name="category"
                id="Accessories"
                value="Accessories"
                onChange={(event) => filterDataByCategory(event)}
              />
              <label htmlFor="Accessories">Accessories</label>
            </div>
          </div>
        </div>

        <hr />

        <div className="filter-item flex gap-s">
          <div className="flex gap-l">
            <span className="filter-head">Filter by price</span>
            <div className="filter-current-price">₹{maxPrice}</div>
          </div>
          <div className="flex gap-m">
            <span>{minPriceLimit}</span>
            <input
              type="range"
              name="filter-price"
              min={minPriceLimit}
              max={maxPriceLimit}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              style={{ outline: "none" }}
            />
            <span>{maxPriceLimit}</span>
          </div>
          <div
            className="reset-price-filter-btn"
            onClick={(e) => resetFilterHandler(e, "filter")}
          >
            Reset Filter
          </div>
        </div>
        <hr />
        <div className="filter-item flex gap-s">
          <span className="filter-head">Sort by</span>
          <div className="flex gap-m">
            <input
              type="radio"
              name="price"
              value="asc"
              id="price-asc"
              checked={sort === "asc"}
              onChange={(e) => setSort("asc")}
            />
            <label htmlFor="price-asc">Price(Lowest first)</label>
          </div>
          <div className="flex gap-m">
            <input
              type="radio"
              name="price"
              value="desc"
              id="price-desc"
              checked={sort === "desc"}
              onChange={(e) => setSort("desc")}
            />
            <label htmlFor="price-desc">Price(Highest first)</label>
          </div>
          <div
            className="reset-price-filter-btn"
            onClick={(e) => resetFilterHandler(e, "sort")}
          >
            Reset Filter
          </div>
        </div>
      </div>
      <div className="right flex">
        {section === "men" && (
          <img
            src="/assets/portrait-two-handsome-confident-stylish-hipster-lambersexual-models-sexy-modern-men-dressed-white-elegant-suit-fashion-male-posing-studio-near-beige-wall.jpg"
            alt=""
            className="category-img"
            loading="lazy"
          />
        )}
        {section === "women" && (
          <img
            src="/assets/young-beautiful-woman-looking-camera-trendy-girl-casual-summer-white-t-shirt-jeans-shorts-round-sunglasses-positive-female-shows-facial-emotions-funny-model-isola.jpg"
            alt=""
            className="category-img"
            loading="lazy"
          />
        )}
        {section === "child" && (
          <img
            src="/assets/portrait-excited-young-african-man-playing.jpg"
            alt=""
            className="category-img"
            loading="lazy"
          />
        )}
        <Lists sectionData={sectionData} />
      </div>
    </div>
  );
}
