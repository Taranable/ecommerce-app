import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaAppStoreIos } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import "./footer.css"  //we can use css module here also 
import React from 'react'

function Footer() {
  return (

<footer id="footer">
  <div className="leftFooter">
    <h4>Download this App</h4>
    <p>Download App for Android and IOS mobile phone</p>
    
    <div className="storeIcons">
    <IoLogoGooglePlaystore/>
    <FaAppStoreIos />
    </div>

  </div>


  <div className="midFooter">
        <h1>SHOPKART</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2024 &copy; Shopkart</p>
      </div>



      <div className="rightFooter">
        <h4>Follow Us</h4>
          <FaInstagramSquare />
            <FaLinkedin />
        
      </div>
</footer>














  )
}

export default Footer