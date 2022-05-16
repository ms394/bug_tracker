import React from "react";

function Button({ type, style, value }) {
  return (
    <button className={style} type={type}>
      {value}
    </button>
  );
}

export default Button;
