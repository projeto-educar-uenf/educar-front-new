import { toast as reactToastifyToast } from 'react-toastify';

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

function toast({ title, description, variant = 'default' }: ToastOptions) {
  const message = title && description ? `${title}: ${description}` : title || description || '';
  
  if (variant === 'destructive') {
    return reactToastifyToast.error(message);
  } else {
    return reactToastifyToast.success(message);
  }
}

function useToast() {
  return {
    toast,
    dismiss: (toastId?: string) => {
      if (toastId) {
        reactToastifyToast.dismiss(toastId);
      } else {
        reactToastifyToast.dismiss();
      }
    },
  };
}

export { useToast, toast };
