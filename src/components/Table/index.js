import React from 'react';
import PropTypes from 'prop-types';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

export default function Table({ data, columns, extrasColumns, keyField }) {
  function createExtraColumn(columns) {
    const newColumns = extrasColumns.map(item => {
      if (!item.keyConditionButtonText) {
        return {
          text: item.text,
          dataField: item.buttonText,
          mode: 'button',
          headerStyle: () => ({ width: '10%' }),
          formatter: (cell, row) => (
            <button
              key={row.id}
              type="button"
              className={item.className}
              onClick={() => item.onClick(row)}
            >
              {!item.keyConditionButtonText && item.buttonText}
            </button>
          ),
        };
      }

      return {
        text: item.text,
        dataField: item.buttonText,
        mode: 'button',
        headerStyle: () => ({ width: '10%' }),
        formatter: (cell, row) => (
          <button
            type="button"
            className={item.className}
            onClick={() => item.onClick(row)}
          >
            {item.keyConditionButtonText && row[item.keyConditionButtonText]
              ? 'Bloquear'
              : 'Desbloquear'}
          </button>
        ),
      };
    });

    return [...columns, ...newColumns];
  }

  return (
    <ToolkitProvider
      keyField={keyField}
      data={data}
      columns={createExtraColumn(columns)}
      search
    >
      {props => (
        <>
          <BootstrapTable
            {...props.baseProps}
            striped
            bootstrap4
            pagination={paginationFactory()}
            noDataIndication="Sem resultados"
          />
        </>
      )}
    </ToolkitProvider>
  );
}

Table.propTypes = {
  keyField: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  extrasColumns: PropTypes.arrayOf(PropTypes.object),
};

Table.defaultProps = {
  data: [],
  extrasColumns: [],
};
