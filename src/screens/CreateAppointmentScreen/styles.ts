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
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    width: "100%",
  } as ViewStyle,
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
  },
  cancelButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
  },
};

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const ErrorText = styled.Text`
  color: ${theme.colors.error};
  text-align: center;
  margin-bottom: 10px;
`;
