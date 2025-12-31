import MenuItem from "./MenuItem";

export default function MoreMenu({
  onSort,
  onFields,
  onDefaultView,
  onSave,
  onBackup,
  onPrint,
  onTheme,
  onDelete,
  onClose
}) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="menu-card" onClick={e => e.stopPropagation()}>

        <MenuItem icon="sort" text="Sort By" onClick={onSort} />
        <MenuItem icon="view_module" text="Transaction Fields" onClick={onFields} />
        <MenuItem icon="dashboard" text="Set Default View" onClick={onDefaultView} />
        <MenuItem icon="description" text="Save Report" onClick={onSave} />
        <MenuItem icon="cloud" text="Backup & Restore" onClick={onBackup} />
        <MenuItem icon="print" text="Print Report" onClick={onPrint} />
        <MenuItem icon="palette" text="App Theme" onClick={onTheme} />
        <MenuItem icon="delete" text="Delete" danger onClick={onDelete} />


      </div>
    </div>
  );
}
