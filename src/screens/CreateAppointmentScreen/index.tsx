import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView } from "react-native";
import { Button, Input } from "react-native-elements";
import DoctorList from "../../components/DoctorList";
import Header from "../../components/Header";
import TimeSlotList from "../../components/TimeSlotList";
import { RootStackParamList } from "../../types/navigation";
import { useCreateAppointment } from "./hooks/useCreateAppointment";
import { availableDoctors } from "./services/appointmentService";
import { Container, ErrorText, SectionTitle, styles, Title } from "./styles";

type CreateAppointmentScreenProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "CreateAppointment"
  >;
};

const CreateAppointmentScreen: React.FC = () => {
  const navigation =
    useNavigation<CreateAppointmentScreenProps["navigation"]>();

  const {
    formData,
    loading,
    error,
    setDate,
    setSelectedTime,
    setSelectedDoctor,
    createAppointment,
  } = useCreateAppointment();

  const handleCreateAppointment = async () => {
    const success = await createAppointment();
    if (success) {
      alert("Consulta agendada com sucesso!");
      navigation.goBack();
    }
  };

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Agendar Consulta</Title>

        <Input
          placeholder="Data (DD/MM/AAAA)"
          value={formData.date}
          onChangeText={setDate}
          containerStyle={styles.input}
          keyboardType="numeric"
        />

        <SectionTitle>Selecione um Horário</SectionTitle>
        <TimeSlotList
          onSelectTime={setSelectedTime}
          selectedTime={formData.selectedTime}
        />

        <SectionTitle>Selecione um Médico</SectionTitle>
        <DoctorList
          doctors={availableDoctors}
          onSelectDoctor={setSelectedDoctor}
          selectedDoctorId={formData.selectedDoctor?.id}
        />

        {error ? <ErrorText>{error}</ErrorText> : null}

        <Button
          title="Agendar"
          onPress={handleCreateAppointment}
          loading={loading}
          containerStyle={styles.button}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          title="Cancelar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button}
          buttonStyle={styles.cancelButton}
        />
      </ScrollView>
    </Container>
  );
};

export default CreateAppointmentScreen;
