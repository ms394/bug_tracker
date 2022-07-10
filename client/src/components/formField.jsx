import React from "react";

function FormField({ type, name, value, onChange, label, placeholder }) {
  return (
    <div className="form-element">
      <p className="fieldLabel">{label}</p>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default FormField;
