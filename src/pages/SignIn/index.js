import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import logo from '~/assets/logo.jpeg';

import Input from '~/components/Form/Input';

import { signInRequest } from '~/store/modules/auth/actions';

// import { Container } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      username: '',
      password: '',
    },

    onSubmit: values => {
      const { username, password } = values;
      if (!username) {
        toast.error('O usuário é obrigatório');
      } else if (!password) {
        toast.error('A senha é obrigatória');
      } else {
        dispatch(signInRequest(username, password));
      }
    },
  });

  return (
    <div classNameName="login-box">
      <div className="login-logo">
        <div className="text-center">
          <img
            src={logo}
            className="rounded ml-4"
            style={{ width: '300px' }}
            alt="..."
          />
        </div>
      </div>

      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Faça login para iniciar sua sessão</p>

          <form onSubmit={formik.handleSubmit}>
            <Input
              col="12"
              label="Usuário *"
              id="inputUsername"
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            <Input
              col="12"
              label="Senha *"
              id="inputPassword"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <button type="submit" className="btn btn-success float-right">
              Logar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
