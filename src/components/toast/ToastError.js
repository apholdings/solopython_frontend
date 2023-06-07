import { toast } from 'react-toastify';

const config = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  className: 'toast-error-message',
};
// eslint-disable-next-line
export function ToastError(msg) {
  return toast(msg, config);
}
