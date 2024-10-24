import React from "react";
import "../css/About.css";

export default function About() {
  return (
    <div className="about">
      <div class="container">
        <h1>About Trendify</h1>
        <p>
          Welcome to Trendify, your ultimate destination for all things trendy
          and stylish! At Trendify, we're passionate about curating the latest
          fashion trends and offering a wide range of high-quality products to
          our customers.
        </p>
        <p>
          Our mission is to provide an exceptional shopping experience, where
          you can discover the latest fashion trends, shop for your favorite
          styles, and express your unique sense of style with confidence.
        </p>
        <p>
          Whether you're looking for trendy clothing, accessories, or lifestyle
          products, Trendify has got you covered. With our carefully selected
          collections and hassle-free shopping experience, we strive to inspire
          and empower you to embrace your individuality and stay ahead of the
          curve.
        </p>
        <p>
          Thank you for choosing Trendify. Join us on this fashionable journey,
          and let's make every day a trendsetter!
        </p>

        <div class="owner-details">
          <div className="about-img-container flex">
            <img src="/assets/me in red.jpeg" alt="Akash" class="owner-img" />
          </div>
          <div>
            <h2>Meet the Owner: Akash Mishra</h2>
            <p>
              Hello, I'm Akash, the proud owner of Trendify. With a passion for
              fashion and a keen eye for trends, I founded Trendify to create a
              platform where people can explore the latest styles and express
              their unique sense of fashion.
            </p>
            <p>
              At Trendify, we're committed to providing top-notch customer
              service and delivering the best shopping experience to our valued
              customers. Thank you for being part of our Trendify community!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
