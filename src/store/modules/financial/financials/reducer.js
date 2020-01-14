import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
  inputs: 0,
  outputs: 0,
  balance: 0,
};

export default function financials(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@financials/GET_FINANCIALS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@financials/GET_FINANCIALS_SUCCESS': {
        draft.data = action.payload.data.data;
        draft.inputs = action.payload.data.inputs;
        draft.outputs = action.payload.data.outputs;
        draft.balance = action.payload.data.balance;
        draft.loading = false;
        break;
      }
      case '@financials/SAVE_FINANCIAL_REQUEST': {
        draft.loading = false;
        break;
      }
      case '@financials/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
