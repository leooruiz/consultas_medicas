import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { RootStackParamList } from "../types/navigation";

// Screens
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import CreateAppointmentScreen from "../screens/CreateAppointmentScreen";
import DoctorDashboardScreen from "../screens/DoctorDashboardScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import PatientDashboardScreen from "../screens/PatientDashboardScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import UserManagementScreen from "../screens/UserManagementScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // You can use any loading indicator here
    return <></>;
  }

  return (
    <Stack.Navigator
      key={user ? user.role : "public"}
      screenOptions={{
        headerShown: false,
      }}
    >
      {!user ? (
        // Rotas públicas
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        // Rotas protegidas

        <>
          {user.role === "admin" && (
            <>
              <Stack.Screen
                name="UserManagement"
                component={UserManagementScreen}
              />
            </>
          )}
          {user.role === "admin" && (
            <Stack.Screen
              name="AdminDashboard"
              component={AdminDashboardScreen}
              options={{ title: "Painel Administrativo" }}
            />
          )}

          {user.role === "doctor" && (
            <Stack.Screen
              name="DoctorDashboard"
              component={DoctorDashboardScreen}
              options={{ title: "Painel do Médico" }}
            />
          )}

          {user.role === "patient" && (
            <Stack.Screen
              name="PatientDashboard"
              component={PatientDashboardScreen}
              options={{ title: "Painel do Paciente" }}
            />
          )}

          {/* Rotas comuns para todos os usuários autenticados */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Início" }}
          />
          <Stack.Screen
            name="CreateAppointment"
            component={CreateAppointmentScreen}
            options={{ title: "Agendar Consulta" }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: "Perfil" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
