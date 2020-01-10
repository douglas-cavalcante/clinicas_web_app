import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: true,
};

export default function indication(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@indications/GET_INDICATIONS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@indications/GET_INDICATIONS_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@indications/SAVE_INDICATION_REQUEST': {
        draft.loading = false;
        break;
      }
      case '@indications/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
