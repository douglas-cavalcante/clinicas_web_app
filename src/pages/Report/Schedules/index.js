import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { useFormik } from 'formik';
import { FaRegFilePdf } from 'react-icons/fa';
import { format } from 'date-fns';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ptBR } from 'date-fns/locale';
import Header from '~/components/Header';
import DatePickerInput from '~/components/Form/DatePicker';
import Select from '~/components/Form/Select';

import Row from '~/components/Bootstrap/Row';

import api from '~/services/api';
import { getProfessionalsOptionsRequest } from '~/store/modules/professional/actions';
import Table from '~/components/Table';
import { getSchedulesReportRequest } from '~/store/modules/report/schedule/actions';

import DropdownButton from '~/components/DropdownButton';

import { formatValues, logo } from '~/utils/utils';
import SwitchButton from '~/components/Form/SwitchButton';
import { getUsersOptionsRequest } from '~/store/modules/user/actions';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
const columns = [
  {
    dataField: 'id',
    text: '#',
    hidden: true,
  },
  {
    dataField: 'status',
    text: 'Situação',
  },
  {
    dataField: 'date',
    text: 'Data',
  },
  {
    dataField: 'user_name',
    text: 'Responsável',
  },
  {
    dataField: 'professional_name',
    text: 'Profissional',
  },
  {
    dataField: 'patient_name',
    text: 'Paciente',
  },
  {
    dataField: 'procedure_name',
    text: 'Procedimento',
  },
  {
    dataField: 'form_payment',
    text: 'Tipo de pagamento',
  },
  {
    dataField: 'value_transferred_mask',
    text: 'Repasse',
  },
  {
    dataField: 'value_payment_mask',
    text: 'Valor de pagamento',
  },
  {
    dataField: 'observations_payment',
    text: 'Observação do pagamento',
  },
];

