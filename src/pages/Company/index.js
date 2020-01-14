import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Axios from 'axios';

import { MdLibraryBooks, MdHome, MdSettingsCell } from 'react-icons/md';
import {
  getCompanyRequest,
  SaveCompanyRequest,
} from '~/store/modules/company/actions';

import Header from '~/components/Header';
import { Card, CardHeader, CardBody, CardFooter } from '~/components/Card';
import Input from '~/components/Form/Input';

import Row from '~/components/Bootstrap/Row';

import Description from '~/components/Description';

// import { Container } from './styles';
export default function Company() {
  const dispatch = useDispatch();
  const companyReducer = useSelector(state => state.company);

  const formik = useFormik({
    initialValues: companyReducer.company,
    enableReinitialize: true,
    onSubmit: values => {
      dispatch(SaveCompanyRequest(values));
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
    dispatch(getCompanyRequest());
  }, []);

  return (
    <>
      <Header title="Empresa" />
      <div className="content">
        <div className="container">
          <Card>
            <form onSubmit={formik.handleSubmit}>
              <CardHeader description="Atualize os dados cadastrais da sua empresa" />
              <CardBody>
                <Description
                  icon={
                    <MdLibraryBooks
                      color="#495057"
                      size={30}
                      className="mr-2"
                    />
                  }
                  title="Dados da empresa"
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
                <Row>
                  <Input
                    col="4"
                    label="CNES"
                    id="inputCnes"
                    type="text"
                    name="cnes"
                    value={formik.values.cnes}
                    onChange={formik.handleChange}
                  />
                  <Input
                    col="4"
                    label="URL da logo"
                    id="inputUrl"
                    type="text"
                    name="logo_url"
                    value={formik.values.logo_url}
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
                  <Input
                    col="4"
                    label="Email"
                    id="inputEmail"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </Row>
              </CardBody>
              <CardFooter>
                <button type="button" className="btn btn-default">
                  Voltar
                </button>
                <button type="submit" className="btn btn-success float-right">
                  Atualizar Empresa
                </button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
