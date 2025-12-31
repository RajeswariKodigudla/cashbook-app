import "../styles/drawer.css";
import { drawerMenu } from "../data/drawerMenu";
import { useNavigate } from "react-router-dom";

export default function Drawer({ show, close, openAddAccount }) {
  const navigate = useNavigate();

  const handleClick = (item) => {
    // ✅ Add Account → open modal (NO navigation)
    if (item.label === "Add Account") {
      openAddAccount();
      close();
      return;
    }

    // ✅ Other items → normal navigation
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
          <span className="material-icons-outlined">menu</span>
          <span className="drawer-title">Cashbook</span>
          <span className="material-icons-outlined dropdown">
            expand_more
          </span>
        </div>

        <button className="close-btn" onClick={close}>
          <span className="material-icons-outlined">close</span>
        </button>
      </div>

      {/* MENU ITEMS */}
      {drawerMenu.map((item) => (
        <div
          key={item.id}
          className="drawer-item"
          onClick={() => handleClick(item)}
        >
          <span className="material-icons-outlined icon">
            {item.icon}
          </span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
