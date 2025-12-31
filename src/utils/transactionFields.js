const DEFAULT_FIELDS = {
  name: true,
  category: true,
  remark: true,
  time: true,
};

export function getFields() {
  return JSON.parse(localStorage.getItem("txnFields")) || DEFAULT_FIELDS;
}

export function saveFields(fields) {
  localStorage.setItem("txnFields", JSON.stringify(fields));
}
