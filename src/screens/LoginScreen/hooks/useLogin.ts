import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { LoginFormData } from "../models";
import { AuthService } from "../services/authService";

export const useLogin = () => {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateFormData = (updates: Partial<LoginFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const setEmail = (email: string) => {
    updateFormData({ email });
    // Limpa erro quando usuário começa a digitar
    if (error) setError("");
  };

  const setPassword = (password: string) => {
    updateFormData({ password });
    // Limpa erro quando usuário começa a digitar
    if (error) setError("");
  };

  const validateForm = (): boolean => {
    const { email, password } = formData;

    if (!email.trim()) {
      setError("Por favor, digite seu email");
      return false;
    }

    if (!AuthService.validateEmail(email)) {
      setError("Por favor, digite um email válido");
      return false;
    }

    if (!password.trim()) {
      setError("Por favor, digite sua senha");
      return false;
    }

    if (!AuthService.validatePassword(password)) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return false;
    }

    return true;
  };

  const handleLogin = async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError("");

      if (!validateForm()) {
        return false;
      }

      await signIn(formData);
      return true;
    } catch (err) {
      setError("Email ou senha inválidos");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getExampleCredentials = () => {
    return AuthService.getExampleCredentials();
  };

  return {
    formData,
    loading,
    error,
    setEmail,
    setPassword,
    handleLogin,
    getExampleCredentials,
  };
};
