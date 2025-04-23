import React, { useState } from "react";
import "./style.css";
import { Eye, EyeSlash } from "phosphor-react";

function PasswordInput({ label, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex-col psw-input-wrap">
      <label className="">{label}</label>
      <div className="input-wrap">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="psw-input"
          placeholder="Senha"
        />
        <span
          className="icon-wrap"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeSlash size={20} color="#8a8984" className="-psw-icon" />
          ) : (
            <Eye size={20} color="#8a8984" className="-psw-icon" />
          )}
        </span>
      </div>
    </div>
  );
}

export default PasswordInput;
