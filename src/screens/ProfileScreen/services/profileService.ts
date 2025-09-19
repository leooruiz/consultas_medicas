import { UserRole } from "../models";

export class ProfileService {
  static getRoleText(role: UserRole): string {
    switch (role) {
      case "admin":
        return "Administrador";
      case "doctor":
        return "Médico";
      case "patient":
        return "Paciente";
      default:
        return role;
    }
  }

  static getDefaultAvatarUrl(): string {
    return "https://via.placeholder.com/150";
  }

  static formatUserRole(role: UserRole): { text: string; color: string } {
    switch (role) {
      case "admin":
        return { text: "Administrador", color: "primary" };
      case "doctor":
        return { text: "Médico", color: "success" };
      case "patient":
        return { text: "Paciente", color: "secondary" };
      default:
        return { text: role, color: "secondary" };
    }
  }
}
