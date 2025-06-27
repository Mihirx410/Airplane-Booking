import React from 'react';

export default function ConfirmModal({ open, onConfirm, onCancel, message = 'Are you sure?' }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center relative">
        <h2 className="text-xl font-bold mb-4 text-[var(--primary-color)]">Confirm Action</h2>
        <p className="mb-6 text-[var(--muted-text)]">{message}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
} 