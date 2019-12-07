import React from 'react';

// import { Container } from './styles';

export default function Header({ title, buttonTitle }) {
  return (
    <div className="content-header">
      <div className="container">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">{title}</h1>
          </div>
          {buttonTitle && (
            <div className="col-sm-6">
              <button className="btn btn-default" type="button">
                {buttonTitle}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
