import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '~/store/modules/auth/actions';
import { store } from '~/store';
import Show from '../Show';

// import { Container } from './styles';

export default function Navbar() {
  const dispatch = useDispatch();
  const { profile } = store.getState().user;

  const user = useSelector(state => state.user);

  const [showDropdownOne, setShowDropdownOne] = useState(false);
  const [showDropdownTwo, setShowDropdownTwo] = useState(false);

  function handleClickAgendamentos() {
    setShowDropdownOne(!showDropdownOne);
  }

  function handleClickFinanceiro() {
    setShowDropdownTwo(!showDropdownTwo);
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <nav className="main-header navbar navbar-expand-md navbar-light navbar-primary">
      <div className="container">
        <Link to="/dashboard" className="navbar-brand">
          <span className="brand-text font-weight-bold ml-2 text-light">
            EVOLUTIO
          </span>
        </Link>

        <div
          className="collapse navbar-collapse order-3 show"
          id="navbarCollapse"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link text-light">
                Home
              </Link>
            </li>
            <Show
              display={
                profile.professional.role_id == '1' ||
                profile.professional.role_id == '2' ||
                profile.professional.role_id == '3'
              }
            >
              <li
                className={`nav-item dropdown ${showDropdownOne ? 'show' : ''}`}
              >
                <a
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  className="nav-link dropdown-toggle text-light"
                  onClick={handleClickAgendamentos}
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
                    <Link
                      to="/convenios"
                      className="dropdown-item"
                      onClick={() => setShowDropdownOne(false)}
                    >
                      Convênios
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profissionais"
                      className="dropdown-item"
                      onClick={() => setShowDropdownOne(false)}
                    >
                      Profissionais
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pacientes"
                      className="dropdown-item"
                      onClick={() => setShowDropdownOne(false)}
                    >
                      Pacientes
                    </Link>
                  </li>

                  <li className="dropdown-divider" />

                  <li>
                    <Link
                      to="/empresa"
                      className="dropdown-item"
                      onClick={() => setShowDropdownOne(false)}
                    >
                      Empresa
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/horarios"
                      className="dropdown-item"
                      onClick={() => setShowDropdownOne(false)}
                    >
                      Horários de funcionamento
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/salas"
                      className="dropdown-item"
                      onClick={() => setShowDropdownOne(false)}
                    >
                      Salas
                    </Link>
                  </li>
                  <li className="dropdown-divider" />

                  <li>
                    <Link
                      to="/agendamentos"
                      className="dropdown-item"
                      onClick={() => setShowDropdownOne(false)}
                    >
                      Agendamentos
                    </Link>
                  </li>
                </ul>
              </li>
            </Show>

            <Show
              display={
                profile.professional.role_id == '1' ||
                profile.professional.role_id == '3'
              }
            >
              <li
                className={`nav-item dropdown ${showDropdownTwo ? 'show' : ''}`}
              >
                <a
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  className="nav-link dropdown-toggle text-light"
                  onClick={handleClickFinanceiro}
                >
                  Financeiro
                </a>
                <ul
                  aria-labelledby="dropdownSubMenu1"
                  className={`dropdown-menu border-0 shadow ${
                    showDropdownTwo ? 'show' : ''
                  }`}
                >
                  <li>
                    <Link
                      to="/movimentacoes"
                      className="dropdown-item"
                      onClick={() => setShowDropdownTwo(false)}
                    >
                      Movimentações
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contas"
                      className="dropdown-item"
                      onClick={() => setShowDropdownTwo(false)}
                    >
                      Contas
                    </Link>
                  </li>
                </ul>
              </li>
            </Show>
            <Show
              display={
                profile.professional.role_id == '5' ||
                profile.professional.role_id == '4'
              }
            >
              <li className="nav-item">
                <Link to="/meus_agendamentos" className="nav-link text-light">
                  Minha agenda
                </Link>
              </li>
            </Show>
            <li className="nav-link text-light" onClick={handleSignOut}>
              Sair
            </li>
          </ul>
        </div>

        <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
          <div className="media">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgNUGnd0DxYZg8krnpMlVSl_IEF59wjp5Vy3sFpYmm2fzeOJVGXQ&s"
              alt="User Avatar"
              className="img-size-50 mr-3 img-circle"
            />
            <div className="media-body">
              <h3 className="dropdown-item-title text-light">
                {user &&
                  user.profile.professional &&
                  user.profile.professional.name}
              </h3>
              <p className="text-sm">
                <h3 className="dropdown-item-title text-light">
                  {user &&
                    user.profile.professional &&
                    user.profile.professional.role &&
                    user.profile.professional.role.name}
                </h3>
              </p>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
}
