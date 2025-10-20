import { ViewStyle } from "react-native";
import styled from "styled-components/native";

// Tema médico local
const medicalTheme = {
  colors: {
    primary: { main: "#1E88E5", dark: "#1565C0" },
    secondary: { main: "#43A047" },
    background: { default: "#FAFAFA", paper: "#FFFFFF" },
    text: { primary: "#212121", inverse: "#FFFFFF" },
    error: "#F44336",
    border: { light: "#E0E0E0" },
  },
  spacing: { md: 16, lg: 24, xl: 32 },
  radius: { md: 12, lg: 16 },
  typography: {
    h2: { fontSize: 28 },
    body2: { fontSize: 14 },
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
    backgroundColor: medicalTheme.colors.primary.main,
    paddingVertical: 16,
    borderRadius: medicalTheme.radius.md,
  },
  registerButton: {
    marginTop: 10,
    width: "100%",
  } as ViewStyle,
  registerButtonStyle: {
    backgroundColor: medicalTheme.colors.secondary.main,
    paddingVertical: 16,
    borderRadius: medicalTheme.radius.md,
  },
};

export const Container = styled.View`
  flex: 1;
  background-color: ${medicalTheme.colors.background.default};
`;

export const WelcomeContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${medicalTheme.spacing.lg}px;
`;

export const BrandSection = styled.View`
  align-items: center;
  margin-bottom: ${medicalTheme.spacing.xl}px;
`;

export const Title = styled.Text`
  font-size: ${medicalTheme.typography.h2.fontSize}px;
  font-weight: 600;
  text-align: center;
  margin-bottom: ${medicalTheme.spacing.md}px;
  color: ${medicalTheme.colors.text.primary};
`;

export const Subtitle = styled.Text`
  font-size: ${medicalTheme.typography.body2.fontSize}px;
  text-align: center;
  color: ${medicalTheme.colors.text.primary};
  opacity: 0.7;
  margin-bottom: ${medicalTheme.spacing.lg}px;
`;

export const ErrorText = styled.Text`
  color: ${medicalTheme.colors.error};
  text-align: center;
  margin-bottom: 10px;
  font-weight: 500;
`;
