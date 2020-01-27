import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdPeople } from 'react-icons/md';

import { CardFooter, CardBody, CardHeader, Card } from '~/components/Card';

import history from '~/services/history';
import Input from '~/components/Form/Input';
import Row from '~/components/Bootstrap/Row';

import Description from '~/components/Description';
import Header from '~/components/Header';

import api from '~/services/api';

import { getProfessionalsOptionsRequest } from '~/store/modules/professional/actions';

import Select from '~/components/Form/Select';

import Textarea from '~/components/Form/Textarea';
import Show from '~/components/Show';
import {
  savePrePatientRequest,
  changeModeRequest,
} from '~/store/modules/patient/actions';
import { saveScheduleRequest } from '~/store/modules/schedule/actions';
import { zonedTimeToUtc } from 'date-fns-tz';
import CreatableSelect from '~/components/Form/CreatableSelect/CreatableSelect';

export default function SchedulesForm({ match, location }) {
  const dispatch = useDispatch();

  const id = useMemo(() => match.params.id, [match.params.id]);
  const data = useMemo(() => location.state, [match.params.id]);

  const [proceduresOptions, setProceduresOptions] = useState([]);
  const [partnershipsOptions, setPartnershipsOptions] = useState([]);
  const [patientsOptions, setPatientsOptions] = useState([]);
  const [indicationsOptions, setIndicationsOptions] = useState([]);

  const addPatientMode = useSelector(state => state.patient.addPatientMode);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      patient_id: '',
      partnership_id: null,
      professional_id: null,
      procedure_id: null,
      indication_id: null,
      value: '',
      value_transferred: '',
      value_payment: '',
      observations: '',
    },

    onSubmit: values => {
      if (!values.partnership_id) {
        toast.error('O nome do convenio é obrigatório');
      } else if (!values.procedure_id) {
        toast.error('O nome do procedimento é obrigatório');
      } else if (!values.patient_id) {
        toast.error('O nome do paciente é obrigatório');
      } else {
        dispatch(
          saveScheduleRequest({
            ...values,
            patient_id: values.patient_id.value,
            partnership_id: values.partnership_id.value,
            procedure_id: values.procedure_id.value,
            indication_id: values.indication_id
              ? values.indication_id.value
              : null,
            professional_id: data.item.professional_id,
            date: zonedTimeToUtc(data.currentDate, 'America/Sao_Paulo'),
            room_id: data.item.room_id,
            start: data.item.start,
          })
        );
      }
    },
  });

  async function loadPatientsOptions() {
    await api
      .get(`patients/options`)
      .then(response => {
        setPatientsOptions(response.data);
      })
      .catch(() => {});
  }

  const formikAddUser = useFormik({
    initialValues: {
      name: '',
      date_birth: '',
      first_phone: '',
    },

    onSubmit: values => {
      if (!values.name || !values.first_phone) {
        toast.error('Todos os dados são obrigatórios');
      } else {
        dispatch(savePrePatientRequest({ ...values }));
        formikAddUser.setValues({ name: '', date_birth: '', first_phone: '' });
      }
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

  async function loadSchedule() {
    await api.get(`schedules/${id}`).then(response => {
      formik.setValues({
        ...formik.values,
        id: response.data.id,
        patient_id: response.data.patient
          ? {
              value: response.data.patient.id,
              label: response.data.patient.name,
            }
          : null,
        indication_id: response.data.indication
          ? {
              value: response.data.indication.id,
              label: response.data.indication.name,
            }
          : null,
        partnership_id: response.data.procedure.partnership
          ? {
              value: response.data.procedure.partnership.id,
              label: response.data.procedure.partnership.name,
            }
          : null,
        professional_id: response.data.professional
          ? {
              value: response.data.professional.id,
              label: response.data.professional.name,
            }
          : null,
        procedure_id: response.data.procedure
          ? {
              value: response.data.procedure.id,
              label: response.data.procedure.name,
            }
          : null,
        value: response.data.value,
        value_transferred: response.data.value_transferred,
        value_payment: response.data.value_payment,
        observations: response.data.observations,
      });
    });
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
    dispatch(getProfessionalsOptionsRequest());
    getProceduresOptions();
    loadPatientsOptions();
    handleLoadIndicationsOptions();
    if (id) loadSchedule();
  }, []);

  useEffect(() => {
    loadPatientsOptions();
  }, [addPatientMode]);

  useEffect(() => {
    async function loadOptionsProcedures() {
      if (formik.values.partnership_id) {
        const { value } = formik.values.partnership_id;
        const { professional_id } = data.item;
        await api
          .get(
            `proceduresProfessionals/options?professional_id=${professional_id}&partnership_id=${value}`
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
    async function loadProcedureInfo() {
      if (formik.values.procedure_id) {
        await api
          .get(`procedures/${formik.values.procedure_id.value}`)
          .then(response => {
            formik.setValues({
              ...formik.values,
              value: id ? formik.values.value : response.data.value,
              value_transferred: id
                ? formik.values.value_transferred
                : response.data.value_transferred,
            });
          })
          .catch(() => {});
      }
    }
    loadProcedureInfo();
  }, [formik.values.procedure_id]);

  return (
    <>
      <Header title={id ? 'Alterar Agendamento' : 'Novo agendamento'} />

      <div className="content">
        <div className="container">
          <Card>
            <Show display={!addPatientMode}>
              <form onSubmit={formik.handleSubmit}>
                <CardHeader
                  description={`Doutor(a): ${data &&
                    data.item.professional_name} | ${data.currentDate &&
                    format(new Date(data.currentDate), 'dd-MM-yyyy')} às ${data
                    .item.start && data.item.start} | ${data.item.room}`}
                />

                <CardBody>
                  <Description
                    icon={
                      <MdPeople color="#495057" size={30} className="mr-2" />
                    }
                    title="Dados do Paciente"
                  />

                  <span
                    className="mb-4"
                    style={{
                      color: '#007BFF',
                      textDecoration: 'underline',
                    }}
                    onClick={() => dispatch(changeModeRequest())}
                  >
                    Não encontrou o paciente ? Adicione um novo agora mesmo.
                  </span>

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

                    <Input
                      label="Valor do procedimento"
                      col="3"
                      value={formik.values.value}
                      onChange={formik.handleChange}
                      name="value"
                      type="number"
                      disabled={!id}
                    />
                  </Row>
                  <Row>
                    <Input
                      label={`Valor de repasse:`}
                      col="4"
                      value={formik.values.value_transferred}
                      onChange={formik.handleChange}
                      name="value_transferred"
                      type="number"
                      disabled={!id}
                    />
                    <Show display={id}>
                      <Input
                        label="Valor do pagamento"
                        col="3"
                        value={formik.values.value_payment}
                        onChange={formik.handleChange}
                        name="value_payment"
                        type="number"
                        disabled={!id}
                      />
                    </Show>

                    <CreatableSelect
                      label="Indicação"
                      col="4"
                      value={formik.values.indication_id}
                      handleChangeValue={formik.setFieldValue}
                      name="indication_id"
                      options={indicationsOptions}
                      handleCreate={handleCreateIndicationOption}
                      loadOptions={handleLoadIndicationsOptions}
                    />
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
                    {id ? 'Atualizar' : 'Cadastrar'}
                  </button>
                </CardFooter>
              </form>
            </Show>

            <Show display={addPatientMode}>
              <form onSubmit={formikAddUser.handleSubmit}>
                <CardHeader description="Formulário de pré-cadastro do paciente" />
                <CardBody>
                  <Description
                    icon={
                      <MdPeople color="#495057" size={30} className="mr-2" />
                    }
                    title="Dados do Paciente"
                  />
                  <Row>
                    <Input
                      col="4"
                      label="Nome *"
                      id="inputName"
                      type="text"
                      name="name"
                      value={formikAddUser.values.name}
                      onChange={formikAddUser.handleChange}
                    />

                    <Input
                      col="3"
                      label="Data de Nascimento *"
                      id="date_birth"
                      type="date"
                      name="date_birth"
                      value={formikAddUser.values.date_birth}
                      onChange={formikAddUser.handleChange}
                    />
                    <Input
                      col="4"
                      label="Contato *"
                      id="inputFirstPhone"
                      type="text"
                      name="first_phone"
                      value={formikAddUser.values.first_phone}
                      onChange={formikAddUser.handleChange}
                      mask="(99) 99999-9999"
                    />
                  </Row>
                </CardBody>

                <CardFooter>
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={() => dispatch(changeModeRequest())}
                  >
                    Voltar
                  </button>
                  <button type="submit" className="btn btn-success float-right">
                    Adicionar
                  </button>
                </CardFooter>
              </form>
            </Show>
          </Card>
        </div>
      </div>
    </>
  );
}

SchedulesForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      partnership_id: PropTypes.string,
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
