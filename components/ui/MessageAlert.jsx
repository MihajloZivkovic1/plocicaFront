import React from 'react'

export function MessageAlert({ type, message }) {
  if (!message) return null;

  const alertStyles = {
    success: "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400",
    error: "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400",
  };

  return (
    <div
      className={`p-4 mb-4 text-sm rounded-lg ${alertStyles[type]}`}
      role="alert"
    >
      <span className="font-medium">{message}</span>
    </div>
  );
}
