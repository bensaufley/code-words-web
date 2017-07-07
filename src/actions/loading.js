export const LOADING_START = 'LOADING_START',
      LOADING_END = 'LOADING_END';

export function startLoading() {
  return {
    type: LOADING_START
  };
}

export function endLoading() {
  return {
    type: LOADING_END
  };
}
