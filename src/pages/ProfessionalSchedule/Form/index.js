import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { MdPermContactCalendar } from 'react-icons/md';
import { Card, CardHeader, CardBody, CardFooter } from '~/components/Card';

import Select from '~/components/Form/Select';

import Header from '~/components/Header';
import Description from '~/components/Description';
import Row from '~/components/Bootstrap/Row';
import Input from '~/components/Form/Input';
import history from '~/services/history';

import { dayOptions } from '~/utils/utils';
import api from '~/services/api';
import { saveProfessionalScheduleRequest } from '~/store/modules/professionalSchedule/actions';

export default function ProfessionalScheduleForm({ match }) {
  const dispatch = useDispatch();

  const id = useMemo(() => match.params.id, [match.params.id]);
  const agendaId = useMemo(() => match.params.agenda_id, [
    match.params.agenda_id,
  ]);

  const [currentProfessional, setCurrentProfessional] = useState('');

  const [roomsOptions, setRoomsOptions] = useState([]);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: '',
      day: '',
      start: '',
      end: '',
      duration: '',
      quantity: '',
      room_id: '',
    },

    onSubmit: values => {
      const { day, start, end, duration, room_id, quantity, id } = values;

      if (!day || !start || !end || !duration || !room_id) {
        toast.error('Preencha todos os campos');
      } else {
        dispatch(
          saveProfessionalScheduleRequest({
            day: day.value,
            start,
            end,
            duration,
            room_id: room_id.value,
            quantity,
            professional_id: id,
            id,
          })
        );
      }
    },
  });

  async function loadSchedule() {
    await api.get(`professionalSchedule/${agendaId}`).then(response => {
      const dayOption = dayOptions.find(
        item => item.value === response.data.day
      );

      formik.setValues({
        ...formik.values,
        id: response.data.id,
        day: dayOption,
        start: response.data.start,
        end: response.data.end,
        duration: response.data.duration,
        room_id: {
          value: response.data.room.id,
          label: response.data.room.name,
        },
        quantity: response.data.quantity,
      });
    });
  }

  async function loadProfessional() {
    await api.get(`professionals/${id}`).then(response => {
      setCurrentProfessional(response.data.name);
    });
  }

  function handleCalcQuatify() {
    const { start, end, duration } = formik.values;

    if (start && end && duration) {
      if (!duration.match(/^([0-9][0-9]?[0-9]:[0][0])$/)) {
        toast.error('Digite um formato válido de duração');
      } else {
        const minutesQuatity = moment(end, 'HH:mm').diff(
          moment(start, 'HH:mm'),
          'minutes'
        );

        const [hour] = duration.split(':');

        const calc = Math.round(minutesQuatity / hour);
        formik.setValues({ ...formik.values, quantity: calc });
      }
    }
  }

  async function loadRoomsOptions() {
    await api.get(`rooms`).then(response => {
      const parseRooms = response.data.map(room => {
        return {
          value: room.id,
          label: room.name,
        };
      });

      setRoomsOptions(parseRooms);
    });
  }

  useEffect(() => {
    if (id) loadProfessional();
    loadRoomsOptions();
    loadSchedule();
  }, []);

  return (
    <>
      <Header title={`Agenda : ${currentProfessional}`} />
      <div className="content">
        <div className="container">
          <Card>
            <form onSubmit={formik.handleSubmit}>
              <CardHeader description="Adicione um novo horário para a agenda do profissional" />
              <CardBody>
                <Description
                  icon={
                    <MdPermContactCalendar
                      color="#495057"
                      size={30}
                      className="mr-2"
                    />
                  }
                  title="Dados da agenda"
                />

                <Row>
                  <Select
                    label="Dia *"
                    col="5"
                    value={formik.values.day}
                    handleChangeValue={formik.setFieldValue}
                    name="day"
                    options={dayOptions}
                  />
                  <Input
                    col="2"
                    label="Inicio *"
                    id="inputStart"
                    type="text"
                    name="start"
                    value={formik.values.start}
                    onChange={formik.handleChange}
                    mask="99:99"
                    handleOnBlur={handleCalcQuatify}
                  />
                  <Input
                    col="2"
                    label="Fim *"
                    id="inputEnd"
                    type="text"
                    name="end"
                    value={formik.values.end}
                    onChange={formik.handleChange}
                    mask="99:99"
                    handleOnBlur={handleCalcQuatify}
                  />
                  <Input
                    col="3"
                    label="Duração (em minutos. Ex: 60:00)"
                    id="inputDuration"
                    type="text"
                    name="duration"
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                    handleOnBlur={handleCalcQuatify}
                  />
                </Row>
                <Row>
                  <Select
                    label="Sala *"
                    col="5"
                    value={formik.values.room_id}
                    handleChangeValue={formik.setFieldValue}
                    name="room_id"
                    options={roomsOptions}
                  />
                  <Input
                    col="2"
                    label="Quantidade"
                    disabled
                    type="text"
                    value={formik.values.quantity}
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
                <button type="submit" className="btn btn-success float-right">
                  {id ? 'Atualizar' : 'Cadastrar'}
                </button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}

ProfessionalScheduleForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
