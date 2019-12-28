import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default function procedure(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@procedures/GET_PROCEDURES_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@procedures/GET_PROCEDURES_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@procedures/SAVE_PROCEDURE_REQUEST': {
        draft.loading = false;
        break;
      }
      case '@procedures/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
