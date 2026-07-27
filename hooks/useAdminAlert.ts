import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export function useAdminAlert() {
  const confirmDelete = async (itemName: string) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${itemName}. This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
    return result.isConfirmed;
  };

  const showSuccess = (message: string) => {
    return MySwal.fire({
      title: 'Success!',
      text: message,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const showError = (message: string) => {
    return MySwal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
    });
  };

  const confirmAction = async (title: string, text: string) => {
    const result = await MySwal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    });
    return result.isConfirmed;
  };

  return {
    confirmDelete,
    showSuccess,
    showError,
    confirmAction,
  };
}
