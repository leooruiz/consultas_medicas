import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useToast } from "../../../hooks/useToast";
import {
  validateEmail,
  validatePassword,
  ValidationResult,
} from "../../../utils/validation";

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  cpf: string;
}

export interface RegisterErrors {
  name?: ValidationResult;
  email?: ValidationResult;
  password?: ValidationResult;
  confirmPassword?: ValidationResult;
  phone?: ValidationResult;
  cpf?: ValidationResult;
  general?: string;
}

export const useRegister = () => {
  const { signIn } = useAuth();
  const { showSuccess, showError, showWarning } = useToast();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    cpf: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updateFormData = (updates: Partial<RegisterFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const clearErrors = () => {
    setError("");
    setErrors({});
  };

  const setName = (name: string) => {
    updateFormData({ name });
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
    if (error) setError("");
  };

  const setEmail = (email: string) => {
    updateFormData({ email });
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
    if (error) setError("");
  };

  const setPassword = (password: string) => {
    updateFormData({ password });
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
    if (error) setError("");
  };

  const setConfirmPassword = (confirmPassword: string) => {
    updateFormData({ confirmPassword });
    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
    }
    if (error) setError("");
  };

  const setPhone = (phone: string) => {
    updateFormData({ phone });
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
    if (error) setError("");
  };

  const setCpf = (cpf: string) => {
    updateFormData({ cpf });
    if (errors.cpf) {
      setErrors((prev) => ({ ...prev, cpf: undefined }));
    }
    if (error) setError("");
  };

  const validateName = (name: string): string | undefined => {
    if (!name.trim()) {
      return "Nome é obrigatório";
    }
    if (name.trim().length < 2) {
      return "Nome deve ter pelo menos 2 caracteres";
    }
    return undefined;
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ): string | undefined => {
    if (!confirmPassword.trim()) {
      return "Confirmação de senha é obrigatória";
    }
    if (password !== confirmPassword) {
      return "As senhas não coincidem";
    }
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (!phone.trim()) {
      return "Telefone é obrigatório";
    }
    const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
      return "Digite um telefone válido";
    }
    return undefined;
  };

  const validateCpf = (cpf: string): string | undefined => {
    if (!cpf.trim()) {
      return "CPF é obrigatório";
    }
    const cpfNumbers = cpf.replace(/\D/g, "");
    if (cpfNumbers.length !== 11) {
      return "CPF deve ter 11 dígitos";
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const { name, email, password, confirmPassword, phone, cpf } = formData;
    const newErrors: RegisterErrors = {};

    // Validação de nome
    const nameError = validateName(name);
    if (nameError)
      newErrors.name = { isValid: false, message: nameError, type: "error" };

    // Validação de email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) newErrors.email = emailValidation;

    // Validação de senha
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) newErrors.password = passwordValidation;

    // Validação de confirmação de senha
    const confirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword
    );
    if (confirmPasswordError)
      newErrors.confirmPassword = {
        isValid: false,
        message: confirmPasswordError,
        type: "error",
      };

    // Validação de telefone
    const phoneError = validatePhone(phone);
    if (phoneError)
      newErrors.phone = { isValid: false, message: phoneError, type: "error" };

    // Validação de CPF
    const cpfError = validateCpf(cpf);
    if (cpfError)
      newErrors.cpf = { isValid: false, message: cpfError, type: "error" };

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const storedUsers = await AsyncStorage.getItem("@MedicalApp:users");
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        return users.some((user: any) => user.email === email);
      }
      return false;
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      return false;
    }
  };

  const handleRegister = async (): Promise<boolean> => {
    try {
      console.log("handleRegister chamado");
      setLoading(true);
      clearErrors();

      console.log("Validando formulário...");
      if (!validateForm()) {
        console.log("Formulário inválido");
        showError("Por favor, corrija os erros no formulário");
        return false;
      }
      console.log("Formulário válido");

      // Verificar se email já existe
      console.log("Verificando se email já existe...");
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        console.log("Email já existe");
        setErrors({
          email: {
            isValid: false,
            message: "Este email já está cadastrado",
            type: "error",
          },
        });
        showError("Este email já está cadastrado");
        return false;
      }
      console.log("Email disponível");

      // Salvar usuário
      console.log("Criando novo usuário...");
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        cpf: formData.cpf,
        role: "patient" as const,
        createdAt: new Date().toISOString(),
      };

      const storedUsers = await AsyncStorage.getItem("@MedicalApp:users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      users.push(newUser);
      await AsyncStorage.setItem("@MedicalApp:users", JSON.stringify(users));

      console.log("Usuário salvo com sucesso");
      showSuccess("Cadastro realizado com sucesso!");

      // Tentar fazer login automático
      try {
        console.log("Tentando fazer login automático...");
        await signIn({ email: formData.email, password: formData.password });
        console.log("Login automático bem-sucedido");
      } catch (loginError) {
        console.log("Erro no login automático:", loginError);
        // Mesmo que o login automático falhe, o registro foi bem-sucedido
        // Vamos apenas mostrar uma mensagem informativa
        showSuccess("Conta criada! Faça login com suas credenciais.");
      }

      return true;
    } catch (err) {
      console.log("Erro no handleRegister:", err);
      const errorMessage = "Erro ao criar conta. Tente novamente.";
      setError(errorMessage);
      showError(errorMessage);
      return false;
    } finally {
      console.log("Finalizando handleRegister");
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return {
    formData,
    loading,
    error,
    errors,
    showPassword,
    showConfirmPassword,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    setPhone,
    setCpf,
    handleRegister,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    clearErrors,
  };
};
