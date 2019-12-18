import produce from 'immer';

const INITIAL_STATE = {
  company: {
    id: '',
    name: '',
    company_name: '',
    cnpj: '',
    cnes: '',
    logo_url: '',
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    complement: '',
    county: '',
    telephone: '',
    cellphone: '',
    email: '',
  },
  loading: false,
};

export default function company(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@company/GET_COMPANY_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@company/GET_COMPANY_SUCCESS': {
        draft.company = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@company/SAVE_COMPANY_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@company/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
