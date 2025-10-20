export interface ValidationResult {
  isValid: boolean;
  message: string;
  type: "error" | "success" | "warning";
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return {
      isValid: false,
      message: "Email é obrigatório",
      type: "error",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: "Digite um email válido",
      type: "error",
    };
  }

  return {
    isValid: true,
    message: "Email válido",
    type: "success",
  };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password.trim()) {
    return {
      isValid: false,
      message: "Senha é obrigatória",
      type: "error",
    };
  }

  if (password.length < 6) {
    return {
      isValid: false,
      message: "Senha deve ter pelo menos 6 caracteres",
      type: "error",
    };
  }

  if (password.length < 8) {
    return {
      isValid: true,
      message: "Senha aceita, mas recomendamos pelo menos 8 caracteres",
      type: "warning",
    };
  }

  return {
    isValid: true,
    message: "Senha forte",
    type: "success",
  };
};

export const validateName = (name: string): ValidationResult => {
  if (!name.trim()) {
    return {
      isValid: false,
      message: "Nome é obrigatório",
      type: "error",
    };
  }

  if (name.trim().length < 2) {
    return {
      isValid: false,
      message: "Nome deve ter pelo menos 2 caracteres",
      type: "error",
    };
  }

  const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
  if (!nameRegex.test(name)) {
    return {
      isValid: false,
      message: "Nome deve conter apenas letras e espaços",
      type: "error",
    };
  }

  return {
    isValid: true,
    message: "Nome válido",
    type: "success",
  };
};

export const validateForm = (fields: {
  [key: string]: string;
}): {
  isValid: boolean;
  errors: { [key: string]: ValidationResult };
} => {
  const errors: { [key: string]: ValidationResult } = {};
  let isValid = true;

  if (fields.email !== undefined) {
    errors.email = validateEmail(fields.email);
    if (!errors.email.isValid) isValid = false;
  }

  if (fields.password !== undefined) {
    errors.password = validatePassword(fields.password);
    if (!errors.password.isValid) isValid = false;
  }

  if (fields.name !== undefined) {
    errors.name = validateName(fields.name);
    if (!errors.name.isValid) isValid = false;
  }

  return { isValid, errors };
};
