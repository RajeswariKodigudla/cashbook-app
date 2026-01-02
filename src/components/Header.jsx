import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/header.css";
import AccountSheet from "./AccountSheet";
import AddAccountSheet from "./AddAccountSheet";
import AccountSuccess from "./AccountSuccess";
import SearchHeader from "./SearchHeader";
import MoreMenu from "./MoreMenu";
import SortSheet from "./SortSheet";

import { getCurrentAccount, setCurrentAccount } from "../utils/accounts";

export default function Header({ openDrawer }) {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(getCurrentAccount());
  const [sheet, setSheet] = useState(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [showMenu, setShowMenu] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sortBy, setSortBy] = useState("Date Descending");

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
            className="material-symbols-outlined header-icon"
            onClick={openDrawer}
          >
            menu
          </span>

          <div className="account-title" onClick={() => setSheet("list")}>
            {current}
            <span className="material-symbols-outlined">
              expand_more
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="header-right">
          {/* SEARCH */}
          <span
            className="material-symbols-outlined header-icon"
            onClick={() => setSearchOpen(true)}
          >
            search
          </span>

          {/* PDF EXPORT */}
          <span
            className="material-symbols-outlined header-icon"
            onClick={() => navigate("/export")}
          >
            picture_as_pdf
          </span>

          {/* CALENDAR */}
          <span
            className="material-symbols-outlined header-icon"
            onClick={() => navigate("/calendar")}
          >
            calendar_month
          </span>

          {/* MORE MENU */}
          <span
            className="material-symbols-outlined header-icon"
            onClick={() => setShowMenu(true)}
          >
            more_vert
          </span>
        </div>
      </header>

      {/* MORE MENU */}
      {showMenu && (
        <MoreMenu
          onClose={() => setShowMenu(false)}
          onSort={() => {
            setShowMenu(false);
            setShowSort(true);
          }}
          onBackup={() => navigate("/backup-restore")}
          onTheme={() => navigate("/app-theme")}
          onPrint={() => window.print()}
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

      {/* ACCOUNT LIST */}
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

      {/* ADD ACCOUNT */}
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

      {/* SUCCESS */}
      {sheet === "success" && (
        <AccountSuccess onDone={() => setSheet(null)} />
      )}
    </>
  );
}
