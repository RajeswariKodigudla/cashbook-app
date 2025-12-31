import { useNavigate } from "react-router-dom";
import "../styles/backupRestore.css";
import {
  createBackup,
  restoreBackup,
  getLastBackup
} from "../utils/backup";

export default function BackupRestore() {
  const navigate = useNavigate();
  const lastBackup = getLastBackup();

  const downloadBackup = () => {
    const data = createBackup();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "CashBookBackup.json";
    link.click();

    localStorage.setItem("last_backup", data.backupTime);
    alert("Backup saved locally");
  };

  const restoreLocal = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const data = JSON.parse(reader.result);
      restoreBackup(data);
      alert("Backup restored successfully");
      window.location.reload();
    };
    reader.readAsText(file);
  };

  return (
    <div className="backup-page">

      {/* HEADER */}
      <div className="backup-header">
        <span onClick={() => navigate(-1)}>‹</span>
        <h2>Backup & Restore</h2>
      </div>

      {/* DRIVE BACKUP */}
      <h4 className="section-title">Drive Backup</h4>
      <div className="card">
        <div
          className="row"
          onClick={() =>
            alert("Google Drive backup not available in web version")
          }
        >
          <span>☁️</span>
          <div>
            <p>Sign in to Google Drive</p>
            <small>Tap to back up your data</small>
          </div>
        </div>

        <div
          className="row"
          onClick={() =>
            alert("Google Drive restore not available in web version")
          }
        >
          <span>🔄</span>
          <div>
            <p>Restore</p>
            <small>Select a backup</small>
          </div>
        </div>
      </div>

      {/* LOCAL BACKUP */}
      <h4 className="section-title">Local Backup</h4>
      <div className="card">
        <div className="row">
          <span>🕘</span>
          <div>
            <p>Last Backup</p>
            <small>{lastBackup}</small>
          </div>
        </div>

        <div className="row" onClick={downloadBackup}>
          <span>⬇️</span>
          <div>
            <p>Backup Now</p>
            <small>Save backup locally</small>
          </div>
        </div>

        <label className="row">
          <span>📂</span>
          <div>
            <p>Restore</p>
            <small>Select a backup</small>
          </div>
          <input type="file" hidden onChange={restoreLocal} />
        </label>
      </div>

      <p className="path">
        Local Backup Path: /storage/emulated/0/Download/CashBook/CashBookBackups
      </p>
    </div>
  );
}
