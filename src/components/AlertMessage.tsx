import React from "react";
import { Modal, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import styled from "styled-components/native";
import legacyTheme from "../styles/legacyTheme";

interface AlertMessageProps {
  visible: boolean;
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  visible,
  title,
  message,
  type,
  onConfirm,
  onCancel,
  confirmText = "OK",
  cancelText = "Cancelar",
}) => {
  const getIconColor = () => {
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
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel || onConfirm}
    >
      <ModalOverlay>
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={onCancel || onConfirm}
        >
          <ModalContainer>
            <TouchableOpacity activeOpacity={1}>
              <AlertContainer>
                <IconContainer>
                  <AlertIcon color={getIconColor()}>{getIcon()}</AlertIcon>
                </IconContainer>

                <AlertTitle>{title}</AlertTitle>
                <AlertText>{message}</AlertText>

                <ButtonContainer>
                  {onCancel && (
                    <Button
                      title={cancelText}
                      onPress={onCancel}
                      buttonStyle={[
                        styles.button,
                        { backgroundColor: legacyTheme.colors.border },
                      ]}
                      titleStyle={[
                        styles.buttonText,
                        { color: legacyTheme.colors.text },
                      ]}
                      containerStyle={styles.buttonContainer}
                    />
                  )}
                  <Button
                    title={confirmText}
                    onPress={onConfirm}
                    buttonStyle={[
                      styles.button,
                      { backgroundColor: getIconColor() },
                    ]}
                    titleStyle={styles.buttonText}
                    containerStyle={styles.buttonContainer}
                  />
                </ButtonContainer>
              </AlertContainer>
            </TouchableOpacity>
          </ModalContainer>
        </TouchableOpacity>
      </ModalOverlay>
    </Modal>
  );
};

const styles = {
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600" as "600",
    color: legacyTheme.colors.white,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
};

const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const AlertContainer = styled.View`
  background-color: ${legacyTheme.colors.white};
  border-radius: 12px;
  padding: 24px;
  max-width: 320px;
  width: 100%;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 8;
`;

const IconContainer = styled.View`
  align-items: center;
  margin-bottom: 16px;
`;

interface AlertIconProps {
  color: string;
}

const AlertIcon = styled.Text<AlertIconProps>`
  font-size: 32px;
  color: ${(props: AlertIconProps) => props.color};
  font-weight: bold;
`;

const AlertTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${legacyTheme.colors.text};
  text-align: center;
  margin-bottom: 12px;
`;

const AlertText = styled.Text`
  font-size: 16px;
  color: ${legacyTheme.colors.text};
  text-align: center;
  margin-bottom: 24px;
  line-height: 22px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export default AlertMessage;
