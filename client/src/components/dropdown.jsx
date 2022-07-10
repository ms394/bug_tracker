import React, { useState } from "react";

function Dropdown({
  name,
  id,
  values,
  label,
  placeholder,
  dropdown_id,
  dropdown_value,
  handleChange,
  selectedValue,
}) {
  return (
    <div className="form-element">
      <p className="fieldLabel">{label}</p>
      <select value={selectedValue} id={id} onChange={handleChange}>
        <option key="default" value="default">
          {placeholder}
        </option>

        {values.map((val) => (
          <option key={val[dropdown_id]} value={val[dropdown_id]}>
            {val[dropdown_value]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
