import React from "react";

export default function TextAreaField({ name, value, onChange, label }) {
  return (
    <div className="form-element">
      <p className="fieldLabel">{label}</p>
      <textarea
        value={value}
        name={name}
        rows="10"
        cols="50"
        onChange={onChange}
      ></textarea>
    </div>
  );
}
