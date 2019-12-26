import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default function partnership(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@partnesership/GET_PARTNESERSHIPS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@partnesership/GET_PARTNERSHIPS_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@partnesership/SAVE_COMPANY_REQUEST': {
        draft.loading = false;
        break;
      }
      case '@partnesership/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
