import React from "react";
import './footer.css';

const Footer = () => {
  return (
    <footer className="sticky-footer">
      <small style={{marginBottom: '20px', display: 'inline-block'}}>
        © 2024 made with
        <span style={{color: 'red', fontSize: '18px'}}>&#10084;</span> by -
        <a target="_blank" href="#"> Zee </a>
      </small>
      <br/>
      <div className="social-links">
        <a href="https://github.com/nidaulzafar" target="_blank">
          <i className="ri-github-fill ri-xl"></i>
        </a>
        <a href="https://twitter.com/" target="_blank">
          <i className="ri-twitter-fill ri-xl"></i>
        </a>
        <a href="https://codepen.io/" target="_blank">
          <i className="ri-codepen-fill ri-xl"></i>
        </a>
        <a href="https://www.linkedin.com/in/nidaulzafar/" target="_blank">
          <i className="ri-linkedin-box-fill ri-xl"></i>
        </a>
      </div>
    </footer>

  )
}

export default Footer;
