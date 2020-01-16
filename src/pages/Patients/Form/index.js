import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { differenceInYears } from 'date-fns';
import Axios from 'axios';

import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import {
  MdDock,
  MdPerson,
  MdHome,
  MdFolder,
  MdChromeReaderMode,
} from 'react-icons/md';
import { Card, CardHeader, CardBody, CardFooter } from '~/components/Card';

import CreatableSelect from '~/components/Form/CreatableSelect/CreatableSelect';

import Header from '~/components/Header';
import Description from '~/components/Description';
import Row from '~/components/Bootstrap/Row';
import Input from '~/components/Form/Input';
import history from '~/services/history';
import Select from '~/components/Form/Select';

import api from '~/services/api';

import SwitchButton from '~/components/Form/SwitchButton';
import { sexoOptions } from '~/utils/utils';
import Textarea from '~/components/Form/Textarea';
import { savePatientRequest } from '~/store/modules/patient/actions';

export default function PatientForm({ match }) {
  const dispatch = useDispatch();

  const [schoolingOptions, setSchoolingOptions] = useState([]);
  const [ocupationsOptions, setOcupationsOptions] = useState([]);
  const [maritalStatusOptions, setMaritalStatusOptions] = useState([]);
  const [racesOptions, setRacesOptions] = useState([]);
  const [indicationsOptions, setIndicationsOptions] = useState([]);

  const id = useMemo(() => match.params.id, [match.params.id]);

  /* 
    name, date_birth and firtst_phone are required
  */
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: '',
      // dados do paciente
      name: '',
      email: '',
      date_birth: '',
      age: '',
      father_name: '',
      mother_name: '',
      gender: null,
      // Documentos
      cpf: '',
      rg: '',
      responsible_document: false,
      observations: '',
      // Dados da residência
      cep: '',
      street: '',
      number: '',
      neighborhood: '',
      county: '',
      complement: '',
      // contatos
      first_phone: '',
      second_phone: '',
      whatsapp: '',
      // Dados sociais
      indication_id: null,
      ocupation_id: null,
      nationality: '',
      instagram: '',
      facebook: '',
      race_id: null,
      marital_status_id: null,
      schooling_id: null,
    },

    onSubmit: values => {
      if (!values.name) {
        toast.error('O nome do paciente é obrigatório.');
      } else if (!values.date_birth) {
        toast.error('Data de nascimento é obrigatória.');
      } else if (!values.first_phone) {
        toast.error('O primeiro telefone é obrigatório.');
      } else {
        dispatch(
          savePatientRequest({
            ...values,
            gender: values.gender ? values.gender.value : null,
            indication_id: values.indication_id
              ? values.indication_id.value
              : null,
            ocupation_id: values.ocupation_id
              ? values.ocupation_id.value
              : null,
            race_id: values.race_id ? values.race_id.value : null,
            marital_status_id: values.marital_status_id
              ? values.marital_status_id.value
              : null,
            schooling_id: values.schooling_id
              ? values.schooling_id.value
              : null,
          })
        );
      }
    },
  });

  async function loadRacesOptions() {
    await api
      .get(`races`)
      .then(response => {
        setRacesOptions(response.data);
      })
      .catch(() => {});
  }

  async function loadMaritalStatusOptions() {
    await api
      .get(`maritalStatus`)
      .then(response => {
        setMaritalStatusOptions(response.data);
      })
      .catch(() => {});
  }

  async function loadSchoolingOptions() {
    await api
      .get(`schooling`)
      .then(response => {
        setSchoolingOptions(response.data);
      })
      .catch(() => {});
  }

  async function loadPatient() {
    await api.get(`patients/${id}`).then(response => {
      formik.setValues({
        ...formik.values,
        id: '',
        // dados do paciente
        name: response.data.name,
        email: response.data.email,
        date_birth: response.data.date_birth,
        age: '',
        father_name: '',
        mother_name: '',
        gender: {
          value: response.data.gender,
          label: response.data.gender === 'M' ? 'Masculino' : 'Feminino',
        },
        // Documentos
        cpf: '',
        rg: '',
        responsible_document: false,
        observations: '',
        // Dados da residência
        cep: '',
        street: '',
        number: '',
        neighborhood: '',
        county: '',
        complement: '',
        // contatos
        first_phone: '',
        second_phone: '',
        whatsapp: '',
        // Dados sociais
        indication_id: response.data.indication_id
          ? {
              value: response.data.indication_id.id,
              label: response.data.indication_id.label,
            }
          : null,
        ocupation_id: response.data.ocupation_id
          ? {
              value: response.data.ocupation_id.id,
              label: response.data.ocupation_id.label,
            }
          : null,
        nationality: '',
        instagram: '',
        facebook: '',
        race_id: response.data.race_id
          ? {
              value: response.data.race_id.id,
              label: response.data.race_id.label,
            }
          : null,
        marital_status_id: response.data.marital_status_id
          ? {
              value: response.data.marital_status_id.id,
              label: response.data.marital_status_id.label,
            }
          : null,
        schooling_id: response.data.schooling_id
          ? {
              value: response.data.schooling_id.id,
              label: response.data.schooling_id.label,
            }
          : null,
      });
    });
  }

  async function handleLoadOcupationsOptions(inputValue = '') {
    await api
      .get(`ocupations?term=${inputValue}`)
      .then(response => {
        setOcupationsOptions(response.data);
      })
      .catch(() => {});
  }

  async function handleLoadIndicationsOptions(inputValue = '') {
    await api
      .get(`indications?term=${inputValue}`)
      .then(response => {
        setIndicationsOptions(response.data);
      })
      .catch(() => {});
  }

  useEffect(() => {
    loadSchoolingOptions();
    loadMaritalStatusOptions();
    handleLoadOcupationsOptions();
    loadRacesOptions();
    handleLoadIndicationsOptions();

    if (id) loadPatient();
  }, []);

  async function buscarCep(cep) {
    if (cep) {
      await Axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
          if (response) {
            formik.setValues({
              ...formik.values,
              street: response.data.logradouro,
              complement: response.data.complemento,
              neighborhood: response.data.bairro,
              county: response.data.localidade,
            });
          }
        })
        .catch(() => {});
    }
  }

  function handleCalcAge() {
    if (formik.values.date_birth) {
      const [year, month, day] = formik.values.date_birth.split('-');
      const date = new Date();

      const age = differenceInYears(
        new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        new Date(year, month, day)
      );

      formik.setValues({ ...formik.values, age: age.toString() });
    }
  }

  async function handleCreateOcupationOption(inputValue) {
    await api
      .post('ocupations', { name: inputValue })
      .then(response => {
        toast.success(`${inputValue} adicionado`);
        formik.setValues({
          ...formik.values,
          ocupation_id: response.data,
        });
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao tentar adicionar essa opção');
      });
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

  return (
    <>
      <Header title="Novo paciente" />
      <div className="content">
        <div className="container">
          <Card>
            <form onSubmit={formik.handleSubmit}>
              <CardHeader description="Adicione um novo paciente" />
              <CardBody>
                <Description
                  icon={<MdPerson color="#495057" size={30} className="mr-2" />}
                  title="Dados do paciente"
                />

                <Row>
                  <Input
                    col="4"
                    label="Nome *"
                    id="inputName"
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  <Input
                    col="3"
                    label="Email"
                    id="inputEmail"
                    type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <Input
                    col="3"
                    label="Data de Nascimento *"
                    id="date_birth"
                    type="date"
                    name="date_birth"
                    value={formik.values.date_birth}
                    onChange={formik.handleChange}
                    handleOnBlur={handleCalcAge}
                  />
                  <Input
                    col="2"
                    label="Idade"
                    id="inputAge"
                    type="text"
                    value={formik.values.age}
                    disabled
                  />
                </Row>

                <Row>
                  <Input
                    col="4"
                    label="Nome do pai"
                    id="inputFatherName"
                    type="text"
                    name="father_name"
                    value={formik.values.father_name}
                    onChange={formik.handleChange}
                  />
                  <Input
                    col="4"
                    label="Nome da mãe"
                    id="inputMotherName"
                    type="text"
                    name="mother_name"
                    value={formik.values.mother_name}
                    onChange={formik.handleChange}
                  />
                  <Select
                    label="Sexo"
                    col="4"
                    value={formik.values.gender}
                    handleChangeValue={formik.setFieldValue}
                    name="gender"
                    options={sexoOptions}
                  />
                </Row>

                <Description
                  icon={<MdFolder color="#495057" size={30} className="mr-2" />}
                  title="Documentos"
                />

                <Row>
                  <Input
                    col="5"
                    label="CPF"
                    id="cpf"
                    type="text"
                    name="cpf"
                    value={formik.values.cpf}
                    onChange={formik.handleChange}
                    mask="999.999.999-99"
                  />
                  <Input
                    col="5"
                    label="RG"
                    id="rgInput"
                    type="text"
                    name="rg"
                    value={formik.values.rg}
                    onChange={formik.handleChange}
                  />

                  <SwitchButton
                    col="2"
                    onChange={formik.setFieldValue}
                    name="responsible_document"
                    label="Documento do responsável ?"
                    id="responsible_rg"
                    checked={formik.values.responsible_document}
                  />
                </Row>

                <Row>
                  <Textarea
                    col="12"
                    label="Observações"
                    id="inputObservations"
                    name="observations"
                    value={formik.values.observations}
                    placeholder="Digite observações relevantes sobre o paciente."
                    onChange={formik.handleChange}
                  />
                </Row>

                <Description
                  icon={<MdHome color="#495057" size={30} className="mr-2" />}
                  title="Dados de endereço"
                />
                <Row>
                  <Input
                    col="4"
                    label="CEP"
                    id="inputCep"
                    type="text"
                    name="cep"
                    value={formik.values.cep}
                    onChange={formik.handleChange}
                    mask="99999-999"
                    handleOnBlur={() => buscarCep(formik.values.cep)}
                  />
                  <Input
                    col="6"
                    label="Endereço"
                    id="inputStreet"
                    type="text"
                    name="street"
                    value={formik.values.street}
                    onChange={formik.handleChange}
                  />
                  <Input
                    col="2"
                    label="Número"
                    id="inputNumber"
                    type="text"
                    name="number"
                    value={formik.values.number}
                    onChange={formik.handleChange}
                  />
                </Row>
                <Row>
                  <Input
                    col="4"
                    label="Bairro"
                    id="inputNeighborhood"
                    type="text"
                    name="neighborhood"
                    value={formik.values.neighborhood}
                    onChange={formik.handleChange}
                  />
                  <Input
                    col="4"
                    label="Cidade"
                    id="inputCounty"
                    type="text"
                    name="county"
                    value={formik.values.county}
                    onChange={formik.handleChange}
                  />
                  <Input
                    col="4"
                    label="Complemento"
                    id="inputComplement"
                    type="text"
                    name="complement"
                    value={formik.values.complement}
                    onChange={formik.handleChange}
                  />
                </Row>

                <Description
                  icon={<MdDock color="#495057" size={30} className="mr-2" />}
                  title="Dados de contato"
                />

                <Row>
                  <Input
                    col="4"
                    label="Primeir      form_payment: '',o contato"
                    id="inputFirstPhone"
                    type="text"
                    name="first_phone"
                    value={formik.values.first_phone}
                    onChange={formik.handleChange}
                    mask="(99) 99999-9999"
                  />
                  <Input
                    col="4"
                    label="Segundo contato"
                    id="inputSecondPhone"
                    type="text"
                    name="second_phone"
                    value={formik.values.second_phone}
                    onChange={formik.handleChange}
                    mask="(99) 99999-9999"
                  />
                  <Input
                    col="4"
                    label="Whatsapp"
                    id="inputWhatsapp"
                    type="text"
                    name="whatsapp"
                    value={formik.values.whatsapp}
                    onChange={formik.handleChange}
                    mask="(99) 99999-9999"
                  />
                </Row>

                <Description
                  icon={
                    <MdChromeReaderMode
                      color="#495057"
                      size={30}
                      className="mr-2"
                    />
                  }
                  title="Dados sociais"
                />

                <Row>
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
                  <CreatableSelect
                    label="Ocupação"
                    col="4"
                    value={formik.values.ocupation_id}
                    handleChangeValue={formik.setFieldValue}
                    name="ocupation_id"
                    options={ocupationsOptions}
                    handleCreate={handleCreateOcupationOption}
                    loadOptions={handleLoadOcupationsOptions}
                  />
                  <Input
                    col="4"
                    label="Nacionalidade"
                    id="inputNationality"
                    type="text"
                    name="nationality"
                    value={formik.values.nationality}
                    onChange={formik.handleChange}
                  />
                </Row>

                <Row>
                  <Input
                    col="4"
                    label="Instagram"
                    id="inputInstagram"
                    type="text"
                    name="instagram"
                    value={formik.values.instagram}
                    onChange={formik.handleChange}
                  />
                  <Input
                    col="4"
                    label="Facebook"
                    id="inputFacebook"
                    type="text"
                    name="facebook"
                    value={formik.values.facebook}
                    onChange={formik.handleChange}
                  />
                  <Select
                    label="Raça/Cor"
                    col="4"
                    value={formik.values.race_id}
                    handleChangeValue={formik.setFieldValue}
                    name="race_id"
                    options={racesOptions}
                  />
                </Row>
                <Row>
                  <Select
                    label="Escolaridade"
                    col="4"
                    value={formik.values.schooling_id}
                    handleChangeValue={formik.setFieldValue}
                    name="schooling_id"
                    options={schoolingOptions}
                  />
                  <Select
                    label="Estado civil"
                    col="4"
                    value={formik.values.marital_status_id}
                    handleChangeValue={formik.setFieldValue}
                    name="marital_status_id"
                    options={maritalStatusOptions}
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

PatientForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
