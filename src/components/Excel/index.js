import React from 'react';
import PropTypes from 'prop-types';

import { FaFileExcel } from 'react-icons/fa';

import { toast } from 'react-toastify';

import ReactExport from 'react-export-excel';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;

export default function Excel({ filename, name, data, columns }) {
  console.log(data);
  return (
    <>
      {data.length > 0 && (
        <ExcelFile
          filename={filename}
          element={
            <button
              onClick={() =>
                toast.success('Sucesso! Verifique sua caixa de download')
              }
              type="button"
              className="btn btn-light mr-4 ml-4"
            >
              <FaFileExcel color="#0C6635" size={30} />
            </button>
          }
        >
          <ExcelSheet data={data} name={name}>
            {columns.map(column => (
              <ExcelColumn label={column.label} value={column.value} />
            ))}
          </ExcelSheet>
        </ExcelFile>
      )}
    </>
  );
}

Excel.propTypes = {
  filename: PropTypes.string,
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Excel.defaultProps = {
  filename: 'relatorio',
};
