import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import Axios from 'axios';
import { MdHome, MdSettingsCell, MdLibraryBooks } from 'react-icons/md';
import { CardHeader, CardBody, CardFooter, Card } from '~/components/Card';
import Header from '~/components/Header';
import Row from '~/components/Bootstrap/Row';
import Input from '~/components/Form/Input';

import Description from '~/components/Description';
import { savePartnesershipRequest } from '~/store/modules/partnership/actions';
import api from '~/services/api';
import history from '~/services/history';

// import { Container } from './styles';

export default function PartnershipsForm({ match }) {
  const dispatch = useDispatch();
  const id = useMemo(() => match.params.id, [match.params.id]);

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      company_name: '',
      cnpj: '',
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      county: '',
      telephone: '',
      cellphone: '',
    },
    onSubmit: values => {
      if (!values.name) {
        toast.error('O nome do convênio é obrigatório');
      } else {
        dispatch(savePartnesershipRequest(values));
      }
    },
  });

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
        .catch(error => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    async function loadPartnership() {
      await api.get(`partnerships/${id}`).then(response => {
        formik.setValues({
          ...formik.values,
          id: response.data.id,
          name: response.data.name,
          company_name: response.data.company_name,
          cnpj: response.data.cnpj,
          cep: response.data.cep,
          street: response.data.street,
          number: response.data.number,
          complement: response.data.complement,
          neighborhood: response.data.neighborhood,
          county: response.data.county,
          telephone: response.data.telephone,
          cellphone: response.data.cellphone,
        });
      });
    }
    if (id) loadPartnership();
  }, []);

  return (
    <>
      <Header title="Convênios" />
      <div className="content">
        <div className="container">
          <Card>
            <form onSubmit={formik.handleSubmit}>
              <CardHeader description="Adicione um novo convênio para o sistema" />
              <CardBody>
                <Description
                  icon={
                    <MdLibraryBooks
                      color="#495057"
                      size={30}
                      className="mr-2"
                    />
                  }
                  title="Dados do convênio"
                />
                <Row>
                  <Input
                    col="4"
                    label="Nome"
                    id="inputNome"
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  <Input
                    col="4"
                    label="Razão Social"
                    id="inputRazaoSocial"
                    type="text"
                    name="company_name"
                    value={formik.values.company_name}
                    onChange={formik.handleChange}
                  />
                  <Input
                    col="4"
                    label="CNPJ"
                    id="inputCnpj"
                    type="text"
                    name="cnpj"
                    value={formik.values.cnpj}
                    onChange={formik.handleChange}
                    mask="99.999.999/9999-99"
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
                  icon={
                    <MdSettingsCell
                      color="#495057"
                      size={30}
                      className="mr-2"
                    />
                  }
                  title="Dados de contato"
                />
                <Row>
                  <Input
                    col="4"
                    label="Telefone"
                    id="inputTelephone"
                    type="text"
                    name="telephone"
                    value={formik.values.telephone}
                    onChange={formik.handleChange}
                    mask="(99) 9999-9999"
                  />
                  <Input
                    col="4"
                    label="Celular"
                    id="inputCellphone"
                    type="text"
                    name="cellphone"
                    value={formik.values.cellphone}
                    onChange={formik.handleChange}
                    mask="(99) 99999-9999"
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
