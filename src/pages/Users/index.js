import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { MdLock } from 'react-icons/md';
import { Card, CardHeader, CardBody, CardFooter } from '~/components/Card';

import Header from '~/components/Header';
import Description from '~/components/Description';
import Row from '~/components/Bootstrap/Row';
import Input from '~/components/Form/Input';
import history from '~/services/history';

import { saveUserRequest } from '~/store/modules/professional/actions';
import api from '~/services/api';

export default function UsersForm({ match }) {
  const dispatch = useDispatch();

  const id = useMemo(() => match.params.id, [match.params.id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: '',
      username: '',
      password: '',
    },

    onSubmit: values => {
      if (!values.username) {
        toast.error('O usuário é obrigatório');
      } else if (!formik.values.id && !values.password) {
        toast.error('A senha é obrigatória');
      } else {
        dispatch(
          saveUserRequest({
            ...values,
            professional_id: id,
          })
        );
      }
    },
  });

  useEffect(() => {
    async function loadUser() {
      await api.get(`users/${id}`).then(response => {
        formik.setValues({
          ...formik.values,
          id: response.data.id,
          username: response.data.username,
        });
      });
    }
    if (id) loadUser();
  }, []);

  return (
    <>
      <Header title="Login" />
      <div className="content">
        <div className="container">
          <Card>
            <form onSubmit={formik.handleSubmit}>
              <CardHeader description="Adicione um acesso de login para o professional" />
              <CardBody>
                <Description
                  icon={<MdLock color="#495057" size={30} className="mr-2" />}
                  title="Dados de login"
                />
                <Row>
                  <Input
                    col="6"
                    label="Usuário *"
                    id="inputusername"
                    type="text"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                  <Input
                    col="6"
                    label="Senha secreta"
                    id="inputPassword"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                </Row>
              </CardBody>
              <CardFooter>
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={() => history.goBack()}
                >
                  Voltar
                </button>
                <button type="submit" className="btn btn-success float-right">
                  {formik.values.id ? 'Atualizar' : 'Cadastrar'}
                </button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}

UsersForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
