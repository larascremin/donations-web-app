import React from "react";
import "./style.css";

function StandardInput({ label, value, onChange, placeholder }) {
  return (
    <div className="flex-col">
      <label className="">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="std-input"
      />{" "}
    </div>
  );
}

export default StandardInput;
