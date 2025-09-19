import React from "react";
import { Text } from "react-native-elements";
import styled from "styled-components/native";
import { ExampleCredentials } from "../models";

// Tema local para evitar problemas de import
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

interface CredentialsHintProps {
  credentials: ExampleCredentials[];
}

const CredentialsHint: React.FC<CredentialsHintProps> = ({ credentials }) => {
  return (
    <Container>
      <HintText>Use as credenciais de exemplo:</HintText>
      {credentials.map((credential, index) => (
        <CredentialText key={index}>
          {credential.description}: {credential.email} / {credential.password}
        </CredentialText>
      ))}
    </Container>
  );
};

const Container = styled.View`
  margin-top: 20px;
  align-items: center;
`;

const HintText = styled(Text)`
  text-align: center;
  color: ${theme.colors.text};
  margin-bottom: 10px;
`;

const CredentialText = styled(Text)`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 12px;
  margin-bottom: 5px;
`;

export default CredentialsHint;
