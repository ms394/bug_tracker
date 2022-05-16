import React from "react";

function FormField({ type, name, value, onChange, label }) {
  return (
    <div className="form-element">
      <p className="fieldLabel">{label}</p>
      <input name={name} type={type} value={value} onChange={onChange} />
    </div>
  );
}

export default FormField;
