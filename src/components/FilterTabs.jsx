import "../styles/filterTabs.css";

export default function FilterTabs({ active, onChange }) {
  const tabs = ["all", "daily", "weekly", "monthly", "yearly"];

  return (
    <div className="filter-tabs">
      {tabs.map((t) => (
        <button
          key={t}
          className={active === t ? "active" : ""}
          onClick={() => onChange(t)}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  );
}
