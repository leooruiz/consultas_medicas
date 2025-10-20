import { ExampleCredentials, LoginFormData } from "../models";

interface LoginResult {
  success: boolean;
  user?: any;
  error?: string;
}

export class AuthService {
  static getExampleCredentials(): ExampleCredentials[] {
    return [
      {
        email: "admin@example.com",
        password: "123456",
        role: "Admin",
        description: "Administrador do sistema",
      },
      {
        email: "joao@example.com",
        password: "123456",
        role: "Médico",
        description: "Dr. João Silva - Cardiologista",
      },
      {
        email: "maria@example.com",
        password: "123456",
        role: "Médico",
        description: "Dra. Maria Santos - Pediatra",
      },
      {
        email: "pedro@example.com",
        password: "123456",
        role: "Médico",
        description: "Dr. Pedro Oliveira - Ortopedista",
      },
    ];
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePassword(password: string): boolean {
    return password.length >= 6;
  }

  static async login(formData: LoginFormData): Promise<LoginResult> {
    try {
      // Simula uma chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const credentials = this.getExampleCredentials();
      const user = credentials.find(
        (cred) =>
          cred.email === formData.email && cred.password === formData.password
      );

      if (user) {
        return {
          success: true,
          user: {
            id: Math.random().toString(36).substr(2, 9),
            email: user.email,
            role: user.role,
            name: user.description.split(" - ")[0] || user.role,
          },
        };
      } else {
        return {
          success: false,
          error: "Email ou senha incorretos",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: "Erro interno do servidor",
      };
    }
  }
}
