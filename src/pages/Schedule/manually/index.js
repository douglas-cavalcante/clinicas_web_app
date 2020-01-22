import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { CardFooter, CardBody, CardHeader, Card } from '~/components/Card';

import history from '~/services/history';
import Input from '~/components/Form/Input';
import Row from '~/components/Bootstrap/Row';

import Header from '~/components/Header';

import api from '~/services/api';

import { getProfessionalsOptionsRequest } from '~/store/modules/professional/actions';

import Select from '~/components/Form/Select';

import Textarea from '~/components/Form/Textarea';

import DatePickerInput from '~/components/Form/DatePicker';
import { saveScheduleEncaixeRequest } from '~/store/modules/schedule/actions';

export default function SchedulesManuallyForm() {
  // dispatch do react-redux
  const dispatch = useDispatch();

  // Estado da opções do select

  const professional = useSelector(state => state.professional);

  const [roomsOptions, setRoomsOptions] = useState([]);

  const [patientsOptions, setPatientsOptions] = useState([]);

  const [partnershipsOptions, setPartnershipsOptions] = useState([]);
  const [proceduresOptions, setProceduresOptions] = useState([]);

  // Estado do formik

  const formik = useFormik({
    initialValues: {
      currentDate: null,
      professional_id: null,
      start: '',
      room_id: null,

      patient_id: '',
      partnership_id: null,
      procedure_id: null,
      value: '',
      value_transferred: '',
      observations: '',
    },

    onSubmit: values => {
      if (!formik.values.currentDate) {
        toast.error('Selecione uma data');
      } else if (!formik.values.professional_id) {
        toast.error('Selecione um profissional ');
      } else if (!formik.values.start) {
        toast.error('Preencha o horário de início do agendamento');
      } else if (!formik.values.room_id) {
        toast.error('Selecione a sala');
      } else if (!formik.values.patient_id) {
        toast.error('Selecione o paciente');
      } else if (!formik.values.partnership_id) {
        toast.error('Selecione o convênio');
      } else if (!formik.values.procedure_id) {
        toast.error('Selecione o procedimento');
      } else {
        dispatch(
          saveScheduleEncaixeRequest({
            ...values,
            patient_id: values.patient_id.value,
            partnership_id: values.partnership_id.value,
            procedure_id: values.procedure_id.value,
            professional_id: values.professional_id.value,
            date: values.currentDate,
            room_id: values.room_id.value,
            start: values.start,
          })
        );
      }
    },
  });

  async function loadRoomsOptions() {
    await api.get(`rooms/options`).then(response => {
      setRoomsOptions(response.data);
    });
  }

  async function loadPatientsOptions() {
    await api
      .get(`patients/options`)
      .then(response => {
        setPatientsOptions(response.data);
      })
      .catch(() => {});
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
    async function loadProcedureInfo() {
      if (formik.values.procedure_id) {
        await api
          .get(`procedures/${formik.values.procedure_id.value}`)
          .then(response => {
            formik.setValues({
              ...formik.values,
              value: response.data.value,

              value_transferred: response.data.value_transferred,
            });
          })
          .catch(() => {});
      }
    }
    loadProcedureInfo();
  }, [formik.values.procedure_id]);

  useEffect(() => {
    dispatch(getProfessionalsOptionsRequest());
    loadRoomsOptions();

    loadPatientsOptions();
    getProceduresOptions();
  }, []);

  // Carrega os procedimentos quando o convênio é selecionado
  useEffect(() => {
    async function loadOptionsProcedures() {
      if (formik.values.partnership_id) {
        const { value } = formik.values.partnership_id;
        const { professional_id } = formik.values;
        await api
          .get(
            `proceduresProfessionals/options?professional_id=${professional_id.value}&partnership_id=${value}`
          )
          .then(response => {
            setProceduresOptions(response.data);
            formik.setValues({
              ...formik.values,
              procedure_id: null,
              value: '',
              value_transferred: '',
            });
          })
          .catch(() => {});
      }
    }
    loadOptionsProcedures();
  }, [formik.values.partnership_id]);

  /* 
    Ao trocar o professional, os campos
    de convenio, procedimento, valor e valor transfeirdo
    são limpos.

  */

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      partnership_id: null,
      procedure_id: null,
      value: '',
      value_transferred: '',
    });
  }, [formik.values.professional_id]);

  return (
    <>
      <Header title="Encaixe de  agendamento" />

      <div className="content">
        <div className="container">
          <Card>
            <form onSubmit={formik.handleSubmit}>
              <CardHeader description="Adicione um encaixe de agendamento manualmente" />

              <CardBody>
                <Row>
                  <div className="col-md-6 mt-4 mb-2">
                    <DatePickerInput
                      name="currentDate"
                      onChange={formik.setFieldValue}
                      value={formik.values.currentDate}
                    />
                  </div>

                  <div className="col-md-6 mt-4 mb-2">
                    <Select
                      label="Professional *"
                      col="12"
                      value={formik.values.professional_id}
                      handleChangeValue={formik.setFieldValue}
                      name="professional_id"
                      options={professional.options}
                    />
                    <Input
                      col="12"
                      label="Inicio *"
                      id="inputStart"
                      type="text"
                      name="start"
                      value={formik.values.start}
                      onChange={formik.handleChange}
                      mask="99:99"
                    />
                    <Select
                      label="Sala *"
                      col="12"
                      value={formik.values.room_id}
                      handleChangeValue={formik.setFieldValue}
                      name="room_id"
                      options={roomsOptions}
                    />
                  </div>
                </Row>
                <Row>
                  <Select
                    label="Paciente"
                    col="12"
                    value={formik.values.patient_id}
                    handleChangeValue={formik.setFieldValue}
                    name="patient_id"
                    options={patientsOptions}
                  />
                </Row>

                <Row>
                  <Select
                    label="Convênio"
                    col="4"
                    value={formik.values.partnership_id}
                    handleChangeValue={formik.setFieldValue}
                    name="partnership_id"
                    options={partnershipsOptions}
                    disabled={!formik.values.professional_id}
                  />
                  <Select
                    label="Procedimentos"
                    col="4"
                    value={formik.values.procedure_id}
                    handleChangeValue={formik.setFieldValue}
                    name="procedure_id"
                    options={proceduresOptions}
                    disabled={!formik.values.partnership_id}
                  />
                  <div className="col-md-4">Valor: {formik.values.value}</div>
                </Row>
                <Row>
                  <Textarea
                    col="12"
                    label="Observações"
                    id="inputDescription"
                    name="observations"
                    value={formik.values.observations}
                    placeholder="Digite observações relevantes para esse agendamento."
                    onChange={formik.handleChange}
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
                  Cadastrar
                </button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}

SchedulesManuallyForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      partnership_id: PropTypes.string,
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
