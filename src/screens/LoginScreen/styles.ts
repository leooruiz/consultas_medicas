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
  registerButton: {
    marginTop: 10,
    width: "100%",
  } as ViewStyle,
  registerButtonStyle: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
  },
};

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  background-color: ${theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: ${theme.colors.text};
`;

export const ErrorText = styled.Text`
  color: ${theme.colors.error};
  text-align: center;
  margin-bottom: 10px;
`;
