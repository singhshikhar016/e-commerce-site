import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import FeaturedProducts from "../components/FeaturedProducts";
import Categories from "../components/Categories";
import Contact from "../components/Contact";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    toast.loading(<b>Loading...</b>, {
      style: {
        zIndex: 4,
      },
    });
    async function fetchProducts() {
      await axios
        .get("https://trendify-ecommerce-backend.onrender.com/")
        .then((res) => {
          toast.dismiss();
          setFeaturedProducts(res.data.featured);
          setTrendingProducts(res.data.trending);
        })
        .catch((err) => {
          toast.dismiss();
          toast.error("Something Went Wrong");
          console.log(err);
        });
    }
    fetchProducts();
  }, []);

  return (
    <div className="home">
      <Slider />
      <FeaturedProducts
        title="Featured Products"
        desc="
        Featured products represent the pinnacle of quality, innovation, and style, curated to meet the diverse needs and preferences of our valued customers. From cutting-edge electronics to fashion-forward apparel and everything in between, our collection of featured products showcases the best-in-class offerings from top brands and emerging designers."
        data={featuredProducts}
      />
      <Categories />
      <FeaturedProducts
        title="Trending Products"
        desc="Trending products embody the pulse of contemporary culture, reflecting the latest trends, innovations, and consumer preferences. From fashion-forward apparel to cutting-edge gadgets and lifestyle essentials, our trending collection captures the essence of what's hot and in-demand right now. With a finger on the pulse of the market, we continuously curate our selection to showcase the most sought-after products, ensuring our customers stay ahead of the curve. Whether it's the newest fashion silhouette or the latest tech gadget. "
        data={trendingProducts}
      />
      <Contact />
    </div>
  );
}
