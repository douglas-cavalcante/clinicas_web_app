import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
  inputs: 0,
  outputs: 0,
};

export default function account(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@account/GET_ACCOUNTS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@account/GET_ACCOUNTS_SUCCESS': {
        draft.data = action.payload.data;
        draft.inputs = action.payload.inputs;
        draft.outputs = action.payload.outputs;
        draft.loading = false;
        break;
      }
      case '@account/SAVE_ACCOUNT_REQUEST': {
        draft.loading = false;
        break;
      }
      case '@account/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
