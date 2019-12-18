import React from 'react';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

export default function Navbar() {
  return (
    <nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
      <div className="container">
        <a href="../../index3.html" className="navbar-brand">
          <img
            src="../../dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: 0.8 }}
          />
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </a>

        <button
          className="navbar-toggler order-1"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse order-3" id="navbarCollapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="index3.html" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <Link to="" className="nav-link">
                Contact
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                className="nav-link dropdown-toggle"
              >
                Dropdown
              </Link>
              <ul
                aria-labelledby="dropdownSubMenu1"
                className="dropdown-menu border-0 shadow"
              >
                <li>
                  <a href="#" className="dropdown-item">
                    Some action{' '}
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    Some other action
                  </a>
                </li>

                <li className="dropdown-divider"></li>

                <li className="dropdown-submenu dropdown-hover">
                  <Link
                    id="dropdownSubMenu2"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    className="dropdown-item dropdown-toggle"
                  >
                    Hover for action
                  </Link>
                  <ul
                    aria-labelledby="dropdownSubMenu2"
                    className="dropdown-menu border-0 shadow"
                  >
                    <li>
                      <Link tabIndex="-1" href="#" className="dropdown-item">
                        level 2
                      </Link>
                    </li>

                    <li className="dropdown-submenu">
                      <a
                        id="dropdownSubMenu3"
                        href="#"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        className="dropdown-item dropdown-toggle"
                      >
                        level 2
                      </a>
                      <ul
                        aria-labelledby="dropdownSubMenu3"
                        className="dropdown-menu border-0 shadow"
                      >
                        <li></li>
                        <li></li>
                      </ul>
                    </li>

                    <li></li>
                    <li></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
          <div className="media">
            <img
              src="../../dist/img/user1-128x128.jpg"
              alt="User Avatar"
              className="img-size-50 mr-3 img-circle"
            />
            <div className="media-body">
              <h3 className="dropdown-item-title">Brad Diesel</h3>
              <p className="text-sm">Recepcionista</p>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
}
