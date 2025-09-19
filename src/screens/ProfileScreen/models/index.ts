export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "admin" | "doctor" | "patient";
  image?: string;
  specialty?: string; // Para médicos
}

export type UserRole = "admin" | "doctor" | "patient";
