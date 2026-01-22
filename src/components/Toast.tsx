type ToastProps = {
  message: string;
  isOpen: boolean;
};

const Toast = ({ message, isOpen }: ToastProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-slate-900 px-4 py-3 text-white shadow-2xl">
      <span
        className="material-symbols-outlined text-green-400"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        check_circle
      </span>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default Toast;
