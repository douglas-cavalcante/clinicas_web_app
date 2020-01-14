import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { getProceduresProfessionalsRequest } from '~/store/modules/procedureProfessional/actions';
import Select from '~/components/Form/Select';

export default function SchedulesForm({ match }) {
  const id = useMemo(() => match.params.id, [match.params.id]);
  const [partnershipsOptions, setPartnershipsOptions] = useState([]);
  const dispatch = useDispatch();

  const professional = useSelector(state => state.professional);
  const procedureProfessional = useSelector(
    state => state.procedureProfessional
  );

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: '',
      partnership_id: null,
      professional_id: null,
      procedure_id: null,
    },

    onSubmit: values => {
      if (!values.name) {
        toast.error('O nome da indicação é obrigatório');
      } else {
        dispatch(saveIndicationRequest({ ...values }));
      }
    },
  });

  function handleGetProceduresProfessionais() {
    dispatch(getProceduresProfessionalsRequest(id));
  }

  async function getProceduresOptions(inputValue = '') {
    await api
      .get(`partnerships/options?`)
      .then(response => {
        setPartnershipsOptions(response.data);
      })
      .catch(() => {});
  }

  useEffect(() => {
    dispatch(getProfessionalsOptionsRequest());
    getProceduresOptions();
  }, []);

  return (
    <>
      <Header title="Novo agendamento" />

      <div className="content">
        <div className="container">
          <Card>
            <form onSubmit={formik.handleSubmit}>
              <CardHeader description="Adicione uma opção de indicação" />
              <CardBody>
                <Description
                  icon={<MdPeople color="#495057" size={30} className="mr-2" />}
                  title="Dados do cliente"
                />

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
                    label="Nome"
                    col="12"
                    value={formik.values.professional_id}
                    handleChangeValue={formik.setFieldValue}
                    name="professional_id"
                    options={professional.options}
                    disabled={formik.values.partnership_id}
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
