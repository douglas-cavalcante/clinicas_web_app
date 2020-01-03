import React from 'react';
import PropTypes from 'prop-types';

import makeAnimated from 'react-select/animated';
import CSelect from 'react-select/creatable';

export default function CreatableSelect({
  defaultValue,
  name,
  options,
  col,
  label,
  value,
  handleChangeValue,
  handleCreate,
}) {
  const animatedComponents = makeAnimated();

  function handleChangeSelect(option) {
    handleChangeValue(name, option);
  }

  return (
    <div className={`col-md-${col}`}>
      <div className="form-group">
        {label && <label htmlFor={name}>{label}</label>}
        <CSelect
          onCreateOption={handleCreate}
          isClearable
          defaultValue={defaultValue}
          components={animatedComponents}
          value={value}
          onChange={handleChangeSelect}
          name={name}
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          theme="primary75"
          styles={{
            control: styles => ({
              ...styles,
              minHeight: '34px',
            }),
            clearIndicator: styles => ({
              ...styles,
              padding: '2px 8px',
            }),
            dropdownIndicator: styles => ({
              ...styles,
              padding: '2px 8px',
            }),
            loadingIndicator: styles => ({
              ...styles,
              padding: '2px 8px',
            }),
            menu: styles => ({
              ...styles,
              zIndex: 3, // Without this menu will be overlapped by other fields
            }),
          }}
          loadingMessage={() => 'Carregando ...'}
          noOptionsMessage={() => 'Opção não encontrada'}
          placeholder="Selecione"
          formatCreateLabel={inputValue => `Cadastrar "${inputValue}"`}
        />
      </div>
    </div>
  );
}

CreatableSelect.propTypes = {
  /** um nome identificador para o componente */
  name: PropTypes.string.isRequired,
  /** Opções de seleção para o componente */
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** O espaço que ele irá ocupar dentro de uma <Row> - entre 1 e 12 */
  col: PropTypes.string.isRequired,
  /** Nome da label */
  label: PropTypes.string,
  /** valor atual do select */
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  /** Função responsável por alterar o estado do select */
  handleChangeValue: PropTypes.func.isRequired,
  /** Habilita a função de receber multiplas opções */
  defaultValue: PropTypes.object,
  handleCreate: PropTypes.func.isRequired,
};

CreatableSelect.defaultProps = {
  label: '',
};
