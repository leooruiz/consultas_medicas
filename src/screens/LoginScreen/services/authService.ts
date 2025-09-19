import { ExampleCredentials } from "../models";

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
}
