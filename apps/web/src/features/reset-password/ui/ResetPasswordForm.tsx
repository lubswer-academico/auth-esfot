import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useState } from "react";
import { useResetPassword } from "../model/useResetPassword";

const PASSWORD_RULES = [
  { id: "length",    label: "Mínimo 8 caracteres",                       test: (pw: string) => pw.length >= 8 },
  { id: "uppercase", label: "Al menos 1 letra mayúscula (A-Z)",          test: (pw: string) => /[A-Z]/.test(pw) },
  { id: "lowercase", label: "Al menos 1 letra minúscula (a-z)",          test: (pw: string) => /[a-z]/.test(pw) },
  { id: "number",    label: "Al menos 1 número (0-9)",                   test: (pw: string) => /[0-9]/.test(pw) },
  { id: "special",   label: "Al menos 1 carácter especial (!@#$%^&*._-)", test: (pw: string) => /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]~`;']/.test(pw) },
];

export const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [valError, setValError] = useState("");
  const [didSubmit, setDidSubmit] = useState(false);
  const { status, error, updatePassword } = useResetPassword();

  const ruleResults = PASSWORD_RULES.map(rule => ({
    ...rule,
    passed: rule.test(password),
  }));
  const isPolicyValid = ruleResults.every(r => r.passed);

  const handleSubmit = async () => {
    setDidSubmit(true);
    setValError("");
    if (!isPolicyValid) {
      setValError("La contraseña debe cumplir todos los requisitos de seguridad.");
      return;
    }
    if (password !== confirm) {
      setValError("Las contraseñas no coinciden.");
      return;
    }
    await updatePassword(password);
  };

  if (status === "loading") {
    return (
      <p style={{ textAlign: "center", color: "#64748B" }}>
        Verificando link...
      </p>
    );
  }

  if (status === "success") {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>✅</div>
        <h3 style={{ color: "#059669", marginBottom: "8px" }}>
          ¡Contraseña actualizada!
        </h3>
        <p style={{ color: "#64748B" }}>
          Regresa a la app móvil e inicia sesión con tu nueva contraseña.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Input
        label="Nueva contraseña"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Crea una contraseña segura"
      />
      <div
        style={{
          background: "#F8FAFC",
          border: "1px solid #CBD5E1",
          borderRadius: "10px",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <span style={{ fontSize: "12px", fontWeight: 700, color: "#334155" }}>
          Requisitos de contraseña segura ({ruleResults.filter(r => r.passed).length}/{PASSWORD_RULES.length}):
        </span>
        {ruleResults.map(rule => (
          <div
            key={rule.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              color: rule.passed ? "#059669" : "#64748B",
              fontWeight: rule.passed ? 600 : 400,
            }}
          >
            <span>{rule.passed ? "✅" : "○"}</span>
            <span>{rule.label}</span>
          </div>
        ))}
      </div>
      <Input
        label="Confirmar contraseña"
        type="password"
        value={confirm}
        onChange={setConfirm}
        placeholder="Repite tu contraseña"
        error={
          confirm.length > 0 && password !== confirm
            ? "Las contraseñas no coinciden"
            : undefined
        }
      />
      {(valError || (didSubmit && error)) && (
        <p style={{ color: "#DC2626", fontSize: "14px", margin: 0 }}>
          {valError || (didSubmit ? error : null)}
        </p>
      )}
      <Button onClick={handleSubmit} isLoading={status === "updating"}>
        Actualizar contraseña
      </Button>
    </div>
  );
};
