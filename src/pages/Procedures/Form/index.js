import React, { useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdLibraryBooks, MdMonetizationOn } from 'react-icons/md';

import { CardFooter, CardBody, CardHeader, Card } from '~/components/Card';

import history from '~/services/history';
import Input from '~/components/Form/Input';
import Row from '~/components/Bootstrap/Row';

import Description from '~/components/Description';
import Header from '~/components/Header';
import Textarea from '~/components/Form/Textarea';
import MoneyInput from '~/components/Form/MoneyInput';
import { saveProcedureRequest } from '~/store/modules/procedure/actions';
import api from '~/services/api';

export default function ProceduresForm({ match }) {
  const partnershipId = useMemo(() => match.params.partnership_id, [
    match.params.partnership_id,
  ]);
  const id = useMemo(() => match.params.id, [match.params.id]);

  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: '',
      code: '',
      name: '',
      description: '',
      observation: '',

      value: 0,
      value_transferred: 0,
    },

    onSubmit: values => {
      if (!values.name) {
        toast.error('O nome do procedimento é obrigatório');
      } else if (values.id) {
        // atualização
        dispatch(saveProcedureRequest({ ...values }));
      } else {
        // cadastro
        dispatch(
          saveProcedureRequest({ ...values, partnership_id: partnershipId })
        );
      }
    },
  });

  useEffect(() => {
    async function loadPartnership() {
      await api.get(`procedures/${id}`).then(response => {
        formik.setValues({
          ...formik.values,
          id: response.data.id,
          code: response.data.code,
          name: response.data.name,
          description: response.data.description,
          observation: response.data.observation,
          value: Number(response.data.value),
          value_transferred: Number(response.data.value_transferred),
        });
      });
    }
    if (id) loadPartnership();
  }, []);

  return (
    <>
      <Header title="Procedimentos" />

      <div className="content">
        <div className="container">
          <Card>
            <form onSubmit={formik.handleSubmit}>
              <CardHeader description="Adicione um novo procedimento para o convênio" />
              <CardBody>
                <Description
                  icon={
                    <MdLibraryBooks
                      color="#495057"
                      size={30}
                      className="mr-2"
                    />
                  }
                  title="Dados do procedimento"
                />

                <Row>
                  <Input
                    col="4"
                    label="Código"
                    id="inputCode"
                    type="text"
                    name="code"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                  />

                  <Input
                    col="8"
                    label="Nome"
                    id="inputName"
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                </Row>
                <Row>
                  <Textarea
                    col="12"
                    label="Descrição"
                    id="inputDescription"
                    name="description"
                    value={formik.values.description}
                    placeholder="Digite uma descrição referente a esse procedimento"
                    onChange={formik.handleChange}
                  />
                </Row>
                <Row>
                  <Textarea
                    col="12"
                    label="Observação"
                    id="inputObservation"
                    name="observation"
                    value={formik.values.observation}
                    placeholder="Digite uma observação referente a esse procedimento"
                    onChange={formik.handleChange}
                  />
                </Row>
                <Description
                  icon={
                    <MdMonetizationOn
                      color="#495057"
                      size={30}
                      className="mr-2"
                    />
                  }
                  title="Valores"
                />
                <Row>
                  {!id && (
                    <MoneyInput
                      col="6"
                      label="Valor"
                      id="inputValue"
                      name="value"
                      value={formik.values.value}
                      onChange={formik.setFieldValue}
                    />
                  )}

                  {id && formik.values.value && (
                    <MoneyInput
                      col="6"
                      label="Valor"
                      id="inputValue"
                      name="value"
                      value={formik.values.value}
                      onChange={formik.setFieldValue}
                    />
                  )}

                  {!id && (
                    <MoneyInput
                      col="6"
                      label="Valor de repasse"
                      id="inputValueTransferred"
                      name="value_transferred"
                      value={formik.values.value_transferred}
                      onChange={formik.setFieldValue}
                    />
                  )}

                  {id && formik.values.value && (
                    <MoneyInput
                      col="6"
                      label="Valor de repasse"
                      id="inputValueTransferred"
                      name="value_transferred"
                      value={formik.values.value_transferred}
                      onChange={formik.setFieldValue}
                    />
                  )}
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

ProceduresForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      partnership_id: PropTypes.string,
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
