export const MODAL_SHOW = 'MODAL_SHOW',
      MODAL_HIDE = 'MODAL_HIDE';

let initialState = {
  content: '',
  shown: false
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case MODAL_SHOW:
      return {
        ...state,
        shown: true,
        content: action.payload.message,
        type: action.payload.type
      };
    case MODAL_HIDE:
      return initialState;
    default:
      return state;
  }
}

export function showModal(message, type = 'notice') {
  return {
    type: MODAL_SHOW,
    payload: {
      message,
      type
    }
  };
}

export function closeModal() {
  return {
    type: MODAL_HIDE,
    payload: {}
  };
}
