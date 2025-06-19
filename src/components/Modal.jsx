import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children, type = "default" }) => {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Don't render if not open
  if (!isOpen) return null;

  // Get modal styles based on type
  const getModalStyles = () => {
    switch (type) {
      case "success":
        return {
          headerBg: "bg-green-500 dark:bg-green-600",
          headerText: "text-white",
          borderColor: "border-green-200 dark:border-green-700"
        };
      case "warning":
        return {
          headerBg: "bg-yellow-500 dark:bg-yellow-600",
          headerText: "text-white",
          borderColor: "border-yellow-200 dark:border-yellow-700"
        };
      case "error":
        return {
          headerBg: "bg-red-500 dark:bg-red-600",
          headerText: "text-white",
          borderColor: "border-red-200 dark:border-red-700"
        };
      default:
        return {
          headerBg: "bg-blue-500 dark:bg-blue-600",
          headerText: "text-white",
          borderColor: "border-blue-200 dark:border-blue-700"
        };
    }
  };

  const styles = getModalStyles();

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  };

  // Handle close button click
  const handleCloseClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleBackdropClick}
      />
      
      {/* Modal */}
      <div className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl border ${styles.borderColor} max-w-md w-full mx-4 max-h-[90vh] overflow-hidden`}>
        {/* Header */}
        <div className={`${styles.headerBg} ${styles.headerText} px-6 py-4 flex justify-between items-center`}>
          <h2 className="text-lg font-semibold">
            {title}
          </h2>
          <button
            onClick={handleCloseClick}
            className="text-white hover:text-gray-200 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label="Close modal"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 max-h-96 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;