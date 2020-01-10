import React, { useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdBook } from 'react-icons/md';

import { CardFooter, CardBody, CardHeader, Card } from '~/components/Card';

import history from '~/services/history';
import Input from '~/components/Form/Input';
import Row from '~/components/Bootstrap/Row';

import Description from '~/components/Description';
import Header from '~/components/Header';

import api from '~/services/api';
import { saveIndicationRequest } from '~/store/modules/indication/actions';

export default function IndicationForm({ match }) {
  const id = useMemo(() => match.params.id, [match.params.id]);

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: '',

      name: '',
    },

    onSubmit: values => {
      if (!values.name) {
        toast.error('O nome da indicação é obrigatório');
      } else {
        dispatch(saveIndicationRequest({ ...values }));
      }
    },
  });

  useEffect(() => {
    async function loadIndication() {
      await api.get(`indications/${id}`).then(response => {
        formik.setValues({
          ...formik.values,
          id: response.data.id,
          name: response.data.name,
        });
      });
    }
    if (id) loadIndication();
  }, []);

  return (
    <>
      <Header title="Indicações" />

      <div className="content">
        <div className="container">
          <Card>
            <form onSubmit={formik.handleSubmit}>
              <CardHeader description="Adicione uma opção de indicação" />
              <CardBody>
                <Description
                  icon={<MdBook color="#495057" size={30} className="mr-2" />}
                  title="Dados da indicação"
                />

                <Row>
                  <Input
                    col="12"
                    label="Nome"
                    id="inputName"
                    type="text"
                    name="name"
                    value={formik.values.name}
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
                  {id ? 'Atualizar' : 'Cadastrar'}
                </button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}

IndicationForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      partnership_id: PropTypes.string,
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
