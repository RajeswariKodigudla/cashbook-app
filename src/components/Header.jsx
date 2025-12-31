import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/header.css";
import AccountSheet from "./AccountSheet";
import AddAccountSheet from "./AddAccountSheet";
import AccountSuccess from "./AccountSuccess";
import SearchHeader from "./SearchHeader";
import MoreMenu from "./MoreMenu";
import SortSheet from "./SortSheet";
import TransactionFieldsSheet from "./TransactionFieldsSheet";
import ThemeSheet from "./ThemeSheet";
import DeleteAccountSheet from "./DeleteAccountSheet";
import { deleteAccountPermanently } from "../utils/deleteAccount";




import { getCurrentAccount, setCurrentAccount } from "../utils/accounts";

export default function Header({ openDrawer }) {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(getCurrentAccount());
  const [sheet, setSheet] = useState(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");


  // ✅ ONLY REQUIRED STATES
  const [showMenu, setShowMenu] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sortBy, setSortBy] = useState("Date Descending");
  const [showFields, setShowFields] = useState(false);
const [showDefaultView, setShowDefaultView] = useState(false);
const [showTheme, setShowTheme] = useState(false);


  /* 🔍 SEARCH HEADER */
  if (searchOpen) {
    return (
      <SearchHeader
        value={searchValue}
        onChange={setSearchValue}
        onClose={() => {
          setSearchValue("");
          setSearchOpen(false);
        }}
      />
    );
  }

  return (
    <>
      <header className="app-header">
        {/* LEFT */}
        <div className="header-left">
          <span
            className="material-icons-outlined header-icon"
            onClick={openDrawer}
          >
            menu
          </span>

          <div className="account-title" onClick={() => setSheet("list")}>
            {current}
            <span className="material-icons-outlined">expand_more</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="header-right">
          {/* SEARCH */}
          <span
            className="material-icons-outlined header-icon"
            onClick={() => setSearchOpen(true)}
          >
            search
          </span>

          {/* PDF */}
          <span
            className="material-icons-outlined header-icon"
            onClick={() => navigate("/export")}
          >
            picture_as_pdf
          </span>

          {/* CALENDAR */}
          <span
            className="material-icons-outlined header-icon"
            onClick={() => navigate("/calendar")}
          >
            calendar_today
          </span>

          {/* 3 DOTS */}
          <span
            className="material-icons-outlined header-icon"
            onClick={() => setShowMenu(true)}
          >
            more_vert
          </span>
        </div>
      </header>

      {/* 3 DOTS MENU */}
      {showMenu && (
        <MoreMenu
          onClose={() => setShowMenu(false)}
          onSort={() => {
            setShowMenu(false);
            setShowSort(true);
          }}
          onFields={() => navigate("/transaction-fields")}
          onDefaultView={() => navigate("/default-view")}
          onSave={() => navigate("/save-report")}
          onBackup={() => navigate("/backup-restore")}
          onPrint={() => window.print()}
          onTheme={() => navigate("/app-theme")}
          onDelete={() => alert("Account deleted permanently")}
        />
      )}

      {/* SORT SHEET */}
      {showSort && (
        <SortSheet
          value={sortBy}
          onChange={(val) => {
            setSortBy(val);
            setShowSort(false);
          }}
          onClose={() => setShowSort(false)}
        />
      )}

      {/* ACCOUNT SHEETS */}
      {sheet === "list" && (
        <AccountSheet
          current={current}
          onClose={() => setSheet(null)}
          onAddNew={() => setSheet("add")}
          onSelect={(name) => {
            setCurrentAccount(name);
            setCurrent(name);
            setSheet(null);
          }}
        />
      )}

      {sheet === "add" && (
        <AddAccountSheet
          onClose={() => setSheet(null)}
          onSaved={(name) => {
            setCurrentAccount(name);
            setCurrent(name);
            setSheet("success");
          }}
        />
      )}

      {sheet === "success" && (
        <AccountSuccess onDone={() => setSheet(null)} />
      )}
    </>
  );
}
