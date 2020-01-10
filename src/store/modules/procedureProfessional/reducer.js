import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default function procedureProfessional(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@procedures/GET_PROCEDURES_PROFESSIONALS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@procedures/GET_PROCEDURES_PROFESSIONALS_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
