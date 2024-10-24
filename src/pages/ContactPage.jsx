import React, { useRef } from "react";
import "../css/ContactPage.css";
import { NavLink } from "react-router-dom";
import { FaPinterest } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const formref = useRef();
  const Service_Id = process.env.EMAILJS_SERVICE_ID;
  const Template_Id = process.env.EMAILJS_TEMPLATE_ID;
  const Public_Key = process.env.EMAILJS_PUBLIC_KEY;

  function contactSubmitHandler(e) {
    toast.loading(<b>Loading...</b>);
    e.preventDefault();

    emailjs.sendForm(Service_Id, Template_Id, formref.current, Public_Key).then(
      (result) => {
        toast.dismiss();
        toast.success("Form Submitted Successfully!!");
      },
      (error) => {
        console.log(error.text);
        toast.dismiss();
        toast.error("Something went wrong!!");
      }
    );

    document.querySelector(".contact-form").reset();
  }

  return (
    <div className="contact-page">
      <div class="container animate__animated animate__fadeIn">
        <h1>Contact Trendify</h1>
        <p>
          Have a question or need assistance? Fill out the form below and we'll
          get back to you as soon as possible!
        </p>

        <form
          ref={formref}
          class="contact-form"
          onSubmit={contactSubmitHandler}
        >
          <div class="form-group">
            <label for="contact-name">Your Name</label>
            <input
              type="text"
              id="contact-name"
              name="contact-name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div class="form-group">
            <label for="contact-email">Your Email</label>
            <input
              type="email"
              id="contact-email"
              name="contact-email"
              placeholder="Enter your email-id"
              required
            />
          </div>
          <div class="form-group">
            <label for="contact-message">Your Message</label>
            <textarea
              id="contact-message"
              name="contact-message"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>
          <div class="form-group">
            <input type="submit" value="Send Message" />
          </div>
        </form>

        <div class="social-icons">
          <NavLink
            to="https://www.facebook.com/profile.php?id=100035353590496"
            target="_blank"
          >
            <FaFacebook />
          </NavLink>
          <NavLink
            to="https://www.instagram.com/akash_mishra_1507/"
            target="_blank"
          >
            <FaInstagram />
          </NavLink>
          <NavLink
            to="https://twitter.com/Jeevni15?t=KxS4V1KKVMERkcp9OlTfjw&s=08"
            target="_blank"
          >
            <FaXTwitter />
          </NavLink>
          <NavLink
            to="https://en.wikipedia.org/wiki/Amazon_(company)"
            target="_blank"
          >
            <FaGoogle />
          </NavLink>
          <NavLink to="https://in.pinterest.com/" target="_blank">
            <FaPinterest />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
