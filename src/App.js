import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthGuard from "./components/AuthGuard";

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
import LoginModal from "./components/LoginModal";

function AppContent() {
  const { user, login } = useAuth();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [search, setSearch] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginSuccess = (userData, token) => {
    login(userData, token);
    setShowLogin(false);
    console.log('✅ Login successful, user:', userData);
  };

  return (
    <>
      {/* LOGIN MODAL - Show if user wants to login manually */}
      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)} 
          onSuccess={handleLoginSuccess}
        />
      )}

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

      {/* ROUTES - Protected by AuthGuard */}
      <Routes>
        <Route path="/" element={<AuthGuard><Home search={search} /></AuthGuard>} />
        <Route path="/income" element={<AuthGuard><Income /></AuthGuard>} />
        <Route path="/expense" element={<AuthGuard><Expense /></AuthGuard>} />
        <Route path="/edit/:id" element={<AuthGuard><EditTransaction /></AuthGuard>} />

        <Route path="/calendar" element={<AuthGuard><Calendar /></AuthGuard>} />
        <Route path="/summary" element={<AuthGuard><Summary /></AuthGuard>} />
        <Route path="/alltransactions" element={<AuthGuard><AllTransactions /></AuthGuard>} />

        <Route path="/export" element={<AuthGuard><ExportAllAccounts /></AuthGuard>} />
        <Route path="/bookmark" element={<AuthGuard><Bookmark /></AuthGuard>} />
        <Route path="/notebook" element={<AuthGuard><Notebook /></AuthGuard>} />
        <Route path="/cash-counter" element={<AuthGuard><CashCounter /></AuthGuard>} />
        <Route path="/calculator" element={<AuthGuard><Calculator /></AuthGuard>} />
        <Route path="/backup-restore" element={<AuthGuard><BackupRestore /></AuthGuard>} />
        <Route path="/app-lock" element={<AuthGuard><AppLock /></AuthGuard>} />
        <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />
        <Route path="/faq" element={<AuthGuard><FAQ /></AuthGuard>} />
      </Routes>

      {/* ADD ACCOUNT MODAL */}
      {showAddAccount && (
        <AddAccountModal
          onClose={() => setShowAddAccount(false)}
          onSuccess={() => {
            setShowAddAccount(false);
            setShowSuccess(true);
          }}
        />
      )}

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <AccountSuccessModal onClose={() => setShowSuccess(false)} />
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
