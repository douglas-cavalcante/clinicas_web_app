import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Axios from 'axios';

import PropTypes from 'prop-types';

import { Editor } from '@tinymce/tinymce-react';

import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { MdDock, MdPerson, MdHome, MdHttps, MdLock } from 'react-icons/md';
import { Card, CardHeader, CardBody, CardFooter } from '~/components/Card';

import Select from '~/components/Form/Select';
import CreatableSelect from '~/components/Form/CreatableSelect/CreatableSelect';
import SwitchButton from '~/components/Form/SwitchButton';
import Show from '~/components/Show';

import Header from '~/components/Header';
import Description from '~/components/Description';
import Row from '~/components/Bootstrap/Row';
import Input from '~/components/Form/Input';
import history from '~/services/history';

import api from '~/services/api';
import { sexoOptions } from '~/utils/utils';
import { saveProfessionalRequest } from '~/store/modules/professional/actions';

export default function ProfessionalForm({ match }) {
  const dispatch = useDispatch();

  const [rolesOptions, setRolesOptions] = useState([]);
  const [ocupationsOptions, setOcupationsOptions] = useState([]);

  const id = useMemo(() => match.params.id, [match.params.id]);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: '',

      // tipo de usuário
      role_id: null,
      // dados do profissional
      name: '',
      email: '',
      date_birth: '',
      sexo: '',
      council: '',
      registration_number: '',
      ocupation_id: null,
      cpf: '',
      // permissões
      can_selected: true,
      can_schedule: false,
      // dados de residência
      cep: '',
      street: '',
      number: '',
      neighborhood: '',
      county: '',
      complement: '',
      // dados de contato
      first_phone: '',
      second_phone: '',
      // dados de login
      username: '',
      password: '',
      // curriculum
      curriculum: '',
    },

    onSubmit: values => {
      if (!values.role_id) {
        toast.error('O tipo de usuário é obrigatório');
      } else if (!values.name) {
        toast.error('O nome do profissional é obrigatório');
      } else if (!values.date_birth) {
        toast.error('Data de aniversário é obrigatória');
      } else if (!values.first_phone) {
        toast.error('Primeiro telefone é obrigatória');
      } else if (!values.ocupation_id) {
        toast.error('A ocupação é obrigatória');
      } else {
        dispatch(
          saveProfessionalRequest({
            ...values,
            role_id: values.role_id.value,
            sexo: values.sexo.value,
            ocupation_id: values.ocupation_id
              ? values.ocupation_id.value
              : null,
          })
        );
      }
    },
  });

  async function loadRoles() {
    await api
      .get(`roles`)
      .then(response => {
        setRolesOptions(response.data);
      })
      .catch(() => {});
  }

  async function loadOcupations() {
    await api
      .get(`ocupations`)
      .then(response => {
        setOcupationsOptions(response.data);
      })
      .catch(() => {});
  }

  async function loadProfessional() {
    await api.get(`professionals/${id}`).then(response => {
      formik.setValues({
        ...formik.values,
        id: response.data.id,

        // tipo de usuário
        role_id: {
          value: response.data.role.id,
          label: response.data.role.label,
        },
        // dados do profissional
        name: response.data.name,
        email: response.data.email,
        date_birth: response.data.date_birth,
        sexo: {
          value: response.data.sexo,
          label: response.data.sexo === 'M' ? 'Masculino' : 'Feminino',
        },
        council: response.data.council,
        registration_number: response.data.registration_number,
        ocupation_id: response.data.ocupation
          ? {
              value: response.data.ocupation.id,
              label: response.data.ocupation.label,
            }
          : null,
        cpf: response.data.cpf,
        // permissões
        can_selected: response.data.can_selected,
        can_schedule: response.data.can_schedule,
        // dados de residência
        cep: response.data.cep,
        street: response.data.street,
        number: response.data.number,
        neighborhood: response.data.neighborhood,
        county: response.data.county,
        complement: response.data.complement,
        // dados de contato
        first_phone: response.data.first_phone,
        second_phone: response.data.second_phone,
        // dados de login
        username: '',
        password: '',
        // curriculum
        curriculum: response.data.curriculum,
      });
    });
  }
  useEffect(() => {
    loadRoles();
    loadOcupations();

    if (id) loadProfessional();
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

  return (
    <>
      <Header title="Profissionais" />
      <div className="content">
        <div className="container">
          <Card>
            <form onSubmit={formik.handleSubmit}>
              <CardHeader description="Adicione um novo profissional para o convênio" />
              <CardBody>
                <Description
                  icon={<MdPerson color="#495057" size={30} className="mr-2" />}
                  title="Dados do profissional"
                />

                <Row>
                  <Select
                    label="Tipos de usuários"
                    col="6"
                    value={formik.values.role_id}
                    handleChangeValue={formik.setFieldValue}
                    name="role_id"
                    options={rolesOptions}
                  />
                </Row>

                <Row>
                  <Input
                    col="6"
                    label="Nome *"
                    id="inputName"
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  <Select
                    label="Sexo"
                    col="2"
                    value={formik.values.sexo}
                    handleChangeValue={formik.setFieldValue}
                    name="sexo"
                    options={sexoOptions}
                  />
                  <Input
                    col="4"
                    label="Email"
                    id="inputEmail"
                    type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </Row>

                <Row>
                  <Input
                    col="4"
                    label="Data de Nascimento"
                    id="date_birth"
                    type="date"
                    name="date_birth"
                    value={formik.values.date_birth}
                    onChange={formik.handleChange}
                  />
                  <Input
                    col="4"
                    label="CPF"
                    id="cpf"
                    type="text"
                    name="cpf"
                    value={formik.values.cpf}
                    onChange={formik.handleChange}
                    mask="999.999.999-99"
                  />
                  <CreatableSelect
                    label="Ocupação"
                    col="4"
                    value={formik.values.ocupation_id}
                    handleChangeValue={formik.setFieldValue}
                    name="ocupation_id"
                    options={ocupationsOptions}
                    handleCreate={handleCreateOcupationOption}
                  />
                </Row>
                <Show
                  display={
                    formik.values.role_id &&
                    (formik.values.role_id.value === 4 ||
                      formik.values.role_id.value === 5)
                  }
                >
                  <Row>
                    <Input
                      col="4"
                      label="Conselho"
                      id="council"
                      type="text"
                      name="council"
                      value={formik.values.council}
                      onChange={formik.handleChange}
                    />
                    <Input
                      col="4"
                      label="Número de inscrição"
                      id="registration_number"
                      type="text"
                      name="registration_number"
                      value={formik.values.registration_number}
                      onChange={formik.handleChange}
                    />
                  </Row>

                  <Description
                    icon={
                      <MdHttps color="#495057" size={30} className="mr-2" />
                    }
                    title="Permissões"
                  />

                  <Row>
                    <SwitchButton
                      col="4"
                      onChange={formik.setFieldValue}
                      name="can_selected"
                      label="Realiza consultas ?"
                      id="can_selected"
                      checked={formik.values.can_selected}
                    />
                    <SwitchButton
                      col="4"
                      onChange={formik.setFieldValue}
                      name="can_schedule"
                      label="Pode agendar suas consultas ?"
                      id="can_schedule"
                      checked={formik.values.can_schedule}
                    />
                  </Row>
                </Show>
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
                    col="6"
                    label="Primeiro contato"
                    id="inputFirstPhone"
                    type="text"
                    name="first_phone"
                    value={formik.values.first_phone}
                    onChange={formik.handleChange}
                    mask="(99) 9999-9999"
                  />
                  <Input
                    col="6"
                    label="Segundo contato"
                    id="inputSecondPhone"
                    type="text"
                    name="second_phone"
                    value={formik.values.second_phone}
                    onChange={formik.handleChange}
                    mask="(99) 9999-9999"
                  />
                </Row>

                <Show
                  display={
                    formik.values.role_id &&
                    (formik.values.role_id.value === 4 ||
                      formik.values.role_id.value === 5)
                  }
                >
                  <Description
                    icon={<MdDock color="#495057" size={30} className="mr-2" />}
                    title="Mini-Currículo"
                  />
                  <Editor
                    apiKey="hfg08u1mu43tdd3mj9rhxf4aztr6ggyyhmi9wwfph5zvtoo9"
                    name="curriculum"
                    value={formik.values.curriculum}
                    plugins={['autoresize']}
                    onChange={e =>
                      formik.setFieldValue('curriculum', e.target.getContent())
                    }
                    init={{
                      toolbar:
                        'undo redo | bold italic | alignleft aligncenter alignright | code',
                    }}
                  />
                </Show>
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
ProfessionalForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
