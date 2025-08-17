import { Eye, EyeClosed } from "phosphor-react";
import { useState } from "react";

const PasswordInput = ({
  value,
  onChange,
  name = "password",
  id = "password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        className="input-login w-full pr-10"
        value={value}
        onChange={onChange}
        placeholder="Senha"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-4 text-sm text-[var(--base-05)]"
      >
        {showPassword ? (
          <EyeClosed size={28} weight="light" color="var(--base-04)" />
        ) : (
          <Eye size={28} weight="light" color="var(--base-04)" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
