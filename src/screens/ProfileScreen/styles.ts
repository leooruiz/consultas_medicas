import { ViewStyle } from "react-native";
import styled from "styled-components/native";

// Importando tema diretamente da pasta styles
const theme = {
  colors: {
    primary: "#2A86FF",
    secondary: "#00C48C",
    background: "#F5F5F5",
    text: "#333333",
    error: "#FF647C",
    success: "#00C48C",
    white: "#FFFFFF",
    border: "#E0E0E0",
    warning: "#ffc107",
  },
};

export const styles = {
  scrollContent: {
    padding: 20,
  },
  button: {
    marginBottom: 20,
    width: "100%",
  } as ViewStyle,
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 12,
  },
};

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const ScrollView = styled.ScrollView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;
