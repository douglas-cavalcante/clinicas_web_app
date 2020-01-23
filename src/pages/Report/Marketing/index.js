import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { useFormik } from 'formik';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import Header from '~/components/Header';

import Row from '~/components/Bootstrap/Row';

import api from '~/services/api';

import Table from '~/components/Table';

import { FaRegFilePdf } from 'react-icons/fa';
import DropdownButton from '~/components/DropdownButton';

import { getMarketingReportRequest } from '~/store/modules/report/marketing/actions';

import { logo } from '~/utils/utils';
import Select from '~/components/Form/Select';
import { getProfessionalsOptionsRequest } from '~/store/modules/professional/actions';
import DatePickerInput from '~/components/Form/DatePicker';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
const columns = [
  {
    dataField: 'id',
    text: '#',
    hidden: true,
  },
  {
    dataField: 'profissional',
    text: 'Profissional',
  },
  {
    dataField: 'indicacao',
    text: 'Indicação',
  },
  {
    dataField: 'quantidade',
    text: 'Qtd',
  },
];

export default function MarketingReport() {
  const dispatch = useDispatch();

  const marketingReport = useSelector(state => state.marketingReport);

  const professional = useSelector(state => state.professional);

  const formik = useFormik({
    initialValues: {
      startDate: new Date(),
      endDate: new Date(),
      professional_id: { value: '', label: 'Todos' },
      status: { value: '', label: 'Todos' },
    },
    onSubmit: values => {
      dispatch(
        getMarketingReportRequest({
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
          professional_id: values.professional_id
            ? values.professional_id.value
            : null,
          status: values.status ? values.status.value : null,
        })
      );
    },
  });

  function getPdf(pageOrientation) {
    const data = marketingReport.pdf.map(item => {
      return [
        { text: `${item.profissional} \n\n`, style: 'header' },
        item.indicacoes.map(indicacao => {
          return {
            type: 'square',
            ul: [
              `Indicador: ${indicacao.indicacao}`,
              `Quantidade: ${indicacao.quantidade} \n\n`,
            ],
          };
        }),
      ];
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

        ...data,
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

  useEffect(() => {
    dispatch(getProfessionalsOptionsRequest());
  }, []);

  return (
    <>
      <Header title="Relatório de marketing" />

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
          <Table keyField="id" data={marketingReport.data} columns={columns} />
        </div>
      </div>
    </>
  );
}
