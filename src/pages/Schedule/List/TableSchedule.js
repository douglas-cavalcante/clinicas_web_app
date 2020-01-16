import React from 'react';
import PropTypes from 'prop-types';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Show from '~/components/Show';

export default function TableSchedule({
  data,
  columns,
  extrasColumns,
  keyField,
}) {
  function customColumns(column, colIndex, { sortElement, filterElement }) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {filterElement}
        {column.text}
      </div>
    );
  }

  function createExtraColumn(columns) {
    const newColumns = extrasColumns.map(item => {
      if (!item.keyConditionButtonText) {
        return {
          text: item.text,
          dataField: item.buttonText,
          mode: 'button',
          headerStyle: () => ({ width: '10%', whiteSpace: 'wrap' }),

          formatter: (cell, row) => (
            <>
              <Show display={row.status === item.status}>
                <button
                  key={row.id}
                  type="button"
                  className={item.className}
                  onClick={() => item.onClick(row)}
                >
                  {item.buttonText}
                </button>
              </Show>
            </>
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

    const parseColumns = columns.map(item => {
      item.filter = textFilter({
        placeholder: `Buscar ...`,
        className: 'input-filter',
      });
      item.headerFormatter = customColumns;
      return item;
    });

    return [...parseColumns, ...newColumns];
  }

  const rowStyle2 = (row, rowIndex) => {
    const style = {};
    if (row.status === 'Cancelado') {
      style.color = 'tomato';
    } else if (row.status === 'Confirmado') {
      style.color = '#218838';
    } else if (row.status === 'Autorizado') {
      style.color = '#007BFF';
    }

    return style;
  };

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
            wrapperClasses="table-responsive"
            filter={filterFactory()}
            pagination={paginationFactory()}
            noDataIndication="Sem resultados"
            rowStyle={rowStyle2}
          />
        </>
      )}
    </ToolkitProvider>
  );
}

TableSchedule.propTypes = {
  keyField: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  extrasColumns: PropTypes.arrayOf(PropTypes.object),
};

TableSchedule.defaultProps = {
  data: [],
  extrasColumns: [],
};
