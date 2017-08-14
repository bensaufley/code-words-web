import { showModal } from '../ducks/modal';

/* eslint-disable import/prefer-default-export */
export const handleApiError = (dispatch) => (err) => {
  let message;
  try {
    message = err.response.data.error || err.response.data.message;
  } catch (_) {
    message = err.message;
  }
  dispatch(showModal(message, 'error'));
};
