import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appointment, Doctor } from "../models";

export class AppointmentService {
  private static readonly STORAGE_KEY = "@MedicalApp:appointments";

  static async createAppointment(appointmentData: {
    patientId: string;
    patientName: string;
    doctorId: string;
    doctorName: string;
    date: string;
    time: string;
    specialty: string;
  }): Promise<Appointment> {
    try {
      // Recupera consultas existentes
      const storedAppointments = await AsyncStorage.getItem(this.STORAGE_KEY);
      const appointments: Appointment[] = storedAppointments
        ? JSON.parse(storedAppointments)
        : [];

      // Cria nova consulta
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        ...appointmentData,
        status: "pending",
      };

      // Adiciona nova consulta à lista
      appointments.push(newAppointment);

      // Salva lista atualizada
      await AsyncStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(appointments)
      );

      return newAppointment;
    } catch (error) {
      throw new Error("Erro ao agendar consulta");
    }
  }

  static async getAppointments(): Promise<Appointment[]> {
    try {
      const storedAppointments = await AsyncStorage.getItem(this.STORAGE_KEY);
      return storedAppointments ? JSON.parse(storedAppointments) : [];
    } catch (error) {
      throw new Error("Erro ao carregar consultas");
    }
  }
}

// Lista de médicos disponíveis - poderia vir de uma API
export const availableDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. João Silva",
    specialty: "Cardiologia",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    name: "Dra. Maria Santos",
    specialty: "Pediatria",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "3",
    name: "Dr. Pedro Oliveira",
    specialty: "Ortopedia",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "4",
    name: "Dra. Ana Costa",
    specialty: "Dermatologia",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "5",
    name: "Dr. Carlos Mendes",
    specialty: "Oftalmologia",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];
