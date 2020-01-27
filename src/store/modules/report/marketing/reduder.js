import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default function marketingReport(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@marketing_report/GET_MARKETING_REPORT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@marketing_report/GET_MARKETING_REPORT_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
