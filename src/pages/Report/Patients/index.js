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

import DropdownButton from '~/components/DropdownButton';

import { logo } from '~/utils/utils';
import Select from '~/components/Form/Select';

import { getProfessionalsOptionsRequest } from '~/store/modules/professional/actions';
import api from '~/services/api';
import DatePickerInput from '~/components/Form/DatePicker';
import { getPatientReportRequest } from '~/store/modules/report/patients/actions';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const columns = [
  {
    dataField: 'criada',
    text: 'Criada',
  },
  {
    dataField: 'agendada',
    text: 'Agendada',
  },
  {
    dataField: 'status',
    text: 'Situação',
  },
  {
    dataField: 'procedimento',
    text: 'Procedimento',
  },
  {
    dataField: 'paciente',
    text: 'Paciente',
  },
  {
    dataField: 'email',
    text: 'Email',
  },
  {
    dataField: 'date_birth',
    text: 'Nascimento',
  },
];

export default function PatientsReport() {
  const dispatch = useDispatch();

  const [proceduresOptions, setProceduresOptions] = useState([]);
  const [partnershipsOptions, setPartnershipsOptions] = useState([]);

  const patientReport = useSelector(state => state.patientReport);

  const professional = useSelector(state => state.professional);

  const formik = useFormik({
    initialValues: {
      startDate: new Date(),
      endDate: new Date(),
      professional_id: null,
      partnership_id: null,
      procedure_id: { value: '', label: 'Todos do convênio' },
      status: { value: '', label: 'Todos' },
    },
    onSubmit: values => {
      if (!values.professional_id) {
        toast.error('Selecione o profissional');
      } else {
        dispatch(
          getPatientReportRequest({
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
            professional_id: values.professional_id
              ? values.professional_id.value
              : null,
            procedure_id: values.procedure_id
              ? values.procedure_id.value
              : null,
            status: values.status ? values.status.value : null,
          })
        );
      }
    },
  });

  useEffect(() => {
    async function loadOptionsProcedures() {
      if (formik.values.partnership_id && formik.values.professional_id) {
        const { value } = formik.values.partnership_id;
        const profesionalId = formik.values.professional_id;
        await api
          .get(
            `proceduresProfessionals/options?professional_id=${profesionalId.value}&partnership_id=${value}`
          )
          .then(response => {
            setProceduresOptions(response.data);
            formik.setValues({
              ...formik.values,
              procedure_id: null,
              value: '',
              value_transferred: '',
              value_payment: '',
            });
          })
          .catch(() => {});
      }
    }
    loadOptionsProcedures();
  }, [formik.values.partnership_id]);

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      partnership_id: null,
      procedure_id: null,
    });
  }, [formik.values.professional_id]);

  function getPdf(pageOrientation) {
    const labels = [
      'Criada',
      'Agendada',
      'Situação',
      'Procedimento',
      'Paciente',
      'Email',
      'Nascimento',
    ];

    const data = [];

    patientReport.data.map(item => {
      data.push([
        item.criada,
        item.agendada,
        item.status,
        item.procedimento,
        item.paciente,
        item.email,
        item.date_birth,
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
          text: `Profissional:  ${
            formik.values.professional_id
              ? formik.values.professional_id.label
              : ''
          } \n \n`,
          fontSize: 20,
          bold: true,
        },

        {
          layout: 'lightHorizontalLines',
          table: {
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
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

  async function getProceduresOptions() {
    await api
      .get(`partnerships/options`)
      .then(response => {
        setPartnershipsOptions(response.data);
      })
      .catch(() => {});
  }

  useEffect(() => {
    getProceduresOptions();
    dispatch(getProfessionalsOptionsRequest());
  }, []);

  return (
    <>
      <Header title="Relatório de pacientes" />

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
                />

                <Select
                  label="Convênio"
                  col="12"
                  value={formik.values.partnership_id}
                  handleChangeValue={formik.setFieldValue}
                  name="partnership_id"
                  options={partnershipsOptions}
                  disabled={!formik.values.professional_id}
                />

                <Select
                  label="Procedimentos"
                  col="12"
                  value={formik.values.procedure_id}
                  handleChangeValue={formik.setFieldValue}
                  name="procedure_id"
                  options={proceduresOptions}
                  disabled={!formik.values.partnership_id}
                />

                <Select
                  label="Situação"
                  col="12"
                  value={formik.values.status}
                  handleChangeValue={formik.setFieldValue}
                  name="status"
                  options={[
                    { value: 'Agendado', label: 'Agendado' },
                    { value: 'Pré-Confirmado', label: 'Pré-Confirmado' },
                    { value: 'Cancelado', label: 'Cancelado' },
                    { value: 'Confirmado', label: 'Confirmado' },
                    { value: 'Autorizado', label: 'Autorizado' },
                    { value: 'Finalizado', label: 'Finalizado' },
                  ]}
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
          <Table keyField="id" data={patientReport.data} columns={columns} />
        </div>
      </div>
    </>
  );
}
