import React from 'react';
import '../css/contact.css';
import { FaPinterest } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

export default function Contact() {
  return (
    <div className='contact flex'>
      <span>BE IN TOUCH WITH US: </span>
      <div className="email-form">
        <input type="email" name="email" id="email" placeholder='Enter your Email...' />
        <button className='join-us-btn'>JOIN US</button>
      </div>
      <div className="contact-icons flex">
       <NavLink to="https://www.facebook.com/profile.php?id=100035353590496" target='_blank'><FaFacebook className='contact-icon'/></NavLink>
       <NavLink to="https://www.instagram.com/akash_mishra_1507/" target='_blank'><FaInstagram className='contact-icon'/></NavLink>
       <NavLink to="https://twitter.com/Jeevni15?t=KxS4V1KKVMERkcp9OlTfjw&s=08" target='_blank'><FaXTwitter className='contact-icon'/></NavLink>
       <NavLink to="https://en.wikipedia.org/wiki/Amazon_(company)" target='_blank'><FaGoogle className='contact-icon'/></NavLink>
       <NavLink to="https://in.pinterest.com/" target='_blank'><FaPinterest className='contact-icon'/></NavLink>
      </div>
    </div>
  )
}
