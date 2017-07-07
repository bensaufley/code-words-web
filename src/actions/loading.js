export const LOADING_START = 'LOADING_START',
      LOADING_END = 'LOADING_END';

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
