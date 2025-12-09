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

  if (!isOpen) return null;

  const submitReport = () => {
    if (!reason) return;
    onSubmit(reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
        <h3 className="text-xl font-bold mb-3">Report Lesson</h3>

        <select
          className="w-full border p-2 rounded"
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

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={submitReport}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
