// resources/js/views/StudentProfile.jsx

import React, {useEffect, useState} from 'react';
import axiosClient from '../axios-client';
// import './sidebar.js';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axiosClient.get('/student-profile')
      .then(response => setStudent(response.data))
      .catch(error => console.error('Error fetching student profile:', error));
  }, []);


  if (!student) {
    return <div>Loading...</div>;
  }

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
                  <a href="#">
                    <span className="menu-icon">
                      <i className="ri-global-fill"></i>
                    </span>
                    <span className="menu-title">Announcements</span>
                  </a>
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
      <div id="overlay" className="overlay"></div>
      <div className="layout">
        <main className="content">
          <div>
            <a id="btn-toggle" href="#" className="sidebar-toggler break-point-sm">
              <i className="ri-menu-line ri-xl"></i>
            </a>
            <h1 style={{marginBottom: '0'}}>Student Profile</h1>
            <span style={{display: 'inline-block'}}>
              Here you can see your student profile.
            </span>
            <br/>
          </div>
          <div>
            <div className="mb-3">
              <strong>Name:</strong> {student.name}
            </div>
            <div className="mb-3">
              <strong>Email:</strong> {student.email}
            </div>
            <div className="mb-3">
              <strong>Education:</strong> {student.education || 'Not provided'}
            </div>
            <div className="mb-3">
              <strong>Phone:</strong> {student.phone || 'Not provided'}
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <strong>Bio:</strong> {student.bio || 'Not provided'}
              </div>
              <div className="mb-3">
                <strong>Avatar:</strong> {student.avatar ?
                <img src={student.avatar} alt="Avatar" className="img-fluid"/> : 'Not provided'}
              </div>
            </div>
          </div>

          <div>
            <h2>Features</h2>
            <ul>
              <li>Fully responsive</li>
              <li>Collapsable sidebar</li>
              <li>Multi level menu</li>
              <li>RTL support</li>
              <li>Customizable</li>
            </ul>
          </div>
          <div>
            <h2>Resources</h2>
            <ul>
              <li>
                <a target="_blank" href="https://github.com/azouaoui-med/css-pro-layout">
                  Css Pro Layout</a
                >
              </li>
              <li>
                <a target="_blank" href="https://github.com/popperjs/popper-core"> Popper Core</a>
              </li>
              <li>
                <a target="_blank" href="https://remixicon.com/"> Remix Icons</a>
              </li>
            </ul>
          </div>
          <footer className="footer">
            <small style={{marginBottom: '20px', display: 'inline-block'}}>
              © 2023 made with
              <span style={{color: 'red', fontSize: '18px'}}>&#10084;</span> by -
              <a target="_blank" href="https://azouaoui.netlify.com"> Mohamed Azouaoui </a>
            </small>
            <br/>
            <div className="social-links">
              <a href="https://github.com/azouaoui-med" target="_blank">
                <i className="ri-github-fill ri-xl"></i>
              </a>
              <a href="https://twitter.com/azouaoui_med" target="_blank">
                <i className="ri-twitter-fill ri-xl"></i>
              </a>
              <a href="https://codepen.io/azouaoui-med" target="_blank">
                <i className="ri-codepen-fill ri-xl"></i>
              </a>
              <a href="https://www.linkedin.com/in/mohamed-azouaoui/" target="_blank">
                <i className="ri-linkedin-box-fill ri-xl"></i>
              </a>
            </div>
          </footer>
        </main>
        <div className="overlay"></div>
      </div>
    </div>
  );
};

export default StudentProfile;
