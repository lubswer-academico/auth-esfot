export interface PasswordRule {
  id:    string;
  label: string;
  test:  (password: string) => boolean;
}

export const PASSWORD_RULES: PasswordRule[] = [
  {
    id: "length",
    label: "Mínimo 8 caracteres",
    test: (pw) => pw.length >= 8,
  },
  {
    id: "uppercase",
    label: "Al menos 1 letra mayúscula (A-Z)",
    test: (pw) => /[A-Z]/.test(pw),
  },
  {
    id: "lowercase",
    label: "Al menos 1 letra minúscula (a-z)",
    test: (pw) => /[a-z]/.test(pw),
  },
  {
    id: "number",
    label: "Al menos 1 número (0-9)",
    test: (pw) => /[0-9]/.test(pw),
  },
  {
    id: "special",
    label: "Al menos 1 carácter especial (!@#$%^&*._-)",
    test: (pw) => /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]~`;']/.test(pw),
  },
];

export const evaluatePasswordPolicy = (password: string) => {
  const results = PASSWORD_RULES.map((rule) => ({
    ...rule,
    passed: rule.test(password),
  }));

  const passedCount = results.filter((r) => r.passed).length;
  const isValid = passedCount === PASSWORD_RULES.length;
  const missingRules = results.filter((r) => !r.passed).map((r) => r.label);

  return {
    results,
    passedCount,
    totalRules: PASSWORD_RULES.length,
    isValid,
    missingRules,
  };
};

