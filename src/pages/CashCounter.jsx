import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/cashCounter.css";

const DENOMINATIONS = [500, 200, 100, 50, 20, 10, 5, 2];

export default function CashCounter() {
  const navigate = useNavigate();

  const [qty, setQty] = useState(
    DENOMINATIONS.reduce((a, d) => ({ ...a, [d]: 0 }), {})
  );

  const updateQty = (d, value) => {
    setQty({ ...qty, [d]: Math.max(0, value) });
  };

  const clearAll = () => {
    setQty(DENOMINATIONS.reduce((a, d) => ({ ...a, [d]: 0 }), {}));
  };

  const total = DENOMINATIONS.reduce(
    (sum, d) => sum + d * qty[d],
    0
  );

  return (
    <div className="cash-page">

      {/* HEADER */}
      <div className="cash-header">
        <span onClick={() => navigate(-1)}>‹</span>
        <h2>Cash Counter</h2>
        <span>⋮</span>
      </div>

      {/* TOTAL DISPLAY */}
      <div className="cash-total-box">
        <h1>{total}</h1>
        <p>{total === 0 ? "Zero" : "Total"}</p>
      </div>

      {/* TABLE HEADER */}
      <div className="cash-table-head">
        <span>Currency</span>
        <span>QTY</span>
        <span>Amount*</span>
      </div>

      {/* ROWS */}
      {DENOMINATIONS.map((d) => (
        <div key={d} className="cash-row">
          <span>{d}</span>

          <div className="qty-controls">
            <button onClick={() => updateQty(d, qty[d] - 1)}>-</button>

            <input
              type="number"
              value={qty[d]}
              onChange={(e) =>
                updateQty(d, Number(e.target.value))
              }
            />

            <button onClick={() => updateQty(d, qty[d] + 1)}>+</button>
          </div>

          <span>= {d * qty[d]}</span>
        </div>
      ))}

      {/* FOOTER */}
      <div className="cash-footer">
        <div className="total-box">
          <span>Total</span>
          <span>{total}</span>
          <span>{total}</span>
        </div>

        <div className="cash-actions">
          <button className="clear" onClick={clearAll}>
            Clear
          </button>
          <button
            className="share"
            onClick={() =>
              navigator.share
                ? navigator.share({ text: `Total Cash: ${total}` })
                : alert(`Total Cash: ${total}`)
            }
          >
            Share
          </button>
        </div>
      </div>

    </div>
  );
}