export default function ScheduleReport() {
  const dispatch = useDispatch();

  const [idProfessional, setIdProfessional] = useState('');
  const [formPaymentsOptions, setFormPaymentsOptions] = useState([]);

  const professional = useSelector(state => state.professional);
  const user = useSelector(state => state.user);
  const scheduleReport = useSelector(state => state.scheduleReport);

  const formik = useFormik({
    initialValues: {
      // tipo de usuário
      startDate: new Date(),
      endDate: new Date(),
      professional_id: { value: '', label: '' },
      user_id: { value: '', label: 'Todos' },
      status: '',
      form_payment_id: { value: '', label: 'Todos' },
      change_value: true,
    },
    onSubmit: values => {
      dispatch(
        getSchedulesReportRequest({
          ...values,
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
          professional_id: idProfessional
            ? idProfessional
            : values.professional_id
            ? values.professional_id.value
            : null,
          form_payment_id: values.form_payment_id
            ? values.form_payment_id.value
            : null,
          status: values.status ? values.status.value : null,
          user_id: values.user_id ? values.user_id.value : null,
        })
      );
    },
  });

  async function handleLoadFormPaymentOptions() {
    await api
      .get(`formPayments/options`)
      .then(response => {
        setFormPaymentsOptions(response.data);
      })
      .catch(() => {});
  }

  useEffect(() => {
    if (
      user.profile.professional &&
      (user.profile.professional.role_id == 4 ||
        user.profile.professional.role_id == 5)
    ) {
      setIdProfessional(user.profile.professional.id);
    } else {
      dispatch(getProfessionalsOptionsRequest());
    }

    dispatch(getUsersOptionsRequest());
    handleLoadFormPaymentOptions();
  }, []);

  function getPdf(pageOrientation) {
    const labels = [
      'Situação',
      'Data',
      'Responsável',
      'Doutor(a)',
      'Paciente',
      'Procedimento',
      'Repasse',
      'Pagamento',
      'Tipo',
      'Observações',
    ];

    const data = [];

    const somaValorTransferido = scheduleReport.data.reduce(
      (prevVal, elem) => prevVal + elem.value_transferred,
      0
    );

    const somaValorPagamento = scheduleReport.data.reduce(
      (prevVal, elem) => prevVal + elem.value_payment,
      0
    );

    scheduleReport.data.map(item => {
      data.push([
        item.status,
        item.date,
        item.user_name,
        item.professional_name,
        item.patient_name,
        item.procedure_name,
        item.value_transferred_mask,
        item.value_payment_mask,
        item.form_payment,
        item.observations_payment,
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
              'auto',
              'auto',
            ],
            headerRows: 1,
            body: [[...labels], ...data],
          },
        },

        {
          text:
            formik.values.change_value === false
              ? `\n \n \n Total do valor de pagamento: ${formatValues(
                  somaValorPagamento
                )} \n \n \n \n`
              : '',
          style: {
            fontSize: 14,
            bold: true,
            margin: [10, 0, 0, 10],
          },
        },

        {
          text:
            formik.values.change_value === true
              ? `\n \n \n Total do valor de repasse: ${formatValues(
                  somaValorTransferido
                )} \n \n \n \n`
              : '',
          style: {
            fontSize: 14,
            margin: [10, 0, 0, 10],
            bold: true,
          },
        },

        {
          text: [
            {
              text: `EU, `,
              fontSize: 10,
              style: {
                alignment: 'center',
              },
            },
            {
              text: `${formik.values.professional_id.label.toUpperCase()} `,
              fontSize: 10,
              style: {
                alignment: 'center',
                decoration: 'underline',
              },
            },
            {
              text: `,RECEBI DA CLÍNICA,\n`,
              fontSize: 10,
              style: {
                alignment: 'center',
              },
            },

            {
              text: `A QUANTIA DE ${
                formik.values.change_value
                  ? formatValues(somaValorTransferido)
                  : formatValues(somaValorPagamento)
              }\n`,
              fontSize: 10,
              style: {
                alignment: 'center',
              },
            },
            {
              text: `REFERENTE AOS ATENDIMENTOS CLÍNICOS DO PERÍODO DE `,
              fontSize: 10,
              style: {
                alignment: 'center',
              },
            },

            {
              text: `${format(
                formik.values.startDate,
                'dd/MM/yyyy'
              )} a  ${format(formik.values.endDate, 'dd/MM/yyyy')} \n `,
              fontSize: 10,
              style: {
                alignment: 'center',
                bold: true,
              },
            },

            {
              text: `FORTALEZA, CEARÁ, ${format(
                new Date(),
                'dd/MM/yyyy hh:mm:ss a'
              )} \n\n`,
              fontSize: 10,
              style: {
                alignment: 'center',
              },
            },
            {
              text: ' \n DECLARAÇÃO \n\n\n',
              fontSize: 12,
              bold: true,
              style: {
                alignment: 'center',
              },
            },

            {
              text: '__________________________________________ \n',
              fontSize: 10,
              bold: true,
              style: {
                alignment: 'center',
                margin: [10, 10],
              },
            },
            {
              text: 'Assinatura do profissional',
              fontSize: 12,

              style: {
                alignment: 'center',
                margin: [10, 10],
              },
            },
          ],
        },
      ],

      defaultStyle: {
        fontSize: 7,
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

  return (
    <>
      <Header title="Relatório de produção" />

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
                  label="Profissional"
                  col="12"
                  value={formik.values.professional_id}
                  handleChangeValue={formik.setFieldValue}
                  name="professional_id"
                  options={professional.options}
                  disabled={idProfessional}
                />
                <Select
                  label="Situação"
                  col="12"
                  value={formik.values.status}
                  handleChangeValue={formik.setFieldValue}
                  name="status"
                  options={[
                    { value: 'Agendado', label: 'Agendados' },
                    { value: 'Pré-Confirmado', label: '1ª confirmação' },
                    { value: 'Cancelado', label: 'Cancelados' },
                    { value: 'Confirmado', label: 'Confirmados' },
                    { value: 'Autorizado', label: 'Autorizados' },
                    { value: 'Finalizado', label: 'Finalizados' },
                  ]}
                />
                <Select
                  label="Forma de pagamento"
                  col="12"
                  value={formik.values.form_payment_id}
                  handleChangeValue={formik.setFieldValue}
                  name="form_payment_id"
                  options={formPaymentsOptions}
                />

                <Select
                  label="Responsável"
                  col="12"
                  value={formik.values.user_id}
                  handleChangeValue={formik.setFieldValue}
                  name="user_id"
                  options={user.options}
                />
                <SwitchButton
                  col="12"
                  onChange={formik.setFieldValue}
                  name="change_value"
                  label="Utiliza qual valor ?"
                  id="change_vALUE_ID"
                  checked={formik.values.change_value}
                  offlabel="Utiliza valor de pagamento"
                  onlabel="Utiliza valor de repasse"
                />
                <button type="submit" className="btn btn-success float-right">
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
          <Table keyField="id" data={scheduleReport.data} columns={columns} />
        </div>
      </div>
    </>
  );
}
