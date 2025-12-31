import "../styles/sortSheet.css";

export default function SortSheet({ value, onChange, onClose }) {
  const options = [
    { label: "Date Descending", value: "date_desc" },
    { label: "Date Ascending", value: "date_asc" },
    { label: "Amount High to Low", value: "amount_high" },
    { label: "Amount Low to High", value: "amount_low" },
    { label: "From A to Z", value: "az" },
    { label: "From Z to A", value: "za" },
  ];

  return (
    <>
      <div className="overlay" onClick={onClose} />

      <div className="sort-sheet">
        <h3>Sort By</h3>

        {options.map((opt) => (
          <label key={opt.value} className="radio-row">
            <input
              type="radio"
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </>
  );
}

