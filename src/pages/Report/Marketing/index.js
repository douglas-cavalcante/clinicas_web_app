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
import CreatableSelect from '~/components/Form/CreatableSelect/CreatableSelect';
import { logo } from '~/utils/utils';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
const columns = [
  {
    dataField: 'id',
    text: '#',
    hidden: true,
  },
  {
    dataField: 'count',
    text: '#',
  },
  {
    dataField: 'status',
    text: 'Situação',
  },
  {
    dataField: 'start',
    text: 'Início',
  },
  {
    dataField: 'date',
    text: 'Data',
  },
  {
    dataField: 'procedure_name',
    text: 'Procedimento',
  },
  {
    dataField: 'patient_name',
    text: 'Nome',
  },
  {
    dataField: 'patient_date_birth',
    text: 'Data de nascimento',
  },
  {
    dataField: 'professional_name',
    text: 'Profissional',
  },
  {
    dataField: 'patient_email',
    text: 'Email',
  },
  {
    dataField: 'patient_first_phone',
    text: '1º contato',
  },
  {
    dataField: 'neighborhood',
    text: 'Bairro',
  },
  {
    dataField: 'patient_second_phone',
    text: '2º contato',
  },
  {
    dataField: 'patient_instagram',
    text: 'Instagram',
  },
  {
    dataField: 'patient_whatsapp',
    text: 'Whatsapp',
  },

  {
    dataField: 'indication_name',
    text: 'Indicação',
  },
];

export default function MarketingReport() {
  const dispatch = useDispatch();

  const [indicationsOptions, setIndicationsOptions] = useState([]);
  const marketingReport = useSelector(state => state.marketingReport);

  const formik = useFormik({
    initialValues: {
      indication_id: { value: '', label: 'Todos' },
    },
    onSubmit: values => {
      dispatch(
        getMarketingReportRequest({
          ...values,
          indication_id: values.indication_id
            ? values.indication_id.value
            : null,
        })
      );
    },
  });

  async function handleLoadIndicationsOptions(inputValue = '') {
    await api
      .get(`indications?term=${inputValue}`)
      .then(response => {
        setIndicationsOptions(response.data);
      })
      .catch(() => {});
  }

  async function handleCreateIndicationOption(inputValue) {
    await api
      .post('indications', { name: inputValue })
      .then(response => {
        toast.success(`${inputValue} adicionado`);
        formik.setValues({
          ...formik.values,
          indication_id: response.data,
        });
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao tentar adicionar essa opção');
      });
  }

  useEffect(() => {
    handleLoadIndicationsOptions();
  }, []);

  function getPdf(pageOrientation) {
    const labels = [
      '#',
      'status',
      'Início',
      'Data',
      'Procedimento',
      'Paciente',
      'Nascimento',
      'Profissional',
      'Email',
      '1º Contato',
      '2º Contato',
      'Instagram',
      'Whatsapp',
      'Indicação',
    ];

    const data = [];

    marketingReport.data.map(item => {
      data.push([
        item.count,
        item.status,
        item.start,
        item.date,
        item.procedure_name,
        item.patient_name,
        item.patient_date_birth,
        item.professional_name,

        item.patient_first_phone,
        item.patient_email,
        item.patient_second_phone,
        item.patient_instagram,
        item.patient_whatsapp,
        item.indication_name,
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

          width: 50,
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
              40,
              'auto',
              'auto',
              40,
              'auto',
            ],
            headerRows: 1,
            body: [[...labels], ...data],
          },
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
      <Header title="Relatório de marketing" />

      <div className="content">
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <div className="col-md-12">
                <CreatableSelect
                  label="Indicação"
                  col="12"
                  value={formik.values.indication_id}
                  handleChangeValue={formik.setFieldValue}
                  name="indication_id"
                  options={indicationsOptions}
                  handleCreate={handleCreateIndicationOption}
                  loadOptions={handleLoadIndicationsOptions}
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
