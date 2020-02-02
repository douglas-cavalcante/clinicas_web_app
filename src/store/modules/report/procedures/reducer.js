import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default function ProcedureReport(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@procedure_report/GET_PROCEDURE_REPORT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@procedure_report/GET_PROCEDURE_REPORT_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
