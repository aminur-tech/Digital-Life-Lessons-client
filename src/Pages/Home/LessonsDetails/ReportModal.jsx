import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const reasons = [
  "Inappropriate Content",
  "Hate Speech or Harassment",
  "Misleading Information",
  "Spam or Promotional Content",
  "Sensitive Content",
  "Other",
];

const ReportModal = ({ isOpen, onClose, lessonId,Reporter,author_Img }) => {
  const axiosSecure = useAxiosSecure();

  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  if (!isOpen) return null;

  const handleReport = async (e) => {
    e.preventDefault();

    if (!reason) {
      alert("Please select a reason");
      return;
    }

    try {
      const res = await axiosSecure.post("/lessons/report", {
        lessonId,
        Reporter,
        reason,
        details,
        author_Img,
        createdAt: new Date(),
      });

      console.log("Report submitted:", res.data);

      toast.success("Report submitted successfully.");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to submit report.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-80 shadow-lg relative">
        <h3 className="text-xl font-bold mb-3">Report Lesson</h3>

        <form onSubmit={handleReport}>
          {/* Reason Dropdown */}
          <select
            className="w-full border p-2 rounded mb-3"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="">Select a reason</option>
            {reasons.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          {/* Details */}
          <textarea
            className="w-full border p-2 rounded mb-3"
            rows={4}
            placeholder="More details (optional)"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
