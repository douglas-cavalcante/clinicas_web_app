import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';

import Table from '~/components/Table';
import history from '~/services/history';

import Header from '~/components/Header';
import DatePickerInput from '~/components/Form/DatePicker';
import Select from '~/components/Form/Select';

import Row from '~/components/Bootstrap/Row';
import { getSchedulesRequest } from '~/store/modules/schedule/actions';

const columns = [
  {
    dataField: 'checked',
    text: 'Situação',
  },
  {
    dataField: 'start',
    text: 'Início',
  },
  {
    dataField: 'professional_name',
    text: 'Doutor',
  },
  {
    dataField: 'date',
    text: 'Data',
  },
  {
    dataField: 'room',
    text: 'Sala',
  },
];

export default function SchedulesList() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      // tipo de usuário
      currentDate: new Date(),
      professional_id: null,
    },
    onSubmit: values => {
      dispatch(
        getSchedulesRequest({
          date: values.currentDate,
        })
      );
    },
  });

  const professional = useSelector(state => state.professional);
  const schedule = useSelector(state => state.schedule);

  function handleRedirectToForm(item) {
    history.push(`/agendamentos/novo`, {
      currentDate: formik.values.currentDate,
      item,
    });
  }

  useEffect(() => {
    dispatch(
      getSchedulesRequest({
        date: new Date(),
      })
    );
  }, []);

  return (
    <>
      <Header title="Agendamento" />

      <div className="content">
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <div className="col-md-6">
                <DatePickerInput
                  name="currentDate"
                  onChange={formik.setFieldValue}
                  value={formik.values.currentDate}
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
                <button type="submit" className="btn btn-success float-right">
                  Pesquisar
                </button>
              </div>
            </Row>
          </form>

          <Table
            keyField="name"
            data={schedule.data}
            columns={columns}
            extrasColumns={[
              {
                text: 'Agendar',
                className: 'btn btn-sm btn-info',
                onClick: handleRedirectToForm,
                buttonText: 'Agendar',
                keyConditionButtonText: null,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
