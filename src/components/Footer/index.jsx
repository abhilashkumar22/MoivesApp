import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="social-icons-container">
      <FaGoogle className="social-icon" />
      <FaTwitter className="social-icon" />
      <FaInstagram className="social-icon" />
      <FaYoutube className="social-icon" />
    </div>
    <p className="contact-us-text">Contact us</p>
  </div>
)

export default Footer
