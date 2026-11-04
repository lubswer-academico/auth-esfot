import { useState } from "react";

interface InputProps {
  label:        string;
  type?:        string;
  value:        string;
  onChange:     (v: string) => void;
  placeholder?: string;
  error?:       string;
}

export const Input = ({
  label, type = "text", value, onChange, placeholder, error
}: InputProps) => {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "14px", fontWeight: "500", color: "#334155" }}>
        {label}
      </label>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <input
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: isPassword ? "12px 44px 12px 16px" : "12px 16px",
            border: `1.5px solid ${error ? "#DC2626" : "#CBD5E1"}`,
            borderRadius: "10px",
            fontSize: "15px",
            color: "#0F172A",
            background: "#F8FAFC",
            outline: "none",
            fontFamily: "inherit",
            boxSizing: "border-box",
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            style={{
              position: "absolute",
              right: "12px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              padding: "4px",
              lineHeight: 1,
            }}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>
      {error && (
        <span style={{ fontSize: "12px", color: "#DC2626" }}>{error}</span>
      )}
    </div>
  );
};
