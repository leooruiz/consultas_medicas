import React, { useEffect, useState } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import legacyTheme from "../styles/legacyTheme";

interface ToastProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  visible: boolean;
  onHide: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  visible,
  onHide,
  duration = 3000,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onHide();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, fadeAnim, duration, onHide]);

  if (!visible) return null;

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return legacyTheme.colors.success;
      case "error":
        return legacyTheme.colors.error;
      case "warning":
        return legacyTheme.colors.warning;
      case "info":
        return legacyTheme.colors.primary;
      default:
        return legacyTheme.colors.primary;
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✗";
      case "warning":
        return "⚠";
      case "info":
        return "ℹ";
      default:
        return "ℹ";
    }
  };

  return (
    <ToastContainer as={Animated.View} style={{ opacity: fadeAnim }}>
      <ToastContent backgroundColor={getBackgroundColor()}>
        <ToastIcon>{getIcon()}</ToastIcon>
        <ToastMessage>{message}</ToastMessage>
      </ToastContent>
    </ToastContainer>
  );
};

interface ToastContentProps {
  backgroundColor: string;
}

const ToastContainer = styled.View`
  position: absolute;
  top: 60px;
  left: 20px;
  right: 20px;
  z-index: 1000;
`;

const ToastContent = styled.View<ToastContentProps>`
  background-color: ${(props: ToastContentProps) => props.backgroundColor};
  padding: 15px 20px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const ToastIcon = styled.Text`
  color: ${legacyTheme.colors.white};
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

const ToastMessage = styled.Text`
  color: ${legacyTheme.colors.white};
  font-size: 14px;
  flex: 1;
  font-weight: 500;
`;

export default Toast;
