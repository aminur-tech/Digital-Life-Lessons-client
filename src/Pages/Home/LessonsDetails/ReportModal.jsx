import React, { useState } from "react";

const reasons = [
  "Inappropriate Content",
  "Hate Speech or Harassment",
  "Misleading Information",
  "Spam or Promotional Content",
  "Sensitive Content",
  "Other",
];

const ReportModal = ({ isOpen, onClose, onSubmit }) => {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason) return alert("Please select a reason.");
    onSubmit({ reason, details });
    setReason("");
    setDetails("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-xl w-80 shadow-lg relative">
        <h3 className="text-xl font-bold mb-3">Report Lesson</h3>

        <form onSubmit={handleSubmit}>
          {/* Reason Dropdown */}
          <select
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded mb-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="">Select a reason</option>
            {reasons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          {/* Details */}
          <textarea
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded mb-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            rows={4}
            placeholder="More details (optional)"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-400 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
            >
              Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
