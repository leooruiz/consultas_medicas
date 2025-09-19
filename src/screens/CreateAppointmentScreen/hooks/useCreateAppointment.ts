import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { CreateAppointmentFormData, Doctor } from "../models";
import { AppointmentService } from "../services/appointmentService";

export const useCreateAppointment = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<CreateAppointmentFormData>({
    date: "",
    selectedTime: "",
    selectedDoctor: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateFormData = (updates: Partial<CreateAppointmentFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const setDate = (date: string) => {
    updateFormData({ date });
  };

  const setSelectedTime = (time: string) => {
    updateFormData({ selectedTime: time });
  };

  const setSelectedDoctor = (doctor: Doctor | null) => {
    updateFormData({ selectedDoctor: doctor });
  };

  const validateForm = (): boolean => {
    const { date, selectedTime, selectedDoctor } = formData;

    if (!date || !selectedTime || !selectedDoctor) {
      setError("Por favor, preencha a data e selecione um médico e horário");
      return false;
    }

    return true;
  };

  const createAppointment = async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError("");

      if (!validateForm()) {
        return false;
      }

      if (!user) {
        setError("Usuário não encontrado");
        return false;
      }

      const { selectedDoctor, date, selectedTime } = formData;

      await AppointmentService.createAppointment({
        patientId: user.id,
        patientName: user.name,
        doctorId: selectedDoctor!.id,
        doctorName: selectedDoctor!.name,
        date,
        time: selectedTime,
        specialty: selectedDoctor!.specialty,
      });

      return true;
    } catch (err) {
      setError("Erro ao agendar consulta. Tente novamente.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError("");

  return {
    formData,
    loading,
    error,
    setDate,
    setSelectedTime,
    setSelectedDoctor,
    createAppointment,
    clearError,
  };
};
