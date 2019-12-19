import produce from 'immer';

const INITIAL_STATE = {
  openingHours: [],
  loading: false,
};

export default function openingHours(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@openingHours/GET_OPENING_HOURS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@openingHours/GET_OPENING_HOURS_SUCCESS': {
        draft.openingHours = action.payload.data;
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
