import { getFields } from "../utils/transactionFields";

export default function Home() {
  const fields = getFields();

  const txn = {
    name: "Raji",
    category: "Other",
    remark: "NA",
    time: "06:35 PM",
    amount: 1,
  };

  return (
    <div className="transaction-row">
      {fields.name && <div>{txn.name}</div>}
      {fields.category && <div>{txn.category}</div>}
      {fields.remark && <div>{txn.remark}</div>}
      {fields.time && <div>{txn.time}</div>}
      <strong>{txn.amount}</strong>
    </div>
  );
}
