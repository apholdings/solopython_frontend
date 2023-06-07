import { toast } from 'react-toastify';

const config = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  // type: 'success',
  className: 'toast-success-message',
};
// eslint-disable-next-line
export function ToastSuccess(msg) {
  return toast(msg, config);
}
