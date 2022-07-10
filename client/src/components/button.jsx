import React from "react";

function Button({ type, style, value, onClick }) {
  return (
    <button className={style} type={type} onClick={onClick}>
      {value}
    </button>
  );
}

export default Button;
