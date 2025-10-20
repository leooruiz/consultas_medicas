import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { Button, Input } from "react-native-elements";
import LoadingSpinner from "../../components/LoadingSpinner";
import Logo from "../../components/Logo";
import Toast from "../../components/Toast";
import ValidationMessage from "../../components/ValidationMessage";
import { useToast } from "../../hooks/useToast";
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
  const { toast } = useToast();

  const {
    formData,
    loading,
    error,
    errors,
    showPassword,
    setEmail,
    setPassword,
    handleLogin,
    getExampleCredentials,
    togglePasswordVisibility,
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
            <View>
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
                errorMessage={errors.email?.message}
                errorStyle={{ color: "#FF5252" }}
              />
              {errors.email && (
                <ValidationMessage
                  message={errors.email.message}
                  type={errors.email.type}
                  visible={!!errors.email}
                />
              )}
            </View>

            <View>
              <Input
                placeholder="Digite sua senha"
                value={formData.password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                containerStyle={styles.input}
                leftIcon={{
                  type: "material",
                  name: "lock",
                  color: "#1E88E5",
                }}
                rightIcon={{
                  type: "material",
                  name: showPassword ? "visibility" : "visibility-off",
                  color: "#1E88E5",
                  onPress: () => togglePasswordVisibility(),
                }}
                errorMessage={errors.password?.message}
                errorStyle={{ color: "#FF5252" }}
              />
              {errors.password && (
                <ValidationMessage
                  message={errors.password.message}
                  type={errors.password.type}
                  visible={!!errors.password}
                />
              )}
            </View>

            {error ? <ErrorText>{error}</ErrorText> : null}

            <Button
              title={loading ? "ENTRANDO..." : "ENTRAR"}
              onPress={onLogin}
              loading={loading}
              disabled={loading}
              containerStyle={styles.button}
              buttonStyle={[
                styles.buttonStyle,
                loading && { backgroundColor: "#90CAF9" },
              ]}
              titleStyle={{ fontWeight: "600", letterSpacing: 1 }}
              icon={
                loading ? (
                  <LoadingSpinner size="small" color="#FFF" />
                ) : undefined
              }
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

      {/* Toast para feedback visual */}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          visible={toast.visible}
          onHide={() => {}}
        />
      )}
    </Container>
  );
};
export default LoginScreen;
