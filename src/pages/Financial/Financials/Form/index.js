import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdMonetizationOn } from 'react-icons/md';

import { CardFooter, CardBody, CardHeader, Card } from '~/components/Card';

import history from '~/services/history';
import Input from '~/components/Form/Input';
import Row from '~/components/Bootstrap/Row';

import Description from '~/components/Description';
import Header from '~/components/Header';
import Textarea from '~/components/Form/Textarea';

import api from '~/services/api';

import MoneyInput from '~/components/Form/MoneyInput';
import CreatableSelect from '~/components/Form/CreatableSelect/CreatableSelect';
import Select from '~/components/Form/Select';
import { saveFinancialRequest } from '~/store/modules/financial/financials/actions';
import Show from '~/components/Show';

export default function FinancialsForm({ match }) {
  const id = useMemo(() => match.params.id, [match.params.id]);

  const [typesOptions, setTypesOptions] = useState([]);
  const [accountsOptions, setAccountsOptions] = useState([]);
  const [creditorsDebtorsOptions, setCreditorsDebtorsOptions] = useState([]);
  const [movementCategoriesOptions, setMovementCategoriesOptions] = useState(
    []
  );

  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: '',

      transaction_type: { value: '1', label: 'Entrada' },
      account_id: null,

      value: 0,
      date: '',
      creditor_debtor_id: null,
      type_id: null,
      movement_category_id: null,

      observations: '',
    },

    onSubmit: values => {
      if (!values.account_id) {
        toast.error('Selecione a conta dessa movimentação');
      } else if (!values.value) {
        toast.error('Insirao valor dessa movimentação');
      } else if (!values.date) {
        toast.error('Insirao a data dessa movimentação');
      } else if (!values.creditor_debtor_id) {
        toast.error('Selecione o credor ou devedor dessa movimentação');
      } else if (!values.type_id) {
        toast.error('Selecione a recorrência dessa movimentação');
      } else if (!values.movement_category_id) {
        toast.error('Selcione a categoria dessa movimentação');
      } else {
        dispatch(
          saveFinancialRequest({
            ...values,
            transaction_type: values.transaction_type
              ? values.transaction_type.value
              : null,
            account_id: values.account_id ? values.account_id.value : null,
            creditor_debtor_id: values.creditor_debtor_id
              ? values.creditor_debtor_id.value
              : null,
            type_id: values.type_id ? values.type_id.value : null,
            movement_category_id: values.movement_category_id
              ? values.movement_category_id.value
              : null,
          })
        );
      }
    },
  });

  async function loadTypesOptions() {
    await api
      .get(`types/options`)
      .then(response => {
        setTypesOptions(response.data);
      })
      .catch(() => {});
  }

  async function loadCreditorsDebtorsOptions() {
    await api
      .get(`creditorsDebtors/options`)
      .then(response => {
        setCreditorsDebtorsOptions(response.data);
      })
      .catch(() => {});
  }

  async function loadMovementCategoriesOptions() {
    await api
      .get(`movementCategories/options`)
      .then(response => {
        setMovementCategoriesOptions(response.data);
      })
      .catch(() => {});
  }

  async function loadAccountsOptions() {
    await api
      .get(`accounts/options`)
      .then(response => {
        setAccountsOptions(response.data);
      })
      .catch(() => {});
  }

  async function loadFinancial() {
    await api.get(`financials/${id}`).then(response => {
      formik.setValues({
        ...formik.values,
        id: response.data.id,

        transaction_type: response.data.transaction_type
          ? {
              value: response.data.transaction_type,
              label:
                response.data.transaction_type === '1' ? 'Entrada' : 'Saída',
            }
          : null,
        account_id: response.data.account
          ? {
              value: response.data.account.id,
              label: response.data.account.label,
            }
          : null,

        value: response.data.value,
        date: format(new Date(response.data.date), 'yyyy-MM-dd'),
        creditor_debtor_id: response.data.creditor_debtor
          ? {
              value: response.data.creditor_debtor.id,
              label: response.data.creditor_debtor.label,
            }
          : null,
        type_id: response.data.type
          ? {
              value: response.data.type.id,
              label: response.data.type.label,
            }
          : null,
        movement_category_id: response.data.movement_category
          ? {
              value: response.data.movement_category.id,
              label: response.data.movement_category.label,
            }
          : null,

        observations: response.data.observations,
      });
    });
  }

  async function handleCreateMovementCategoryOption(inputValue) {
    await api
      .post('movementCategories', { name: inputValue })
      .then(response => {
        toast.success(`${inputValue} adicionado`);
        loadMovementCategoriesOptions();
        formik.setValues({
          ...formik.values,
          movement_category_id: response.data,
        });
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao tentar adicionar essa opção');
      });
  }

  async function handleCreateCreditorDebtorOption(inputValue) {
    await api
      .post('creditorsDebtors', { name: inputValue })
      .then(response => {
        toast.success(`${inputValue} adicionado`);
        loadCreditorsDebtorsOptions();
        formik.setValues({
          ...formik.values,
          creditor_debtor_id: response.data,
        });
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao tentar adicionar essa opção');
      });
  }

  useEffect(() => {
    loadMovementCategoriesOptions();
    loadCreditorsDebtorsOptions();
    loadTypesOptions();
    loadAccountsOptions();

    if (id) loadFinancial();
  }, []);

  return (
    <>
      <Header title={id ? 'Movimentação' : 'Nova Movimentação'} />

      <div className="content">
        <div className="container">
          <Card>
            <form onSubmit={formik.handleSubmit}>
              <CardHeader
                description={
                  id
                    ? 'Detalhes da movimentação'
                    : 'Adicione um nova movimentação de entrada ou saída'
                }
              />
              <CardBody>
                <Row>
                  <Select
                    label="Tipo da movimentação"
                    col="4"
                    value={formik.values.transaction_type}
                    handleChangeValue={formik.setFieldValue}
                    name="transaction_type"
                    options={[
                      { value: '1', label: 'Entrada' },
                      { value: '2', label: 'Saída' },
                    ]}
                    disabled={id}
                  />
                  <Select
                    label="Conta"
                    col="4"
                    value={formik.values.account_id}
                    handleChangeValue={formik.setFieldValue}
                    name="account_id"
                    options={accountsOptions}
                    disabled={id}
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
                  title="Dados da movimentação"
                  disabled={id}
                />

                <Row>
                  {!id && (
                    <MoneyInput
                      col="4"
                      label="Valor"
                      id="inputValue"
                      name="value"
                      value={formik.values.value}
                      onChange={formik.setFieldValue}
                      disabled={id}
                    />
                  )}

                  {id && formik.values.value && (
                    <MoneyInput
                      col="4"
                      label="Valor"
                      id="inputValue"
                      name="value"
                      value={formik.values.value}
                      onChange={formik.setFieldValue}
                      disabled={id}
                    />
                  )}

                  <Input
                    col="4"
                    label="Data"
                    id="inputDate"
                    type="date"
                    name="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    disabled={id}
                  />

                  <CreatableSelect
                    label={
                      formik.values.transaction_type.value === '1'
                        ? 'Receber de: '
                        : 'Pagar a: '
                    }
                    col="4"
                    value={formik.values.creditor_debtor_id}
                    handleChangeValue={formik.setFieldValue}
                    name="creditor_debtor_id"
                    options={creditorsDebtorsOptions}
                    handleCreate={handleCreateCreditorDebtorOption}
                    loadOptions={loadMovementCategoriesOptions}
                    disabled={id}
                  />
                </Row>
                <Row>
                  <CreatableSelect
                    label="Categoria"
                    col="4"
                    value={formik.values.movement_category_id}
                    handleChangeValue={formik.setFieldValue}
                    name="movement_category_id"
                    options={movementCategoriesOptions}
                    handleCreate={handleCreateMovementCategoryOption}
                    loadOptions={loadMovementCategoriesOptions}
                    disabled={id}
                  />
                  <Select
                    label="Recorrência"
                    col="4"
                    value={formik.values.type_id}
                    handleChangeValue={formik.setFieldValue}
                    name="type_id"
                    options={typesOptions}
                    disabled={id}
                  />
                </Row>
                <Row>
                  <Textarea
                    col="12"
                    label="Observações"
                    id="inputDescription"
                    name="observations"
                    value={formik.values.observations}
                    placeholder="Digite observações relevantes para essa movimentação."
                    onChange={formik.handleChange}
                    disabled={id}
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
                <Show display={!id}>
                  <button type="submit" className="btn btn-success float-right">
                    Cadastrar
                  </button>
                </Show>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}

FinancialsForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      partnership_id: PropTypes.string,
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
