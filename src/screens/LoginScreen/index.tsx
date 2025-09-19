import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Button, Input } from "react-native-elements";
import { RootStackParamList } from "../../types/navigation";
import CredentialsHint from "./components/CredentialsHint";
import { useLogin } from "./hooks/useLogin";
import { Container, ErrorText, styles, Title } from "./styles";

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
};

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenProps["navigation"]>();

  const {
    formData,
    loading,
    error,
    setEmail,
    setPassword,
    handleLogin,
    getExampleCredentials,
  } = useLogin();

  const onLogin = async () => {
    const success = await handleLogin();
    // Navegação será tratada pelo contexto de autenticação
  };

  return (
    <Container>
      <Title>Login</Title>

      <Input
        placeholder="Email"
        value={formData.email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={styles.input}
      />

      <Input
        placeholder="Senha"
        value={formData.password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={styles.input}
      />

      {error ? <ErrorText>{error}</ErrorText> : null}

      <Button
        title="Entrar"
        onPress={onLogin}
        loading={loading}
        containerStyle={styles.button}
        buttonStyle={styles.buttonStyle}
      />

      <Button
        title="Cadastrar Novo Paciente"
        onPress={() => navigation.navigate("Register")}
        containerStyle={styles.registerButton}
        buttonStyle={styles.registerButtonStyle}
      />

      <CredentialsHint credentials={getExampleCredentials()} />
    </Container>
  );
};

export default LoginScreen;
