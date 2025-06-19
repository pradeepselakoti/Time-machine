import React, { useEffect, useCallback } from "react";

const Modal = ({ isOpen, onClose, title, children, type = "default" }) => {
  // Memoize the close handler to prevent recreating on every render
  const handleClose = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log("🔍 Modal handleClose called");
    console.log("🔍 onClose type:", typeof onClose);
    console.log("🔍 onClose function:", onClose);
    
    if (typeof onClose === 'function') {
      console.log("🔍 Calling onClose function...");
      try {
        onClose();
        console.log("✅ onClose function called successfully");
      } catch (error) {
        console.error("❌ Error calling onClose:", error);
      }
    } else {
      console.warn("⚠️ Modal onClose is not a function:", onClose);
    }
  }, [onClose]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        console.log("⌨️ Escape key pressed, closing modal");
        handleClose();
      }
    };

    if (isOpen) {
      console.log("🔍 Modal is open, adding event listeners");
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      console.log("🔍 Modal is closed");
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleClose]);

  // Log when modal render state changes
  useEffect(() => {
    console.log("🔍 Modal render state - isOpen:", isOpen);
  }, [isOpen]);

  // Don't render if not open
  if (!isOpen) {
    console.log("🔍 Modal not rendering - isOpen is false");
    return null;
  }

  console.log("🔍 Modal rendering - isOpen is true");

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
      console.log("🖱️ Backdrop clicked, closing modal");
      handleClose(e);
    }
  };

  // Handle X button click
  const handleXButtonClick = (e) => {
    console.log("❌ X button clicked");
    handleClose(e);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity cursor-pointer"
        onClick={handleBackdropClick}
        aria-label="Close modal"
      />
      
      {/* Modal */}
      <div className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl border ${styles.borderColor} max-w-md w-full max-h-[90vh] overflow-hidden`}>
        {/* Header */}
        <div className={`${styles.headerBg} ${styles.headerText} px-6 py-4 flex justify-between items-center`}>
          <h2 className="text-lg font-semibold flex-1 pr-4">
            {title}
          </h2>
          <button
            onClick={handleXButtonClick}
            className="text-white hover:text-gray-200 transition-colors p-2 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 hover:bg-white hover:bg-opacity-20 flex-shrink-0"
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