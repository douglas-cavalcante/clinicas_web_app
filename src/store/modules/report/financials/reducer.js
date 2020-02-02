import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default function financialReport(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@financial_report/GET_FINANCIAL_REPORT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@financial_report/GET_FINANCIAL_REPORT_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
