import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/appLock.css";
import { getLock, saveLock } from "../utils/appLock";

export default function AppLock() {
  const navigate = useNavigate();
  const [lock, setLock] = useState(getLock());

  const toggleLock = () => {
    const updated = { ...lock, enabled: !lock.enabled };
    setLock(updated);
    saveLock(updated);
  };

  const setPassword = () => {
    const pwd = prompt("Set 4-digit password");
    if (pwd && pwd.length === 4) {
      const updated = { ...lock, password: pwd };
      setLock(updated);
      saveLock(updated);
      alert("Password set");
    }
  };

  const setQuestion = () => {
    const q = prompt("Security question");
    const a = prompt("Answer");
    if (q && a) {
      const updated = { ...lock, question: q, answer: a };
      setLock(updated);
      saveLock(updated);
      alert("Security question saved");
    }
  };

  const toggleFingerprint = () => {
    const updated = { ...lock, fingerprint: !lock.fingerprint };
    setLock(updated);
    saveLock(updated);
  };

  return (
    <div className="app-lock-page">

      {/* HEADER */}
      <div className="app-lock-header">
        <span onClick={() => navigate(-1)}>‹</span>
        <h2>App Lock</h2>
      </div>

      {/* APP LOCK */}
      <div className="lock-card">
        <span>📱</span>
        <div>
          <p>App Lock</p>
          <small>Set a passcode to protect your cashbook</small>
        </div>
        <label className="switch">
          <input type="checkbox" checked={lock.enabled} onChange={toggleLock} />
          <span />
        </label>
      </div>

      {/* PASSWORD */}
      <div className={`lock-card ${!lock.enabled && "disabled"}`} onClick={lock.enabled ? setPassword : null}>
        <span>🔒</span>
        <div>
          <p>Set Password</p>
          <small>Set or change password</small>
        </div>
      </div>

      {/* SECURITY QUESTION */}
      <div className={`lock-card ${!lock.enabled && "disabled"}`} onClick={lock.enabled ? setQuestion : null}>
        <span>❓</span>
        <div>
          <p>Set Security Question</p>
          <small>Used if password is forgotten</small>
        </div>
      </div>

      {/* FINGERPRINT */}
      <div className={`lock-card ${!lock.enabled && "disabled"}`}>
        <span>👆</span>
        <div>
          <p>Set Fingerprint</p>
          <small>Use fingerprint for quick access</small>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            checked={lock.fingerprint}
            onChange={toggleFingerprint}
            disabled={!lock.enabled}
          />
          <span />
        </label>
      </div>

    </div>
  );
}
