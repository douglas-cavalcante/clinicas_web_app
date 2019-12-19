import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';

import { FaCalendarAlt } from 'react-icons/fa';
import {
  getOpeningHoursRequest,
  saveOpeningHoursRequest,
} from '~/store/modules/openingHours/actions';

import Header from '~/components/Header';
import { Card, CardHeader, CardBody, CardFooter } from '~/components/Card';
import Input from '~/components/Form/Input';
import Row from '~/components/Bootstrap/Row';

import Description from '~/components/Description';

// import { Container } from './styles';
export default function OpeningHours() {
  const dispatch = useDispatch();
  const OpeningHoursReducer = useSelector(state => state.openingHours);

  useEffect(() => {
    dispatch(getOpeningHoursRequest());
  }, []);

  return (
    <>
      <Header title="Horários de funcionamento" />
      <div className="content">
        <div className="container">
          <Card>
            <CardHeader description="Atualize os horários de funcionamento da sua empresa" />
            <Formik
              enableReinitialize
              initialValues={{ schedules: OpeningHoursReducer.openingHours }}
              onSubmit={values => {
                dispatch(saveOpeningHoursRequest(values));
              }}
            >
              {({ handleChange, values }) => (
                <Form>
                  <CardBody>
                    <Description
                      icon={
                        <FaCalendarAlt
                          color="#495057"
                          size={30}
                          className="mr-2"
                        />
                      }
                      title="Dias da semana"
                    />
                    {values.schedules.length > 0 &&
                      values.schedules.map((schedule, index) => (
                        <Row>
                          <div className="col-md-2">
                            <strong>{schedule.description}</strong>
                          </div>
                          <Input
                            col="5"
                            name={`schedules.${index}.start`}
                            placeholder="Inicio"
                            value={schedule.start}
                            onChange={handleChange}
                            type="time"
                          />
                          <Input
                            col="5"
                            name={`schedules.${index}.end`}
                            placeholder="Fim"
                            value={schedule.end}
                            onChange={handleChange}
                            type="time"
                            disabled={!schedule.start}
                          />
                        </Row>
                      ))}
                  </CardBody>
                  <CardFooter>
                    <button type="button" className="btn btn-default">
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success float-right"
                    >
                      Cadastrar
                    </button>
                  </CardFooter>
                </Form>
              )}
            </Formik>
          </Card>
        </div>
      </div>
    </>
  );
}
