import "../styles/export.css";
import { useNavigate } from "react-router-dom";

export default function ExportAllAccounts() {
  const navigate = useNavigate();

  /* 🖨 PRINT */
  const handlePrint = () => {
    window.print();
  };

  /* 📤 SHARE */
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Cash Book Report",
        text: "Cash Book Report - 31 Dec 2025",
      });
    } else {
      alert("Sharing not supported on this browser");
    }
  };

  return (
    <div className="export-page">
      {/* HEADER */}
      <div className="export-header">
        <span
          className="material-icons-outlined back"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>

        <h3>Cash Book Report</h3>

        <div className="right-icons">
          <span
            className="material-icons-outlined"
            onClick={handlePrint}
            title="Print"
          >
            print
          </span>

          <span
            className="material-icons-outlined"
            onClick={() => navigate("/calendar")}
            title="Calendar"
          >
            calendar_today
          </span>
        </div>
      </div>

      {/* REPORT CARD */}
      <div className="report-card">
        <h4>Cash Book Report</h4>
        <p>Generated on: 31 Dec 2025, 06:37 PM</p>

        <table>
          <thead>
            <tr>
              <th>Income</th>
              <th>Expense</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="green">1</td>
              <td className="red">0</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>

        <p>Total Transactions: 1</p>

        <table className="txn-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Payment</th>
              <th>Remark</th>
              <th>Category</th>
              <th>Income</th>
              <th>Expense</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>31 Dec 2025</td>
              <td>Raji</td>
              <td>Cash</td>
              <td>NA</td>
              <td>Other</td>
              <td className="green">1</td>
              <td>-</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ACTION BUTTONS */}
      <div className="export-actions">
        <button className="save" onClick={handlePrint}>
          Save
        </button>

        <button className="share" onClick={handleShare}>
          Share
        </button>
      </div>
    </div>
  );
}
