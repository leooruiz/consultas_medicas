import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Button, Input } from "react-native-elements";
import styled from "styled-components/native";
import Calendar from "../../components/Calendar";
import Header from "../../components/Header";
import LoadingSpinner from "../../components/LoadingSpinner";
import Toast from "../../components/Toast";
import ValidationMessage from "../../components/ValidationMessage";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";
import legacyTheme from "../../styles/legacyTheme";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  availableHours: string[];
}

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  specialty: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

interface FormData {
  selectedDoctor: string;
  selectedDate: string;
  selectedTime: string;
  notes: string;
}

interface FormErrors {
  doctor?: string;
  date?: string;
  time?: string;
}

const CreateAppointmentScreenNew: React.FC = () => {
  const { user } = useAuth();
  const { showSuccess, showError, toast } = useToast();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    selectedDoctor: "",
    selectedDate: "",
    selectedTime: "",
    notes: "",
  });

  // Carregar médicos e consultas
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([loadDoctors(), loadAppointments()]);
    } catch (error) {
      showError("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  const loadDoctors = async () => {
    try {
      const storedDoctors = await AsyncStorage.getItem("@MedicalApp:users");
      if (storedDoctors) {
        const users = JSON.parse(storedDoctors);
        const doctorUsers = users.filter((u: any) => u.role === "doctor");
        setDoctors(doctorUsers);
      }
    } catch (error) {
      console.error("Erro ao carregar médicos:", error);
    }
  };

  const loadAppointments = async () => {
    try {
      const storedAppointments = await AsyncStorage.getItem(
        "@MedicalApp:appointments"
      );
      if (storedAppointments) {
        setAppointments(JSON.parse(storedAppointments));
      }
    } catch (error) {
      console.error("Erro ao carregar consultas:", error);
    }
  };

  // Validação do formulário
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.selectedDoctor) {
      newErrors.doctor = "Selecione um médico";
    }

    if (!formData.selectedDate) {
      newErrors.date = "Selecione uma data";
    }

    if (!formData.selectedTime) {
      newErrors.time = "Selecione um horário";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Obter datas ocupadas para marcar no calendário
  const getMarkedDates = () => {
    const marked: { [key: string]: { marked: boolean; dotColor?: string } } =
      {};

    appointments.forEach((appointment) => {
      if (appointment.doctorId === formData.selectedDoctor) {
        marked[appointment.date] = {
          marked: true,
          dotColor: appointment.status === "confirmed" ? "#4CAF50" : "#FF9800",
        };
      }
    });

    return marked;
  };

  // Obter horários disponíveis para o médico e data selecionados
  const getAvailableTimeSlots = (): string[] => {
    if (!formData.selectedDoctor || !formData.selectedDate) {
      return [];
    }

    const selectedDoctor = doctors.find(
      (d) => d.id === formData.selectedDoctor
    );
    if (!selectedDoctor) return [];

    // Horários base do médico
    const baseHours = [
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
    ];

    // Filtrar horários já ocupados
    const occupiedTimes = appointments
      .filter(
        (app) =>
          app.doctorId === formData.selectedDoctor &&
          app.date === formData.selectedDate &&
          app.status !== "cancelled"
      )
      .map((app) => app.time);

    return baseHours.filter((time) => !occupiedTimes.includes(time));
  };

  // Verificar se uma data deve ser desabilitada
  const getDisabledDates = (): string[] => {
    const disabled: string[] = [];
    const today = new Date();

    // Desabilitar finais de semana e feriados (exemplo)
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Desabilitar domingos (0) e sábados (6)
      if (date.getDay() === 0 || date.getDay() === 6) {
        disabled.push(date.toISOString().split("T")[0]);
      }
    }

    return disabled;
  };

  const handleDateSelect = (date: string) => {
    setFormData((prev) => ({ ...prev, selectedDate: date, selectedTime: "" }));
    if (errors.date) {
      setErrors((prev) => ({ ...prev, date: undefined }));
    }
  };

  const handleDoctorSelect = (doctorId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedDoctor: doctorId,
      selectedDate: "",
      selectedTime: "",
    }));
    if (errors.doctor) {
      setErrors((prev) => ({ ...prev, doctor: undefined }));
    }
  };

  const handleTimeSelect = (time: string) => {
    setFormData((prev) => ({ ...prev, selectedTime: time }));
    if (errors.time) {
      setErrors((prev) => ({ ...prev, time: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      showError("Por favor, corrija os erros no formulário");
      return;
    }

    setSubmitting(true);

    try {
      const selectedDoctor = doctors.find(
        (d) => d.id === formData.selectedDoctor
      );

      const newAppointment: Appointment = {
        id: Date.now().toString(),
        patientId: user?.id || "",
        patientName: user?.name || "",
        doctorId: formData.selectedDoctor,
        doctorName: selectedDoctor?.name || "",
        date: formData.selectedDate,
        time: formData.selectedTime,
        specialty: selectedDoctor?.specialty || "",
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      const updatedAppointments = [...appointments, newAppointment];
      await AsyncStorage.setItem(
        "@MedicalApp:appointments",
        JSON.stringify(updatedAppointments)
      );

      showSuccess("Consulta agendada com sucesso!");

      // Resetar formulário
      setFormData({
        selectedDoctor: "",
        selectedDate: "",
        selectedTime: "",
        notes: "",
      });

      // Recarregar dados
      await loadAppointments();
    } catch (error) {
      showError("Erro ao agendar consulta. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Header />
        <LoadingContainer>
          <LoadingSpinner size="large" />
          <LoadingText>Carregando...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          <Title>Agendar Consulta</Title>
          <Subtitle>Selecione o médico, data e horário</Subtitle>

          {/* Seleção do Médico */}
          <SectionTitle>Médico</SectionTitle>
          <DoctorList>
            {doctors.map((doctor) => (
              <DoctorButton
                key={doctor.id}
                isSelected={formData.selectedDoctor === doctor.id}
                onPress={() => handleDoctorSelect(doctor.id)}
              >
                <DoctorName isSelected={formData.selectedDoctor === doctor.id}>
                  {doctor.name}
                </DoctorName>
                <DoctorSpecialty
                  isSelected={formData.selectedDoctor === doctor.id}
                >
                  {doctor.specialty}
                </DoctorSpecialty>
              </DoctorButton>
            ))}
          </DoctorList>
          {errors.doctor && (
            <ValidationMessage
              message={errors.doctor}
              type="error"
              visible={true}
            />
          )}

          {/* Seleção da Data */}
          {formData.selectedDoctor && (
            <>
              <SectionTitle>Data</SectionTitle>
              <Calendar
                selectedDate={formData.selectedDate}
                onDateSelect={handleDateSelect}
                minDate={new Date()}
                disabledDates={getDisabledDates()}
                markedDates={getMarkedDates()}
              />
              {errors.date && (
                <ValidationMessage
                  message={errors.date}
                  type="error"
                  visible={true}
                />
              )}
            </>
          )}

          {/* Seleção do Horário */}
          {formData.selectedDate && (
            <>
              <SectionTitle>Horário Disponível</SectionTitle>
              <TimeSlotsContainer>
                {getAvailableTimeSlots().map((time) => (
                  <TimeSlotButton
                    key={time}
                    isSelected={formData.selectedTime === time}
                    onPress={() => handleTimeSelect(time)}
                  >
                    <TimeSlotText isSelected={formData.selectedTime === time}>
                      {time}
                    </TimeSlotText>
                  </TimeSlotButton>
                ))}
              </TimeSlotsContainer>
              {errors.time && (
                <ValidationMessage
                  message={errors.time}
                  type="error"
                  visible={true}
                />
              )}
            </>
          )}

          {/* Observações */}
          {formData.selectedTime && (
            <>
              <SectionTitle>Observações (Opcional)</SectionTitle>
              <Input
                placeholder="Observações sobre a consulta"
                value={formData.notes}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, notes: text }))
                }
                multiline
                numberOfLines={3}
                containerStyle={{ marginBottom: 20 }}
              />

              {/* Botão de Confirmação */}
              <Button
                title={submitting ? "AGENDANDO..." : "AGENDAR CONSULTA"}
                onPress={handleSubmit}
                loading={submitting}
                disabled={submitting}
                containerStyle={{ marginTop: 20 }}
                buttonStyle={{
                  backgroundColor: legacyTheme.colors.primary,
                  paddingVertical: 15,
                  borderRadius: 8,
                }}
                titleStyle={{ fontWeight: "600", letterSpacing: 1 }}
              />
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Toast para feedback */}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          visible={toast.visible}
          onHide={() => {}}
        />
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${legacyTheme.colors.background};
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.Text`
  margin-top: 16px;
  font-size: 16px;
  color: ${legacyTheme.colors.text};
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${legacyTheme.colors.text};
  text-align: center;
  margin-bottom: 8px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: ${legacyTheme.colors.text};
  text-align: center;
  margin-bottom: 30px;
  opacity: 0.7;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${legacyTheme.colors.text};
  margin-bottom: 12px;
  margin-top: 20px;
`;

const DoctorList = styled.View`
  margin-bottom: 16px;
`;

interface ButtonProps {
  isSelected: boolean;
}

const DoctorButton = styled.TouchableOpacity<ButtonProps>`
  padding: 16px;
  border-width: 1px;
  border-color: ${(props: ButtonProps) =>
    props.isSelected ? legacyTheme.colors.primary : legacyTheme.colors.border};
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: ${(props: ButtonProps) =>
    props.isSelected
      ? legacyTheme.colors.primary + "10"
      : legacyTheme.colors.white};
`;

const DoctorName = styled.Text<ButtonProps>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props: ButtonProps) =>
    props.isSelected ? legacyTheme.colors.primary : legacyTheme.colors.text};
  margin-bottom: 4px;
`;

const DoctorSpecialty = styled.Text<ButtonProps>`
  font-size: 14px;
  color: ${(props: ButtonProps) =>
    props.isSelected ? legacyTheme.colors.primary : legacyTheme.colors.text};
  opacity: 0.7;
`;

const TimeSlotsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const TimeSlotButton = styled.TouchableOpacity<ButtonProps>`
  padding: 12px 16px;
  border-width: 1px;
  border-color: ${(props: ButtonProps) =>
    props.isSelected ? legacyTheme.colors.primary : legacyTheme.colors.border};
  border-radius: 20px;
  background-color: ${(props: ButtonProps) =>
    props.isSelected ? legacyTheme.colors.primary : legacyTheme.colors.white};
  min-width: 70px;
  align-items: center;
`;

const TimeSlotText = styled.Text<ButtonProps>`
  font-size: 14px;
  font-weight: 500;
  color: ${(props: ButtonProps) =>
    props.isSelected ? legacyTheme.colors.white : legacyTheme.colors.text};
`;

export default CreateAppointmentScreenNew;
