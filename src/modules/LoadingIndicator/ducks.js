export const LOADING_START = 'LOADING_START',
      LOADING_END = 'LOADING_END';

export default function loadingReducer(state = false, action) {
  switch (action.type) {
    case LOADING_START:
      return true;
    case LOADING_END:
      return false;
    default:
      return state;
  }
}

export function startLoading() {
  document.body.classList.add('loading');
  return {
    type: LOADING_START
  };
}

export function endLoading() {
  document.body.classList.remove('loading');
  return {
    type: LOADING_END
  };
}
