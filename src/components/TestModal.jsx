import React, { useState, useEffect } from 'react';

// Simple Modal Component
const SimpleModal = ({ isOpen, onClose, title, children }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {children}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Test App Component
export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  const openModal = () => {
    setDebugInfo('Modal opened at ' + new Date().toLocaleTimeString());
    setShowModal(true);
  };

  const closeModal = () => {
    setDebugInfo('Modal closed at ' + new Date().toLocaleTimeString());
    setShowModal(false);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Modal Test</h1>
      
      {/* Debug Info */}
      <div className="bg-white p-4 rounded mb-6 shadow">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p><strong>Modal State:</strong> {showModal ? 'OPEN' : 'CLOSED'}</p>
        <p><strong>Last Action:</strong> {debugInfo || 'None'}</p>
      </div>

      {/* Open Button */}
      <button
        onClick={openModal}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-lg"
      >
        Open Modal
      </button>

      {/* Modal */}
      <SimpleModal
        isOpen={showModal}
        onClose={closeModal}
        title="Test Modal"
      >
        <div>
          <p className="mb-4">This is a test modal. Try closing it with:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>The × button in the header</li>
            <li>The Close button at the bottom</li>
            <li>Pressing Escape key</li>
            <li>Clicking outside the modal</li>
          </ul>
          <div className="mt-4 p-3 bg-blue-50 rounded">
            <p className="text-sm text-blue-800">
              If this modal closes properly, then the issue is with your original modal component.
            </p>
          </div>
        </div>
      </SimpleModal>
    </div>
  );
}