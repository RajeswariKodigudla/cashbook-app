import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/calendar.css";
import {
  getDayData,
  saveTransaction,
} from "../utils/transactions";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [summary, setSummary] = useState({ income: 0, expense: 0 });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateKey = selectedDate.toISOString().split("T")[0];

  /* Load data when date changes */
  useEffect(() => {
    setSummary(getDayData(dateKey));
  }, [dateKey]);

  /* Month navigation */
  const prevMonth = () =>
    setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () =>
    setCurrentDate(new Date(year, month + 1, 1));

  const selectDay = (day) =>
    setSelectedDate(new Date(year, month, day));

  const isSelected = (day) =>
    selectedDate.getDate() === day &&
    selectedDate.getMonth() === month &&
    selectedDate.getFullYear() === year;

  /* ADD TRANSACTION */
  const addTransaction = () => {
    const type = window.prompt("Type income or expense?");
    const amount = Number(window.prompt("Enter amount"));

    if (!type || !amount) return;

    saveTransaction(dateKey, type, amount);
    setSummary(getDayData(dateKey));
  };

  return (
    <div className="calendar-page">

      {/* HEADER */}
      <div className="calendar-header">
        <span className="back" onClick={() => navigate("/")}>‹</span>
        <h2>Calendar</h2>
        <span>☰</span>
      </div>

      {/* MONTH */}
      <div className="month-nav">
        <span onClick={prevMonth}>‹</span>
        <span className="month-text">
          {currentDate.toLocaleString("default", {
            month: "short",
            year: "numeric",
          })}
        </span>
        <span onClick={nextMonth}>›</span>
      </div>

      {/* WEEK DAYS */}
      <div className="weekdays">
        {weekDays.map((d) => <span key={d}>{d}</span>)}
      </div>

      {/* GRID */}
      <div className="calendar-grid">
        {[...Array(firstDayIndex)].map((_, i) => (
          <div key={i} />
        ))}

        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          return (
            <div
              key={day}
              className={`date-box ${isSelected(day) ? "selected" : ""}`}
              onClick={() => selectDay(day)}
            >
              {day}
            </div>
          );
        })}
      </div>

      <p className="no-transactions">
        {summary.income || summary.expense
          ? "Transactions available"
          : "No transactions for this day"}
      </p>

      {/* ADD BUTTON */}
      <button className="fab" onClick={addTransaction}>+</button>

      {/* SUMMARY */}
      <div className="calendar-summary">
        <div>
          <p className="green">Income</p>
          <h3 className="green">{summary.income}</h3>
        </div>
        <div>
          <p className="red">Expense</p>
          <h3 className="red">{summary.expense}</h3>
        </div>
        <div>
          <p>Total</p>
          <h3>{summary.income - summary.expense}</h3>
        </div>
      </div>

    </div>
  );
}
