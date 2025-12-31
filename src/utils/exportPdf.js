import jsPDF from "jspdf";
import "jspdf-autotable";
import { getTransactions } from "./transactions";

export function exportAllAccountsPdf() {
  const doc = new jsPDF();
  const data = getTransactions();

  let income = 0;
  let expense = 0;

  Object.values(data).forEach((v) => {
    income += v.income;
    expense += v.expense;
  });

  // HEADER
  doc.setFontSize(14);
  doc.text("Cash Book Report", 14, 15);
  doc.setFontSize(10);
  doc.text(
    `Generated on - ${new Date().toLocaleString()}`,
    14,
    22
  );

  // SUMMARY TABLE
  doc.autoTable({
    startY: 30,
    head: [["Income", "Expense", "Total"]],
    body: [[income, expense, income - expense]],
    styles: { halign: "center" },
  });

  // TRANSACTION TABLE
  const rows = [];
  Object.entries(data).forEach(([date, v]) => {
    if (v.income > 0) {
      rows.push([
        date,
        "Cash",
        "Income",
        "-",
        "General",
        v.income,
        "",
        v.income,
      ]);
    }
    if (v.expense > 0) {
      rows.push([
        date,
        "Cash",
        "Expense",
        "-",
        "General",
        "",
        v.expense,
        -v.expense,
      ]);
    }
  });

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [
      [
        "Date",
        "Name",
        "Account",
        "Remark",
        "Category",
        "Income",
        "Expense",
        "Balance",
      ],
    ],
    body: rows,
    styles: { fontSize: 8 },
  });

  doc.save("Cashbook_Report.pdf");
}
