import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { zonedTimeToUtc } from 'date-fns-tz';
import { useFormik } from 'formik';

import api from '~/services/api';

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import TableSchedule from '../../Schedule/List/TableSchedule';

import Header from '~/components/Header';
import DatePickerInput from '~/components/Form/DatePicker';

import Row from '~/components/Bootstrap/Row';
import { getMySchedulesRequest } from '~/store/modules/schedule/actions';

import { getProfessionalsOptionsRequest } from '~/store/modules/professional/actions';
const columns = [
  {
    dataField: 'key',
    text: '#',
    hidden: true,
  },
  {
    dataField: 'created_at',
    text: 'Aberta em',
  },
  {
    dataField: 'date',
    text: 'Agendada para',
  },
  {
    dataField: 'status',
    text: 'Situação',
  },
  {
    dataField: 'start',
    text: 'Início',
    sort: true,
  },
  {
    dataField: 'professional_name',
    text: 'Doutor(a)',
  },
  {
    dataField: 'patient_name',
    text: 'Paciente',
  },

  {
    dataField: 'room',
    text: 'Sala',
  },
  {
    dataField: 'first_phone',
    text: 'Telefone',
  },
  {
    dataField: 'responsible',
    text: 'Responsável',
  },
];

export default function MySchedules() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      // tipo de usuário
      currentDate: new Date(),
    },
    onSubmit: values => {
      dispatch(
        getMySchedulesRequest({
          date: zonedTimeToUtc(values.currentDate, 'America/Sao_Paulo'),
        })
      );
    },
  });

  const schedule = useSelector(state => state.schedule);

  useEffect(() => {
    dispatch(getProfessionalsOptionsRequest());
    dispatch(
      getMySchedulesRequest({
        date: new Date(),
      })
    );
  }, []);

  return (
    <>
      <Header title="Seus agendamentos" />

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
                <button type="submit" className="btn btn-success float-right">
                  Pesquisar
                </button>
              </div>
            </Row>
          </form>
        </div>
        <TableSchedule keyField="key" data={schedule.data} columns={columns} />
      </div>
    </>
  );
}
