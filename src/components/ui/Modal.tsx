interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative w-full sm:max-w-md
          bg-white rounded-t-3xl sm:rounded-2xl
          shadow-xl border border-gray-100
          max-h-[90vh] overflow-y-auto
          animate-modal-in
        "
      >
        
        {/* Drag Handle (mobile UX) */}
        <div className="sm:hidden flex justify-center pt-3">
          <div className="w-10 h-1.5 bg-gray-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          
          <h2 className="text-base font-semibold text-gray-800 tracking-tight">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              w-8 h-8 flex items-center justify-center
              rounded-full
              hover:bg-red-50 hover:text-red-500
              text-gray-400
              transition
            "
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;