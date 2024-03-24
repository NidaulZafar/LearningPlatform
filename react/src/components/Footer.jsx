import React from "react";
import {Link} from "react-router-dom";
import './styles/footer.css';

const Footer = () => {
  return (<footer className="sticky-footer">
    <small>
      © 2024 made with
      <span>&#10084;</span> by -
      <Link target="_blank" href="#"> Zee </Link>
    </small>
    <br/>
    <div className="social-links">
      <Link href="https://github.com/nidaulzafar" target="_blank">
        <i className="ri-github-fill ri-xl"></i>
      </Link>
      <Link href="https://twitter.com/" target="_blank">
        <i className="ri-twitter-fill ri-xl"></i>
      </Link>
      <Link href="https://codepen.io/" target="_blank">
        <i className="ri-codepen-fill ri-xl"></i>
      </Link>
      <Link href="https://www.linkedin.com/in/nidaulzafar/" target="_blank">
        <i className="ri-linkedin-box-fill ri-xl"></i>
      </Link>
    </div>
  </footer>)
}

export default Footer;
