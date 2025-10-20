import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import { Button, Input } from "react-native-elements";
import Logo from "../../components/Logo";
import { RootStackParamList } from "../../types/navigation";
import CredentialsHint from "./components/CredentialsHint";
import { useLogin } from "./hooks/useLogin";
import {
  BrandSection,
  Container,
  ErrorText,
  styles,
  Subtitle,
  Title,
  WelcomeContainer,
} from "./styles";

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
      <StatusBar backgroundColor="#1E88E5" barStyle="light-content" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <WelcomeContainer>
            {/* Seção da Marca */}
            <BrandSection>
              <Logo
                size="large"
                variant="vertical"
                color="primary"
                showTagline={true}
              />
              <Title>Bem-vindo ao MedConnect</Title>
              <Subtitle>
                Acesse sua conta para gerenciar suas consultas médicas
              </Subtitle>
            </BrandSection>

            {/* Formulário de Login */}
            <Input
              placeholder="Digite seu email"
              value={formData.email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              containerStyle={styles.input}
              leftIcon={{
                type: "material",
                name: "email",
                color: "#1E88E5",
              }}
            />

            <Input
              placeholder="Digite sua senha"
              value={formData.password}
              onChangeText={setPassword}
              secureTextEntry
              containerStyle={styles.input}
              leftIcon={{
                type: "material",
                name: "lock",
                color: "#1E88E5",
              }}
            />

            {error ? <ErrorText>{error}</ErrorText> : null}

            <Button
              title="ENTRAR"
              onPress={onLogin}
              loading={loading}
              containerStyle={styles.button}
              buttonStyle={styles.buttonStyle}
              titleStyle={{ fontWeight: "600", letterSpacing: 1 }}
            />

            <Button
              title="CADASTRAR NOVO PACIENTE"
              onPress={() => navigation.navigate("Register")}
              containerStyle={styles.registerButton}
              buttonStyle={styles.registerButtonStyle}
              titleStyle={{ fontWeight: "600", letterSpacing: 1 }}
            />

            {/* Dicas de credenciais */}
            <CredentialsHint credentials={getExampleCredentials()} />
          </WelcomeContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};
export default LoginScreen;
