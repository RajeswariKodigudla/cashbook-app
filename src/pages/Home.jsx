import { useState } from "react";
import FilterTabs from "../components/FilterTabs";
import SummaryBar from "../components/SummaryBar";
import { filterByRange } from "../utils/dateFilters";
import "../styles/home.css";

export default function Home() {
  const [range, setRange] = useState("all");

  const transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

  const filtered = filterByRange(transactions, range);

  return (
    <>
      <FilterTabs active={range} onChange={setRange} />

      {filtered.length === 0 && (
        <div className="empty">
          <div className="book-icon">
            <span className="book-c">C</span>
          </div>
          <p>No Transaction Yet</p>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="transaction-list">
          {filtered.map((t) => (
            <div key={t.id} className="transaction-row">
              <div className="left">
                <div className="name">{t.name || t.type}</div>
                <div className="time">
                  {t.date} · {t.time}
                </div>
              </div>

              <div className="center">{t.account}</div>

              <div
                className={`right ${
                  t.type === "income" ? "income" : "expense"
                }`}
              >
                {t.type === "income" ? "+" : "-"}
                {t.amount}
              </div>
            </div>
          ))}
        </div>
      )}

      <SummaryBar />
    </>
  );
}
