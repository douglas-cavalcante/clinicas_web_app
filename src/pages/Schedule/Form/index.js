import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import { saveIndicationRequest } from '~/store/modules/indication/actions';
import { getProfessionalsOptionsRequest } from '~/store/modules/professional/actions';

import Select from '~/components/Form/Select';
import MoneyInput from '~/components/Form/MoneyInput';

import Textarea from '~/components/Form/Textarea';

export default function SchedulesForm({ match, location }) {
  const dispatch = useDispatch();

  const id = useMemo(() => match.params.id, [match.params.id]);
  const data = useMemo(() => location.state, [match.params.id]);

  const [proceduresOptions, setProceduresOptions] = useState([]);
  const [partnershipsOptions, setPartnershipsOptions] = useState([]);
  const [patientsOptions, setPatientsOptions] = useState([]);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: '',
      patient_id: '',
      partnership_id: null,
      professional_id: null,
      procedure_id: null,
      value: '',
      value_tranferred: '',
      observations: '',
    },

    onSubmit: values => {
      if (!values.name) {
        toast.error('O nome da indicação é obrigatório');
      } else {
        dispatch(saveIndicationRequest({ ...values }));
      }
    },
  });

  async function getProceduresOptions() {
    await api
      .get(`partnerships/options`)
      .then(response => {
        setPartnershipsOptions(response.data);
      })
      .catch(() => {});
  }

  async function loadPatientsOptions() {
    await api
      .get(`patients/options`)
      .then(response => {
        setPatientsOptions(response.data);
      })
      .catch(() => {});
  }

  useEffect(() => {
    dispatch(getProfessionalsOptionsRequest());
    getProceduresOptions();
    loadPatientsOptions();
  }, []);

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
              value: response.data.value,
              value_tranferred: response.data.value_tranferred,
            });
          })
          .catch(() => {});
      }
    }
    loadProcedureInfo();
  }, [formik.values.procedure_id]);

  return (
    <>
      <Header title="Novo agendamento" />

      <div className="content">
        <div className="container">
          <Card>
            <form onSubmit={formik.handleSubmit}>
              <CardHeader
                description={`Doutor(a): ${data &&
                  data.item.professional_name} | ${data.currentDate &&
                  format(new Date(data.currentDate), 'dd-MM-yyyy')} às ${data
                  .item.start && data.item.start} | ${data.item.room}`}
              />
              <CardBody>
                <Description
                  icon={<MdPeople color="#495057" size={30} className="mr-2" />}
                  title="Dados do Paciente"
                />

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

                  {!formik.values.value && (
                    <MoneyInput
                      col="4"
                      label="Valor"
                      id="inputValue"
                      name="value"
                      value={formik.values.value}
                      onChange={formik.setFieldValue}
                      disabled
                    />
                  )}

                  {formik.values.value && (
                    <MoneyInput
                      col="4"
                      label="Valor"
                      id="inputValue"
                      name="value"
                      value={formik.values.value}
                      disabled
                    />
                  )}
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
