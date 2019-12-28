import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

export default function Navbar() {
  const [showDropdownOne, setShowDropdownOne] = useState(false);
  return (
    <nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
      <div className="container">
        <a href="../../index3.html" className="navbar-brand">
          <img
            src="data:image/jpeg;base64,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"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: 0.8 }}
          />
          <span className="brand-text font-weight-light">Evoluttion</span>
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
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li
              className={`nav-item dropdown ${showDropdownOne ? 'show' : ''}`}
            >
              <a
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                className="nav-link dropdown-toggle"
                onClick={() => setShowDropdownOne(!showDropdownOne)}
              >
                Agendamentos
              </a>
              <ul
                aria-labelledby="dropdownSubMenu1"
                className={`dropdown-menu border-0 shadow ${
                  showDropdownOne ? 'show' : ''
                }`}
              >
                <li>
                  <Link to="/convenios" className="dropdown-item">
                    Convênios
                  </Link>
                </li>

                <li className="dropdown-divider" />

                <li>
                  <Link to="/empresa" className="dropdown-item">
                    Empresa
                  </Link>
                </li>

                <li>
                  <Link to="/horarios" className="dropdown-item">
                    Horários de funcionamento
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
          <div className="media">
            <img
              src="http://s1.dmcdn.net/u/6vURj1TyiTcgLlxwb/200x200"
              alt="User Avatar"
              className="img-size-50 mr-3 img-circle"
            />
            <div className="media-body">
              <h3 className="dropdown-item-title">Dona Graça</h3>
              <p className="text-sm">Recepcionista</p>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
}
