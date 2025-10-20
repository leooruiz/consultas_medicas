import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { Button, Icon } from "react-native-elements";
import styled from "styled-components/native";
import legacyTheme from "../styles/legacyTheme";
import { Appointment } from "../types/appointments";
import { Doctor } from "../types/doctors";
import { RootStackParamList } from "../types/navigation";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. João Silva",
    specialty: "Cardiologista",
    image: "https://mighty.tools/mockmind-api/content/human/91.jpg",
  },
  {
    id: "2",
    name: "Dra. Maria Santos",
    specialty: "Dermatologista",
    image: "https://mighty.tools/mockmind-api/content/human/97.jpg",
  },
  {
    id: "3",
    name: "Dr. Pedro Oliveira",
    specialty: "Oftalmologista",
    image: "https://mighty.tools/mockmind-api/content/human/79.jpg",
  },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadAppointments = async () => {
    try {
      const storedAppointments = await AsyncStorage.getItem("appointments");
      if (storedAppointments) {
        setAppointments(JSON.parse(storedAppointments));
      }
    } catch (error) {
      console.error("Erro ao carregar consultas:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadAppointments();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAppointments();
    setRefreshing(false);
  };

  const getDoctorInfo = (doctorId: string): Doctor | undefined => {
    return doctors.find((doctor) => doctor.id === doctorId);
  };

  const renderAppointment = ({ item }: { item: Appointment }) => {
    const doctor = getDoctorInfo(item.doctorId);

    return (
      <AppointmentCard>
        <DoctorImage
          source={{ uri: doctor?.image || "https://via.placeholder.com/100" }}
        />
        <InfoContainer>
          <DoctorName>{doctor?.name || "Médico não encontrado"}</DoctorName>
          <DoctorSpecialty>
            {doctor?.specialty || "Especialidade não encontrada"}
          </DoctorSpecialty>
          <DateTime>
            {new Date(item.date).toLocaleDateString()} - {item.time}
          </DateTime>
          <Description>{item.description}</Description>
          <Status status={item.status}>
            {item.status === "pending" ? "Pendente" : "Confirmado"}
          </Status>
          <ActionButtons>
            <ActionButton>
              <Icon
                name="edit"
                type="material"
                size={20}
                color={legacyTheme.colors.primary}
              />
            </ActionButton>
            <ActionButton>
              <Icon
                name="delete"
                type="material"
                size={20}
                color={legacyTheme.colors.error}
              />
            </ActionButton>
          </ActionButtons>
        </InfoContainer>
      </AppointmentCard>
    );
  };

  return (
    <Container>
      <Content>
        <Button
          title="Agendar Nova Consulta"
          icon={
            <FontAwesome
              name="calendar-plus-o"
              size={20}
              color="white"
              style={{ marginRight: 8 }}
            />
          }
          buttonStyle={{
            backgroundColor: legacyTheme.colors.primary,
            borderRadius: 8,
            padding: 12,
            marginBottom: legacyTheme.spacing.medium,
          }}
          onPress={() => navigation.navigate("CreateAppointment")}
        />

        <AppointmentList
          data={appointments}
          keyExtractor={(item: Appointment) => item.id}
          renderItem={renderAppointment}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={<EmptyText>Nenhuma consulta agendada</EmptyText>}
        />
      </Content>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${legacyTheme.colors.background};
`;

const Content = styled.View`
  flex: 1;
  padding: ${legacyTheme.spacing.medium}px;
`;

const AppointmentList = styled(FlatList)`
  flex: 1;
`;

const AppointmentCard = styled.View`
  background-color: ${legacyTheme.colors.white};
  border-radius: 8px;
  padding: ${legacyTheme.spacing.medium}px;
  margin-bottom: ${legacyTheme.spacing.medium}px;
  flex-direction: row;
  align-items: center;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
`;

const DoctorImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: ${legacyTheme.spacing.medium}px;
`;

const InfoContainer = styled.View`
  flex: 1;
`;

const DoctorName = styled.Text`
  font-size: ${legacyTheme.typography.subtitle.fontSize}px;
  font-weight: ${legacyTheme.typography.subtitle.fontWeight};
  color: ${legacyTheme.colors.text};
`;

const DoctorSpecialty = styled.Text`
  font-size: ${legacyTheme.typography.body.fontSize}px;
  color: ${legacyTheme.colors.text};
  opacity: 0.8;
  margin-bottom: 4px;
`;

const DateTime = styled.Text`
  font-size: ${legacyTheme.typography.body.fontSize}px;
  color: ${legacyTheme.colors.primary};
  margin-top: 4px;
`;

const Description = styled.Text`
  font-size: ${legacyTheme.typography.body.fontSize}px;
  color: ${legacyTheme.colors.text};
  opacity: 0.8;
  margin-top: 4px;
`;

const Status = styled.Text<{ status: string }>`
  font-size: ${legacyTheme.typography.body.fontSize}px;
  color: ${(props: { status: string }) =>
    props.status === "pending"
      ? legacyTheme.colors.error
      : legacyTheme.colors.success};
  margin-top: 4px;
  font-weight: bold;
`;

const ActionButtons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: ${legacyTheme.spacing.small}px;
`;

const ActionButton = styled(TouchableOpacity)`
  padding: ${legacyTheme.spacing.small}px;
  margin-left: ${legacyTheme.spacing.small}px;
`;

const EmptyText = styled.Text`
  text-align: center;
  color: ${legacyTheme.colors.text};
  opacity: 0.6;
  margin-top: ${legacyTheme.spacing.large}px;
`;

export default HomeScreen;
