import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { zonedTimeToUtc } from 'date-fns-tz';
import { useFormik } from 'formik';

import TableSchedule from './TableSchedule';
import history from '~/services/history';

import Header from '~/components/Header';
import DatePickerInput from '~/components/Form/DatePicker';
import Select from '~/components/Form/Select';

import Row from '~/components/Bootstrap/Row';
import { getSchedulesRequest } from '~/store/modules/schedule/actions';

import api from '~/services/api';
import { getProfessionalsOptionsRequest } from '~/store/modules/professional/actions';

const columns = [
  {
    dataField: 'key',
    text: '#',
    hidden: true,
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
    text: 'Doutor',
  },
  {
    dataField: 'date',
    text: 'Agendada',
  },
  {
    dataField: 'room',
    text: 'Sala',
  },
  {
    dataField: 'created_at',
    text: 'Aberta em',
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

export default function SchedulesList() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      // tipo de usuário
      currentDate: new Date(),
      professional_id: '',
    },
    onSubmit: values => {
      dispatch(
        getSchedulesRequest({
          date: zonedTimeToUtc(values.currentDate, 'America/Sao_Paulo'),
          professional_id: formik.values.professional_id.value,
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

  function handleCancelSchedule(item) {
    confirmAlert({
      title: 'Cancelamento',
      message: 'Deseja realmente cancelar ?',
      buttons: [
        {
          label: 'Sim',
          onClick: () =>
            api
              .put(`schedules/cancel/${item.id}`)
              .then(() => {
                toast.success('Cancelado com sucesso!');
                dispatch(
                  getSchedulesRequest({
                    date: formik.values.currentDate,
                  })
                );
              })
              .catch(() => {}),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  }

  function handleConfirmSchedule(item) {
    confirmAlert({
      title: 'Confirmação',
      message: 'Deseja realmente confirmar ?',
      buttons: [
        {
          label: 'Sim',
          onClick: () =>
            api
              .put(`schedules/confirm/${item.id}`)
              .then(() => {
                toast.success('Confirmado com sucesso!');
                dispatch(
                  getSchedulesRequest({
                    date: formik.values.currentDate,
                  })
                );
              })
              .catch(() => {}),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  }

  function handleAuthorize(item) {
    history.push(`/agendamentos/${item.id}/autorizacao`, {
      item,
    });
  }

  useEffect(() => {
    dispatch(getProfessionalsOptionsRequest());
    dispatch(
      getSchedulesRequest({
        date: new Date(),
        professional_id: formik.values.professional_id.value,
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
        </div>
        <TableSchedule
          keyField="key"
          data={schedule.data}
          columns={columns}
          extrasColumns={[
            {
              text: 'Agendar',
              className: 'btn btn-sm btn-info',
              onClick: handleRedirectToForm,
              buttonText: 'Agendar',
              status: 'Liberado',
            },
            {
              text: 'Cancelar',
              className: 'btn btn-sm btn-danger',
              onClick: handleCancelSchedule,
              buttonText: 'Cancelar',
              status: 'Agendado',
            },
            {
              text: 'Confirmar',
              className: 'btn btn-sm btn-warning',
              onClick: handleConfirmSchedule,
              buttonText: 'Confirmar',
              status: 'Agendado',
            },
            {
              text: 'Autorizar',
              className: 'btn btn-sm btn-success',
              onClick: handleAuthorize,
              buttonText: 'Autorizar',
              status: 'Confirmado',
            },
          ]}
        />
      </div>
    </>
  );
}
