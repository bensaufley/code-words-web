export const MODAL_SHOW = 'MODAL_SHOW',
             MODAL_HIDE = 'MODAL_HIDE';

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
