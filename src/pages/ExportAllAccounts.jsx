import { useState, useEffect } from "react";
import "../styles/export.css";
import { useNavigate } from "react-router-dom";
import { getTransactions } from "../utils/apiTransactions";
import { getTransactionSummary } from "../utils/apiTransactions";

export default function ExportAllAccounts() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reportDate, setReportDate] = useState("");

  // Fetch transactions and summary when component loads
  useEffect(() => {
    const loadReportData = async () => {
      try {
        setLoading(true);
        
        // Set report generation date
        const now = new Date();
        setReportDate(now.toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        }));

        // Fetch transactions
        const transactionsData = await getTransactions();
        const transactionsArray = Array.isArray(transactionsData) ? transactionsData : [];
        
        // Sort by date and time (oldest first for proper balance calculation)
        const sortedTransactions = transactionsArray.sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.time}`);
          const dateB = new Date(`${b.date} ${b.time}`);
          return dateA - dateB; // Oldest first
        });
        
        setTransactions(sortedTransactions);

        // Fetch summary
        const summaryData = await getTransactionSummary();
        setSummary(summaryData || { totalIncome: 0, totalExpense: 0, balance: 0 });
        
        setError("");
      } catch (err) {
        console.error("Error loading report data:", err);
        setError("Failed to load report data. Please try again.");
        setTransactions([]);
        setSummary({ totalIncome: 0, totalExpense: 0, balance: 0 });
      } finally {
        setLoading(false);
      }
    };

    loadReportData();
  }, []);

  // Calculate running balance
  const calculateRunningBalance = () => {
    let balance = 0;
    return transactions.map((t) => {
      if (t.type === "income") {
        balance += Number(t.amount);
      } else {
        balance -= Number(t.amount);
      }
      return { ...t, runningBalance: balance };
    });
  };

  const transactionsWithBalance = calculateRunningBalance();

  /* 🖨 PRINT */
  const handlePrint = () => {
    window.print();
  };

  /* 📤 SHARE */
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Cash Book Report",
        text: `Cash Book Report - ${reportDate}`,
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

      {/* LOADING STATE */}
      {loading && (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>Loading report data...</p>
        </div>
      )}

      {/* ERROR STATE */}
      {error && !loading && (
        <div style={{ color: "red", padding: "20px", textAlign: "center", backgroundColor: "#ffebee", margin: "20px" }}>
          {error}
        </div>
      )}

      {/* REPORT CARD */}
      {!loading && !error && (
        <div className="report-card">
          <h4>Cash Book Report</h4>
          <p>Generated on: {reportDate || new Date().toLocaleString()}</p>

          {/* SUMMARY TABLE */}
          <table>
            <thead>
              <tr>
                <th>Income</th>
                <th>Expense</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="green">{summary.totalIncome || 0}</td>
                <td className="red">{summary.totalExpense || 0}</td>
                <td>{summary.balance || 0}</td>
              </tr>
            </tbody>
          </table>

          <p>Total Transactions: {transactions.length}</p>

          {/* TRANSACTIONS TABLE */}
          {transactions.length > 0 ? (
            <table className="txn-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Name</th>
                  <th>Account</th>
                  <th>Payment</th>
                  <th>Category</th>
                  <th>Remark</th>
                  <th>Income</th>
                  <th>Expense</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {transactionsWithBalance.map((t, index) => (
                  <tr key={t.id || index}>
                    <td>{t.date || "-"}</td>
                    <td>{t.time || "-"}</td>
                    <td>{t.name || t.type || "-"}</td>
                    <td>{t.account || "-"}</td>
                    <td>{t.payment || "-"}</td>
                    <td>{t.category || "-"}</td>
                    <td>{t.remark || "-"}</td>
                    <td className={t.type === "income" ? "green" : ""}>
                      {t.type === "income" ? t.amount : "-"}
                    </td>
                    <td className={t.type === "expense" ? "red" : ""}>
                      {t.type === "expense" ? t.amount : "-"}
                    </td>
                    <td>{t.runningBalance || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
              <p>No transactions found</p>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                Start by adding income or expense transactions
              </p>
            </div>
          )}
        </div>
      )}

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
