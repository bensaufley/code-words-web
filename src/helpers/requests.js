import { showModal } from '../ducks/modal';

export const handleApiError = (dispatch) => (err) => {
  let message;
  try {
    message = err.response.data.error || err.response.data.message;
  } catch (_) {
    message = err.message;
  }
  dispatch(showModal(message, 'error'));
};
