import React, { useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdRoom } from 'react-icons/md';

import { CardFooter, CardBody, CardHeader, Card } from '~/components/Card';

import history from '~/services/history';
import Input from '~/components/Form/Input';
import Row from '~/components/Bootstrap/Row';

import Description from '~/components/Description';
import Header from '~/components/Header';
import Textarea from '~/components/Form/Textarea';

import api from '~/services/api';
import { saveRoomRequest } from '~/store/modules/room/actions';

export default function RoomForm({ match }) {
  const id = useMemo(() => match.params.id, [match.params.id]);

  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: '',

      name: '',
      observations: '',
    },

    onSubmit: values => {
      if (!values.name) {
        toast.error('O nome da sala é obrigatório');
      } else {
        dispatch(saveRoomRequest({ ...values }));
      }
    },
  });

  useEffect(() => {
    async function loadRoom() {
      await api.get(`rooms/${id}`).then(response => {
        formik.setValues({
          ...formik.values,
          id: response.data.id,
          name: response.data.name,
          observations: response.data.observations,
        });
      });
    }
    if (id) loadRoom();
  }, []);

  return (
    <>
      <Header title="Salas" />

      <div className="content">
        <div className="container">
          <Card>
            <form onSubmit={formik.handleSubmit}>
              <CardHeader description="Adicione uma nova sala para sua empresa" />
              <CardBody>
                <Description
                  icon={<MdRoom color="#495057" size={30} className="mr-2" />}
                  title="Dados da sala"
                />

                <Row>
                  <Input
                    col="12"
                    label="Nome"
                    id="inputName"
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                </Row>
                <Row>
                  <Textarea
                    col="12"
                    label="Observações"
                    id="inputDescription"
                    name="observations"
                    value={formik.values.observations}
                    placeholder="Digite observações relevantes para essa sala."
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

RoomForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      partnership_id: PropTypes.string,
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
