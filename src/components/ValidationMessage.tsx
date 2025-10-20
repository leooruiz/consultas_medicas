import React from "react";
import styled from "styled-components/native";
import legacyTheme from "../styles/legacyTheme";

interface ValidationMessageProps {
  message: string;
  type: "error" | "success" | "warning";
  visible: boolean;
}

const ValidationMessage: React.FC<ValidationMessageProps> = ({
  message,
  type,
  visible,
}) => {
  if (!visible || !message) return null;

  const getColor = () => {
    switch (type) {
      case "error":
        return legacyTheme.colors.error;
      case "success":
        return legacyTheme.colors.success;
      case "warning":
        return legacyTheme.colors.warning;
      default:
        return legacyTheme.colors.error;
    }
  };

  const getIcon = () => {
    switch (type) {
      case "error":
        return "❌";
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      default:
        return "❌";
    }
  };

  return (
    <Container type={type}>
      <Icon>{getIcon()}</Icon>
      <Message type={type}>{message}</Message>
    </Container>
  );
};

interface StyledProps {
  type: "error" | "success" | "warning";
}

const Container = styled.View<StyledProps>`
  flex-direction: row;
  align-items: center;
  background-color: ${(props: StyledProps) => {
    switch (props.type) {
      case "error":
        return legacyTheme.colors.error + "15";
      case "success":
        return legacyTheme.colors.success + "15";
      case "warning":
        return legacyTheme.colors.warning + "15";
      default:
        return legacyTheme.colors.error + "15";
    }
  }};
  border-left-width: 4px;
  border-left-color: ${(props: StyledProps) => {
    switch (props.type) {
      case "error":
        return legacyTheme.colors.error;
      case "success":
        return legacyTheme.colors.success;
      case "warning":
        return legacyTheme.colors.warning;
      default:
        return legacyTheme.colors.error;
    }
  }};
  padding: 12px 16px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const Icon = styled.Text`
  font-size: 16px;
  margin-right: 8px;
`;

const Message = styled.Text<StyledProps>`
  color: ${(props: StyledProps) => {
    switch (props.type) {
      case "error":
        return legacyTheme.colors.error;
      case "success":
        return legacyTheme.colors.success;
      case "warning":
        return legacyTheme.colors.warning;
      default:
        return legacyTheme.colors.error;
    }
  }};
  font-size: 14px;
  flex: 1;
  font-weight: 500;
`;

export default ValidationMessage;
