import React, { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import { useFormik } from 'formik';

import { Card, CardHeader, CardBody, CardFooter } from '~/components/Card';

import Select from '~/components/Form/Select';

import Header from '~/components/Header';

import Row from '~/components/Bootstrap/Row';

import history from '~/services/history';

import { getProfessionalsOptionsRequest } from '~/store/modules/professional/actions';

import { setProcedureToProfessionalRequest } from '~/store/modules/procedure/actions';
import { getProceduresProfessionalsRequest } from '~/store/modules/procedureProfessional/actions';
import api from '~/services/api';

export default function ProceduresProfessionals({ match }) {
  const dispatch = useDispatch();

  const id = useMemo(() => Number(match.params.id), [match.params.id]);

  const professional = useSelector(state => state.professional);
  const procedureProfessional = useSelector(
    state => state.procedureProfessional
  );

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      // tipo de usuário
      professional_id: null,
    },

    onSubmit: values => {
      if (!values.professional_id) {
        toast.error('Selecione um médico');
      } else {
        dispatch(
          setProcedureToProfessionalRequest({
            professional_id: values.professional_id.value,
            procedure_id: id,
          })
        );
      }
    },
  });

  useEffect(() => {
    dispatch(getProfessionalsOptionsRequest());
    dispatch(getProceduresProfessionalsRequest(id));
  }, []);

  async function handleDeleteItem(currentId) {
    api
      .delete(`proceduresProfessionals/${currentId}`)
      .then(() => {
        dispatch(getProceduresProfessionalsRequest(id));
        toast.success('Deletado com sucesso !');
      })
      .catch(() => {});
  }

  return (
    <>
      <Header title="Alocação de profissionais" />
      <div className="content">
        <div className="container">
          <Card>
            <form onSubmit={formik.handleSubmit}>
              <CardHeader description="Aloque um professional para o procedimento selecionado" />
              <CardBody>
                <Row>
                  <Select
                    label="Nome"
                    col="12"
                    value={formik.values.professional_id}
                    handleChangeValue={formik.setFieldValue}
                    name="professional_id"
                    options={professional.options}
                  />
                </Row>

                <ul className="list-group">
                  {procedureProfessional.data.map(item => {
                    return (
                      <li key={item.id} className="list-group-item">
                        <div className="d-flex justify-content-between">
                          {item.name}
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(item.id)}
                            className="btn btn-xs btn-danger"
                          >
                            Deletar
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
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
                  Cadastrar
                </button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
ProceduresProfessionals.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
