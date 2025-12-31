import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/settings.css";
import { getSettings, saveSettings } from "../utils/settings";

export default function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(getSettings());

  const update = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    saveSettings(updated);
  };

  return (
    <div className="settings-page">

      {/* HEADER */}
      <div className="settings-header">
        <span onClick={() => navigate(-1)}>‹</span>
        <h2>Settings</h2>
      </div>

      {/* CUSTOMIZE */}
      <p className="section">Customize</p>

      <Item icon="🌐" title="Language" value={settings.language} />
      <Item icon="⏰" title="Reminder & Notification" value={settings.reminder ? "On" : "Off"} />
      <Item icon="💲" title="Currency Format" value={settings.currency} />
      <Item icon="👕" title="Theme" value={settings.theme} />
      <Item icon="🏷" title="Customize Labels" value="+ Income / - Expense" />

      <Toggle
        icon="📱"
        title="Keep Screen On"
        checked={settings.keepScreenOn}
        onChange={() => update("keepScreenOn", !settings.keepScreenOn)}
      />

      {/* REPORT PERIOD */}
      <p className="section">Report Period</p>

      <Item icon="0.0" title="Number Format" value={settings.numberFormat} />
      <Item icon="🕒" title="Time Format" value={settings.timeFormat} />
      <Item icon="📅" title="First Day of Week" value={settings.firstDay} />

      {/* GENERAL */}
      <p className="section">General</p>

      <Item icon="🔗" title="Share App" />
      <Item icon="🛡" title="Privacy Policy" />
      <Item icon="📄" title="Terms of use" />
      <Item icon="🧾" title="Consent Revoke" />
      <Item icon="📞" title="After Call Setting" />

      <Item icon="ℹ️" title="Version" value={settings.version} />

    </div>
  );
}

/* ---------- SUB COMPONENTS ---------- */

function Item({ icon, title, value }) {
  return (
    <div className="settings-item">
      <span className="icon">{icon}</span>
      <div>
        <p>{title}</p>
        {value && <small>{value}</small>}
      </div>
      <span className="arrow">›</span>
    </div>
  );
}

function Toggle({ icon, title, checked, onChange }) {
  return (
    <div className="settings-item">
      <span className="icon">{icon}</span>
      <div>
        <p>{title}</p>
        <small>{checked ? "On" : "Off"}</small>
      </div>
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span />
      </label>
    </div>
  );
}
