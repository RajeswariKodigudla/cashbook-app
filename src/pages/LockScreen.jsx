import { useState } from "react";
import "../styles/lockScreen.css";
import { getLock } from "../utils/appLock";

export default function LockScreen({ onUnlock }) {
  const lock = getLock();
  const [pin, setPin] = useState("");

  const unlock = () => {
    if (pin === lock.password) onUnlock();
    else alert("Wrong password");
  };

  return (
    <div className="lock-screen">
      <h2>Enter Passcode</h2>
      <input
        type="password"
        maxLength={4}
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
      <button onClick={unlock}>Unlock</button>
    </div>
  );
}
