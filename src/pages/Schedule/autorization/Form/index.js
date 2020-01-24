import React, { useState, useEffect, useMemo } from 'react';

import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdPeople } from 'react-icons/md';

import { CardFooter, CardBody, CardHeader, Card } from '~/components/Card';

import history from '~/services/history';

import Row from '~/components/Bootstrap/Row';

import Description from '~/components/Description';
import Header from '~/components/Header';

import api from '~/services/api';

import MoneyInput from '~/components/Form/MoneyInput';

import Textarea from '~/components/Form/Textarea';

import CreatableSelect from '~/components/Form/CreatableSelect/CreatableSelect';

export default function AuthorizationForm({ match }) {
  const [formPaymentsOptions, setFormPaymentsOptions] = useState([]);

  const id = useMemo(() => match.params.id, [match.params.id]);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      form_payment_id: null,
      value_payment: '',
      observations_payment: '',
    },

    onSubmit: async values => {
      if (!values.form_payment_id) {
        toast.error('A forma de pagamento é obrigatória');
      } else {
        await api
          .put(`schedules/authorization/${id}`, {
            ...values,
            form_payment_id: values.form_payment_id.value,
          })
          .then(() => {
            history.goBack();
            toast.success('Autorizado com sucesso');
          })
          .catch(() => {
            toast.error('Ocorreu um erro ao tentar adicionar essa opção');
          });
      }
    },
  });

  async function handleCreateFormPaymentOption(inputValue) {
    await api
      .post('formPayments', { name: inputValue })
      .then(response => {
        toast.success(`${inputValue} adicionado`);
        formik.setValues({
          ...formik.values,
          form_payment_id: response.data,
        });
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao tentar adicionar essa opção');
      });
  }

  async function handleLoadFormPaymentOptions() {
    await api
      .get(`formPayments/options`)
      .then(response => {
        setFormPaymentsOptions(response.data);
      })
      .catch(() => {});
  }

  useEffect(() => {
    handleLoadFormPaymentOptions();
  }, []);

  return (
    <>
      <Header title="Autorização de agendamento" />

      <div className="content">
        <div className="container">
          <Card>
            <form onSubmit={formik.handleSubmit}>
              <CardHeader description="" />

              <CardBody>
                <Description
                  icon={<MdPeople color="#495057" size={30} className="mr-2" />}
                  title="Dados do pagamento desse procedimento"
                />

                <Row>
                  <CreatableSelect
                    label="Forma de pagamento"
                    col="6"
                    value={formik.values.form_payment_id}
                    handleChangeValue={formik.setFieldValue}
                    name="form_payment_id"
                    options={formPaymentsOptions}
                    handleCreate={handleCreateFormPaymentOption}
                    loadOptions={handleLoadFormPaymentOptions}
                  />
                  <MoneyInput
                    col="6"
                    label="Valor do pagamento"
                    id="value_paymentInput"
                    name="value_payment"
                    value={formik.values.value_payment}
                    onChange={formik.setFieldValue}
                  />
                </Row>
                <Row>
                  <Textarea
                    col="12"
                    label="Observações"
                    id="inputDescription"
                    name="observations_payment"
                    value={formik.values.observations_payment}
                    placeholder="Digite observações relevantes para o pagamento desse agendamento."
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
                  Autorizar
                </button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}

AuthorizationForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      partnership_id: PropTypes.string,
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
