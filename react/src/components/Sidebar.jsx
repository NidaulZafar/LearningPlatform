import {Link} from "react-router-dom";
import React from "react";
import './sidebar.scss';

const Sidebar =  () => {
  return (
    <div className="layout has-sidebar fixed-sidebar fixed-header">
    <aside id="sidebar" className="sidebar break-point-sm has-bg-image">
      <a id="btn-collapse" className="sidebar-collapser"><i className="ri-arrow-left-s-line"></i></a>
      <div className="image-wrapper">
        <img src="assets/images/sidebar-bg.jpg" alt="sidebar background"/>
      </div>
      <div className="sidebar-layout">
        <div className="sidebar-header">
          <div className="pro-sidebar-logo">
            <div>K</div>
            <h5>Profile</h5>
          </div>
        </div>
        <div className="sidebar-content">
          <nav className="menu open-current-submenu">
            <ul>
              <li className="menu-header"><span> GENERAL </span></li>
              <li className="menu-item sub-menu">
                <a href="#">
                    <span className="menu-icon">
                      <i className="ri-vip-diamond-fill"></i>
                    </span>
                  <span className="menu-title">Courses</span>
                  <span className="menu-suffix">
                      <span className="badge primary">IMP</span>
                    </span>
                </a>
                <div className="sub-menu-list">
                  <ul>
                    <li className="menu-item">
                      <Link to="/courses">
                        <span className="menu-title">All Courses</span>
                      </Link>
                    </li>
                    <li className="menu-item">
                      <a href="#">
                        <span className="menu-title">Enrolled</span>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="#">
                        <span className="menu-title">Saved</span>
                      </a>
                    </li>
                    <li className="menu-item sub-menu">
                      <a href="#">
                        <span className="menu-title">Completed</span>
                      </a>
                      <div className="sub-menu-list">
                        <ul>
                          <li className="menu-item">
                            <a href="#">
                              <span className="menu-title">Input</span>
                            </a>
                          </li>
                          <li className="menu-item">
                            <a href="#">
                              <span className="menu-title">Select</span>
                            </a>
                          </li>
                          <li className="menu-item sub-menu">
                            <a href="#">
                              <span className="menu-title">More</span>
                            </a>
                            <div className="sub-menu-list">
                              <ul>
                                <li className="menu-item">
                                  <a href="#">
                                    <span className="menu-title">CheckBox</span>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a href="#">
                                    <span className="menu-title">Radio</span>
                                  </a>
                                </li>
                                <li className="menu-item sub-menu">
                                  <a href="#">
                                    <span className="menu-title">Want more ?</span>
                                    <span className="menu-suffix">&#x1F914;</span>
                                  </a>
                                  <div className="sub-menu-list">
                                    <ul>
                                      <li className="menu-item">
                                        <a href="#">
                                          <span className="menu-prefix">&#127881;</span>
                                          <span className="menu-title">You made it </span>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="menu-item sub-menu">
                <a href="#">
                    <span className="menu-icon">
                      <i className="ri-bar-chart-2-fill"></i>
                    </span>
                  <span className="menu-title">Assignments</span>
                </a>
                <div className="sub-menu-list">

                </div>
              </li>
              <li className="menu-item sub-menu">
                <a href="#">
                    <span className="menu-icon">
                      <i className="ri-shopping-cart-fill"></i>
                    </span>
                  <span className="menu-title">Quiz</span>
                </a>
                <div className="sub-menu-list">
                </div>
              </li>
              <li className="menu-item sub-menu">
                <Link to='/announcements'>
                    <span className="menu-icon">
                      <i className="ri-global-fill"></i>
                    </span>
                  <span className="menu-title">Announcements</span>
                </Link>
                <div className="sub-menu-list">
                </div>
              </li>
              <li className="menu-item sub-menu">
                <a href="#">
                    <span className="menu-icon">
                     <i className="ri-paint-brush-fill"></i>
                    </span>
                  <span className="menu-title">Theme</span>
                </a>
                <div className="sub-menu-list">
                  <ul>
                    <li className="menu-item">
                      <a href="#">
                        <span className="menu-title">Dark</span>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="#">
                        <span className="menu-title">Light</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="menu-header" style={{paddingTop: '20px'}}><span> EXTRA </span></li>
              <li className="menu-item">
                <a href="#">
                    <span className="menu-icon">
                      <i className="ri-book-2-fill"></i>
                    </span>
                  <span className="menu-title">Feedback</span>
                  <span className="menu-suffix">
                      <span className="badge secondary">Beta</span>
                    </span>
                </a>
              </li>
              <li className="menu-item">
                <a href="#">
                    <span className="menu-icon">
                      <i className="ri-calendar-fill"></i>
                    </span>
                  <span className="menu-title">Calendar</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="sidebar-footer">
          <div className="footer-box">
            <div>
              <img
                className="react-logo"
                src="https://user-images.githubusercontent.com/25878302/213938106-ca8f0485-3f30-4861-9188-2920ed7ab284.png"
                alt="react"
              />
            </div>
            <div style={{padding: '0 10px'}}>
                <span style={{display: 'block', marginBottom: '10px'}}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, quos!
                </span>
              <div style={{marginBottom: '15px'}}>
                <img
                  alt="preview badge"
                  src="https://img.shields.io/github/stars/azouaoui-med/react-pro-sidebar?style=social"
                />
              </div>
              <div>
                <a href="https://github.com/azouaoui-med/react-pro-sidebar" target="_blank"
                >Check it out!</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>

  )
}

export default Sidebar;
