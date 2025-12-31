import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import EditTransaction from "./pages/EditTransaction";



import Header from "./components/Header";
import Drawer from "./components/Drawer";

import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Summary from "./pages/Summary";
import AllTransactions from "./pages/AllTransactions";
import ExportAllAccounts from "./pages/ExportAllAccounts";
import Notebook from "./pages/Notebook";
import CashCounter from "./pages/CashCounter";
import Calculator from "./pages/Calculator";
import BackupRestore from "./pages/BackupRestore";
import AppLock from "./pages/AppLock";
import Settings from "./pages/Settings";
import FAQ from "./pages/FAQ";
import Bookmark from "./pages/Bookmark";

import AddAccountModal from "./components/AddAccountModal";
import AccountSuccessModal from "./components/AccountSuccessModal";

export default function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ✅ SEARCH STATE (IMPORTANT)
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      {/* HEADER */}
      <Header
        openDrawer={() => setOpenDrawer(true)}
        openAddAccount={() => setShowAddAccount(true)}
        onSearch={{ value: search, set: setSearch }}
      />

      {/* DRAWER */}
      <Drawer
        show={openDrawer}
        close={() => setOpenDrawer(false)}
        openAddAccount={() => setShowAddAccount(true)}
      />

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home search={search} />} />
          <Route path="/income" element={<Income />} />   {/* ✅ REQUIRED */}
<Route path="/expense" element={<Expense />} />
<Route path="/edit/:id" element={<EditTransaction />} />

        <Route path="/calendar" element={<Calendar />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/transactions" element={<AllTransactions />} />
        <Route path="/export" element={<ExportAllAccounts />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/notebook" element={<Notebook />} />
        <Route path="/cash-counter" element={<CashCounter />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/backup-restore" element={<BackupRestore />} />
        <Route path="/app-lock" element={<AppLock />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/faq" element={<FAQ />} />


      
      </Routes>

      {/* ADD ACCOUNT BOTTOM SHEET */}
      {showAddAccount && (
        <AddAccountModal
          onClose={() => setShowAddAccount(false)}
          onSuccess={() => {
            setShowAddAccount(false);
            setShowSuccess(true);
          }}
        />
      )}

      {/* SUCCESS BOTTOM SHEET */}
      {showSuccess && (
        <AccountSuccessModal onClose={() => setShowSuccess(false)} />
      )}
    </BrowserRouter>
  );
}
