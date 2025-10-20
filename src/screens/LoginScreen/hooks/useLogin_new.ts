import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useToast } from "../../../hooks/useToast";
import {
  validateEmail as validateEmailUtil,
  validatePassword as validatePasswordUtil,
  ValidationResult,
} from "../../../utils/validation";
import { LoginFormData } from "../models";
import { AuthService } from "../services/authService";

export interface LoginErrors {
  email?: ValidationResult;
  password?: ValidationResult;
  general?: string;
}

export const useLogin = () => {
  const { signIn } = useAuth();
  const { showSuccess, showError, showWarning, toast, hideToast } = useToast();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [fieldValidations, setFieldValidations] = useState<{
    email?: ValidationResult;
    password?: ValidationResult;
  }>({});

  const updateFormData = (updates: Partial<LoginFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const clearErrors = () => {
    setError("");
    setErrors({});
    setFieldValidations({});
  };

  const validateEmailField = (email: string) => {
    const validation = validateEmailUtil(email);
    setFieldValidations((prev) => ({ ...prev, email: validation }));
    return validation;
  };

  const validatePasswordField = (password: string) => {
    const validation = validatePasswordUtil(password);
    setFieldValidations((prev) => ({ ...prev, password: validation }));
    return validation;
  };

  const setEmail = (email: string) => {
    updateFormData({ email });
    // Valida em tempo real
    if (email.trim()) {
      validateEmailField(email);
    } else {
      setFieldValidations((prev) => ({ ...prev, email: undefined }));
    }
    // Limpa erros quando usuário começa a digitar
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const setPassword = (password: string) => {
    updateFormData({ password });
    // Valida em tempo real
    if (password.trim()) {
      validatePasswordField(password);
    } else {
      setFieldValidations((prev) => ({ ...prev, password: undefined }));
    }
    // Limpa erros quando usuário começa a digitar
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = (): boolean => {
    const emailValidation = validateEmailField(formData.email);
    const passwordValidation = validatePasswordField(formData.password);

    const newErrors: LoginErrors = {};

    if (!emailValidation.isValid) {
      newErrors.email = emailValidation;
    }

    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (): Promise<boolean> => {
    try {
      setLoading(true);
      clearErrors();

      // Validação do formulário
      if (!validateForm()) {
        showError("Por favor, corrija os erros no formulário");
        return false;
      }

      // Tentativa de login
      const result = await AuthService.login(formData);

      if (result.success && result.user) {
        await signIn(result.user);
        showSuccess("Login realizado com sucesso!");
        return true;
      } else {
        const errorMessage = result.error || "Credenciais inválidas";
        setError(errorMessage);
        showError(errorMessage);
        return false;
      }
    } catch (error: any) {
      const errorMessage =
        error.message || "Erro ao fazer login. Tente novamente.";
      setError(errorMessage);
      showError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getExampleCredentials = () => {
    return [
      {
        role: "Paciente",
        email: "paciente@email.com",
        password: "123456",
        description: "Acesso do paciente",
      },
      {
        role: "Médico",
        email: "medico@email.com",
        password: "123456",
        description: "Acesso do médico",
      },
      {
        role: "Admin",
        email: "admin@email.com",
        password: "123456",
        description: "Acesso administrativo",
      },
    ];
  };

  return {
    formData,
    loading,
    error,
    errors,
    fieldValidations,
    showPassword,
    toast,
    hideToast,
    setEmail,
    setPassword,
    togglePasswordVisibility,
    handleLogin,
    clearErrors,
    getExampleCredentials,
  };
};
