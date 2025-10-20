import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import legacyTheme from "../styles/legacyTheme";

interface LoadingSpinnerProps {
  size?: "small" | "large";
  color?: string;
  text?: string;
  overlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "large",
  color = legacyTheme.colors.primary,
  text = "Carregando...",
  overlay = false,
}) => {
  if (overlay) {
    return (
      <OverlayContainer>
        <LoadingContainer>
          <ActivityIndicator size={size} color={color} />
          {text && <LoadingText>{text}</LoadingText>}
        </LoadingContainer>
      </OverlayContainer>
    );
  }

  return (
    <LoadingContainer>
      <ActivityIndicator size={size} color={color} />
      {text && <LoadingText>{text}</LoadingText>}
    </LoadingContainer>
  );
};

const OverlayContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${legacyTheme.colors.white};
  border-radius: 8px;
  min-width: 120px;
`;

const LoadingText = styled.Text`
  margin-top: 10px;
  color: ${legacyTheme.colors.text};
  font-size: 16px;
  text-align: center;
`;

export default LoadingSpinner;
