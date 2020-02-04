import React, { useState } from 'react';
import { toast } from 'react-toastify';

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { useFormik } from 'formik';
import { FaRegFile } from 'react-icons/fa';
import { saveAs } from 'file-saver';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import Header from '~/components/Header';

import Row from '~/components/Bootstrap/Row';

import Table from '~/components/Table';

import DropdownButton from '~/components/DropdownButton';

import { logo } from '~/utils/utils';
import Select from '~/components/Form/Select';

import api from '~/services/api';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const columns = [
  {
    dataField: 'id',
    text: 'id',
    hidden: true,
  },
  {
    dataField: 'email',
    text: 'Email',
  },
];

export default function BirthDaysReport() {
  const [data, setData] = useState([]);

  const formik = useFormik({
    initialValues: {
      month: null,
    },
    onSubmit: values => {
      if (!values.month) {
        toast.error('Selecione o mês');
      } else {
        getEmails();
      }
    },
  });

  function saveTxt() {
    let emails = '';
    data.map(item => {
      emails = emails.concat(`${item.email},\n`);
    });

    const blob = new Blob([emails], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'emails.txt');
  }

  async function getEmails() {
    await api
      .post(`birthdaysReport`, {
        month: formik.values.month.value,
      })
      .then(response => {
        setData(response.data);
      })
      .catch(() => {});
  }

  function getPdf(pageOrientation) {
    const labels = ['Email'];

    const dataset = [];

    data.map(item => {
      dataset.push([item.email]);
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
            widths: ['*'],
            headerRows: 1,
            body: [[...labels], ...dataset],
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

  return (
    <>
      <Header title="Relatório de aniversariantes por mês" />

      <div className="content">
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <div className="col-md-6">
                <Select
                  label="Mês"
                  col="12"
                  value={formik.values.month}
                  handleChangeValue={formik.setFieldValue}
                  name="month"
                  options={[
                    { value: 1, label: 'Janeiro' },
                    { value: 2, label: 'Fevereiro' },
                    { value: 3, label: 'Março' },
                    { value: 4, label: 'Abril' },
                    { value: 5, label: 'Maio' },
                    { value: 6, label: 'Junho' },
                    { value: 7, label: 'Julho' },
                    { value: 8, label: 'Agosto' },
                    { value: 9, label: 'Setembro' },
                    { value: 10, label: 'Outubro' },
                    { value: 11, label: 'Novembro' },
                    { value: 12, label: 'Dezembro' },
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
              buttonLabel={<FaRegFile color="#CCC" size={30} />}
              headerLabel="Orientação"
              options={[
                { label: 'Paisagem', onClick: () => getPdf('landscape') },
                { label: 'Retrato', onClick: () => getPdf('portrait') },
                { label: '.txt', onClick: () => saveTxt() },
              ]}
            />
          </div>
          <Table keyField="id" data={data} columns={columns} />
        </div>
      </div>
    </>
  );
}
