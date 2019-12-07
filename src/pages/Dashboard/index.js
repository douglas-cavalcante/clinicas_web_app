import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '~/components/Card';
import Header from '~/components/Header';
// import { Container } from './styles';

export default function Dashboard() {
  return (
    <>
      <Header title="Convênios" />
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Card>
                <CardHeader>
                  <h5 className="card-title m-0">
                    Adicione um novo convênio para seu sistema
                  </h5>
                </CardHeader>
                <CardBody>
                  <form role="form">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="text-gray">Nome</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter ..."
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Text Disabled</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter ..."
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </CardBody>
                <CardFooter>
                  <button type="submit" className="btn btn-default">
                    Voltar
                  </button>
                  <button type="submit" className="btn btn-success float-right">
                    Cadastrar
                  </button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
