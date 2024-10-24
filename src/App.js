import { Route, Routes } from "react-router-dom";
import "./css/App.css";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import EditProfile from "./pages/EditProfile";
import MyCart from "./pages/MyCart";
import WishList from "./pages/WishList";
import MyComparisons from "./pages/MyComparisons";
import Stores from "./pages/Stores";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [currUser, setCurrUser] = useState({});
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let x = 0;
    currUser?.cart?.forEach((item) => {
      x += parseFloat((item?.quantity * item?.productData?.price).toFixed(2));
    });
    setTotalPrice(parseFloat(x.toFixed(2)));
  }, [currUser?.cart]);

  function setLoginValue() {
    let ans = localStorage.getItem("isLogin");
    if (ans == null) {
      ans = false;
    } else if (ans === "true") {
      ans = true;
    } else {
      ans = false;
    }

    setIsLogin(ans);
    let user = localStorage.getItem("currUser");
    if (user == null || user === "null") {
      localStorage.setItem("currUser", "null");
      setCurrUser({});
    } else {
      setCurrUser(JSON.parse(localStorage.getItem("currUser")));
    }
  }

  useEffect(() => {
    setLoginValue();
  }, []);

  // console.log("checkLogin", localStorage.getItem("isLogin"));
  // console.log("isLogin", isLogin);
  // console.log("currUser", currUser);

  return (
    <div className="App">
      <Navbar
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setCurrUser={setCurrUser}
        currUser={currUser}
        showUserDetails={showUserDetails}
        setShowUserDetails={setShowUserDetails}
        showCart={showCart}
        setShowCart={setShowCart}
      />
      <div className="data-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login setCurrUser={setCurrUser} setIsLogin={setIsLogin} />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup setCurrUser={setCurrUser} setIsLogin={setIsLogin} />
            }
          />
          <Route
            path="/product/:id"
            element={<Product setCurrUser={setCurrUser} currUser={currUser} />}
          />
          <Route path="/products/:section" element={<Products />} />
          <Route
            path="/user/:userid/editprofile"
            element={
              <EditProfile
                setCurrUser={setCurrUser}
                setShowUserDetails={setShowUserDetails}
              />
            }
          />
          <Route
            path="/user/:userid/mycart"
            element={
              <MyCart
                setTotalPrice={setTotalPrice}
                totalPrice={totalPrice}
                setCurrUser={setCurrUser}
                setShowCart={setShowCart}
                setShowUserDetails={setShowUserDetails}
              />
            }
          />
          <Route
            path="/user/:userid/mywishlist"
            element={<WishList currUser={currUser} setCurrUser={setCurrUser} />}
          />
          <Route
            path="/user/:userid/mycomparisons"
            element={
              <MyComparisons
                setShowUserDetails={setShowUserDetails}
                currUser={currUser}
                setCurrUser={setCurrUser}
              />
            }
          />

          <Route path="/stores/:searchVal" element={<Stores />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
export default App;
