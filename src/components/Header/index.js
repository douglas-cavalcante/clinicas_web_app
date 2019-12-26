import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Container } from './styles';

export default function Header({ title, buttonTitle, path }) {
  return (
    <div className="content-header">
      <div className="container">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">{title}</h1>
          </div>
          {buttonTitle && (
            <div className="col-sm-6">
              <Link
                to={path}
                className="btn btn-success float-right"
                type="button"
              >
                {buttonTitle}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string,
  path: PropTypes.string,
};

Header.defaultProps = {
  buttonTitle: '',
  path: '',
};
