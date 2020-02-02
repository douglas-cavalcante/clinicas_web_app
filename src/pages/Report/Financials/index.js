import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { useFormik } from 'formik';
import { FaRegFilePdf } from 'react-icons/fa';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import Header from '~/components/Header';

import Row from '~/components/Bootstrap/Row';

import Table from '~/components/Table';

import { logo } from '~/utils/utils';
// Componentes de formulário
import Select from '~/components/Form/Select';
import DatePickerInput from '~/components/Form/DatePicker';
import DropdownButton from '~/components/DropdownButton';

import api from '~/services/api';
import { getFinancialReportRequest } from '~/store/modules/report/financials/actions';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const columns = [
  {
    dataField: 'id',
    text: 'id',
    hidden: true,
  },
  {
    dataField: 'transaction_type',
    text: '#',
  },
  {
    dataField: 'date',
    text: 'Data',
  },
  {
    dataField: 'value',
    text: 'Valor',
  },
  {
    dataField: 'type_name',
    text: 'Recorrência',
  },
  {
    dataField: 'account_name',
    text: 'Conta',
  },
  {
    dataField: 'movement_category_name',
    text: 'Categoria',
  },
  {
    dataField: 'creditor_debtor_name',
    text: 'Credor/Devedor',
  },
  {
    dataField: 'observations',
    text: 'Observações',
  },
];

export default function FinancialReport() {
  const dispatch = useDispatch();

  const financialReport = useSelector(state => state.financialReport);

  const [typesOptions, setTypesOptions] = useState([]);
  const [accountsOptions, setAccountsOptions] = useState([]);
  const [creditorsDebtorsOptions, setCreditorsDebtorsOptions] = useState([]);
  const [movementCategoriesOptions, setMovementCategoriesOptions] = useState(
    []
  );

  const formik = useFormik({
    initialValues: {
      startDate: new Date(),
      endDate: new Date(),

      transaction_type: null,
      account_id: null,
      creditor_debtor_id: null,
      type_id: null,
      movement_category_id: null,
    },
    onSubmit: values => {
      dispatch(
        getFinancialReportRequest({
          startDate: new Date(
            values.startDate.getFullYear(),
            values.startDate.getMonth(),
            values.startDate.getDate()
          ),
          endDate: new Date(
            values.endDate.getFullYear(),
            values.endDate.getMonth(),
            values.endDate.getDate()
          ),
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
    },
  });

  function getPdf(pageOrientation) {
    const labels = [
      '#',
      'Data',
      'Valor',
      'Recorrência',
      'Conta',
      'Categoria',
      'Credor/Devedor',
      'Observações',
    ];

    const data = [];

    financialReport.data.map(item => {
      data.push([
        item.transaction_type,
        item.date,
        item.value,
        item.type_name,
        item.account_name,
        item.movement_category_name,
        item.creditor_debtor_name,
        item.observations,
      ]);
    });

    const docDefinition = {
      pageOrientation,
      watermark: {
        text: 'Evolutio',
        color: '#CCC',
        opacity: 0.2,
        bold: true,
        italics: false,
        fontSize: 60,
      },
      content: [
        {
          image: logo,

          width: 80,
          style: 'rightme',
        },

        {
          layout: 'lightHorizontalLines',
          table: {
            widths: [
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
            ],
            headerRows: 1,
            body: [[...labels], ...data],
          },
        },
      ],

      defaultStyle: {
        fontSize: 12,
      },
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
        },
        info: {
          fontSize: 12,
          alignment: 'left',
        },
        rightme: {
          alignment: 'center',
          margin: [10, 0, 0, 10],
        },
      },
    };

    pdfMake.createPdf(docDefinition).download();
    toast.success('Sucesso! Verifique sua caixa de download');
  }

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

  useEffect(() => {
    loadMovementCategoriesOptions();
    loadCreditorsDebtorsOptions();
    loadTypesOptions();
    loadAccountsOptions();
  }, []);

  return (
    <>
      <Header title="Relatório de movimentações financeira" />

      <div className="content">
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <div className="col-md-6">
                <DatePickerInput
                  name="startDate"
                  onChange={formik.setFieldValue}
                  value={formik.values.startDate}
                />
                <DatePickerInput
                  name="endDate"
                  onChange={formik.setFieldValue}
                  value={formik.values.endDate}
                />
              </div>
              <div className="col-md-6">
                <Select
                  label="Tipo da movimentação"
                  col="12"
                  value={formik.values.transaction_type}
                  handleChangeValue={formik.setFieldValue}
                  name="transaction_type"
                  options={[
                    { value: '1', label: 'Entrada' },
                    { value: '2', label: 'Saída' },
                  ]}
                />
                <Select
                  label="Recorrência"
                  col="12"
                  value={formik.values.type_id}
                  handleChangeValue={formik.setFieldValue}
                  name="type_id"
                  options={typesOptions}
                />
                <Select
                  label="Conta"
                  col="12"
                  value={formik.values.account_id}
                  handleChangeValue={formik.setFieldValue}
                  name="account_id"
                  options={accountsOptions}
                />
                <Select
                  label="Credor/Devedor"
                  col="12"
                  value={formik.values.creditor_debtor_id}
                  handleChangeValue={formik.setFieldValue}
                  name="creditor_debtor_id"
                  options={creditorsDebtorsOptions}
                />
                <Select
                  label="Categoria"
                  col="12"
                  value={formik.values.movement_category_id}
                  handleChangeValue={formik.setFieldValue}
                  name="movement_category_id"
                  options={movementCategoriesOptions}
                />

                <button
                  type="submit"
                  className="btn btn-success float-right mb-4"
                >
                  Pesquisar
                </button>
              </div>
            </Row>
          </form>

          <div className="float-right">
            <DropdownButton
              buttonLabel={<FaRegFilePdf color="#D4241B" size={30} />}
              headerLabel="Orientação"
              options={[
                { label: 'Paisagem', onClick: () => getPdf('landscape') },
                { label: 'Retrato', onClick: () => getPdf('portrait') },
              ]}
            />
          </div>
          <Table keyField="id" data={financialReport.data} columns={columns} />
        </div>
      </div>
    </>
  );
}
