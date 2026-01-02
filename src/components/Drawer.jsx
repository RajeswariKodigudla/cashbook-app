import "../styles/drawer.css";
import { drawerMenu } from "../data/drawerMenu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logout } from "../services/auth";

export default function Drawer({ show, close, openAddAccount }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = (item) => {
    if (item.label === "Add Account") {
      openAddAccount();
      close();
      return;
    }

    if (item.path) {
      navigate(item.path);
    }
    close();
  };

  return (
    <div className={`drawer ${show ? "open" : ""}`}>

      {/* HEADER */}
      <div className="drawer-header">
        <div className="drawer-left">
          <span className="material-symbols-outlined">menu</span>
          <span className="drawer-title">Cashbook</span>
          <span className="material-symbols-outlined dropdown">
            expand_more
          </span>
        </div>

        <button className="close-btn" onClick={close}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* USER INFO */}
      {user && (
        <div className="drawer-user-info" style={{ padding: "15px", borderBottom: "1px solid #eee" }}>
          <div style={{ fontWeight: "bold" }}>{user.username || "User"}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>Logged in</div>
        </div>
      )}

      {/* MENU ITEMS */}
      {drawerMenu.map((item) => (
        <div
          key={item.id}
          className="drawer-item"
          onClick={() => handleClick(item)}
        >
          <span className="material-symbols-outlined icon">
            {item.icon}
          </span>
          <span>{item.label}</span>
        </div>
      ))}

      {/* LOGOUT BUTTON */}
      <div
        className="drawer-item"
        onClick={() => {
          if (window.confirm("Are you sure you want to logout?")) {
            logout();
            close();
          }
        }}
        style={{ marginTop: "auto", borderTop: "1px solid #eee", color: "#d32f2f" }}
      >
        <span className="material-symbols-outlined icon">logout</span>
        <span>Logout</span>
      </div>
    </div>
  );
}

