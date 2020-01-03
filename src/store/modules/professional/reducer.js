import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default function professional(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@professionals/GET_PROFESSIONALS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@professionals/GET_PROFESSIONALS_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@professionals/SAVE_PROFESSIONALS_REQUEST': {
        draft.loading = false;
        break;
      }
      case '@professionals/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
