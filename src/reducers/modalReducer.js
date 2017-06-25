import { MODAL_SHOW, MODAL_HIDE } from '../actions/modal';

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
