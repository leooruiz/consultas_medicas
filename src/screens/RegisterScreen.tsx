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
import styled from "styled-components/native";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";
import ValidationMessage from "../components/ValidationMessage";
import { useToast } from "../hooks/useToast";
import legacyTheme from "../styles/legacyTheme";
import { RootStackParamList } from "../types/navigation";
import { useRegister } from "./RegisterScreen/hooks/useRegister";

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Register">;
};

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenProps["navigation"]>();
  const { toast } = useToast();

  const {
    formData,
    loading,
    error,
    errors,
    showPassword,
    showConfirmPassword,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    setPhone,
    setCpf,
    handleRegister,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useRegister();

  const onRegister = async () => {
    console.log("onRegister chamado");
    const success = await handleRegister();
    if (success) {
      console.log("Registro bem-sucedido");
      // A navegação será tratada pelo contexto de autenticação
    } else {
      console.log("Registro falhou");
    }
  };

  return (
    <Container>
      <StatusBar backgroundColor="#1E88E5" barStyle="light-content" />
      <Header />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          <Title>Criar Conta</Title>
          <Subtitle>Preencha os dados para se cadastrar</Subtitle>

          {/* Nome */}
          <View>
            <Input
              placeholder="Nome completo"
              value={formData.name}
              onChangeText={setName}
              containerStyle={styles.input}
              leftIcon={{
                type: "material",
                name: "person",
                color: "#1E88E5",
              }}
              errorMessage={errors.name?.message}
              errorStyle={{ color: "#FF5252" }}
            />
            {errors.name && (
              <ValidationMessage
                message={errors.name.message}
                type={errors.name.type}
                visible={!!errors.name}
              />
            )}
          </View>

          {/* Email */}
          <View>
            <Input
              placeholder="Email"
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

          {/* Telefone */}
          <View>
            <Input
              placeholder="Telefone (11) 99999-9999"
              value={formData.phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              containerStyle={styles.input}
              leftIcon={{
                type: "material",
                name: "phone",
                color: "#1E88E5",
              }}
              errorMessage={errors.phone?.message}
              errorStyle={{ color: "#FF5252" }}
            />
            {errors.phone && (
              <ValidationMessage
                message={errors.phone.message}
                type={errors.phone.type}
                visible={!!errors.phone}
              />
            )}
          </View>

          {/* CPF */}
          <View>
            <Input
              placeholder="CPF (apenas números)"
              value={formData.cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
              containerStyle={styles.input}
              leftIcon={{
                type: "material",
                name: "credit-card",
                color: "#1E88E5",
              }}
              errorMessage={errors.cpf?.message}
              errorStyle={{ color: "#FF5252" }}
            />
            {errors.cpf && (
              <ValidationMessage
                message={errors.cpf.message}
                type={errors.cpf.type}
                visible={!!errors.cpf}
              />
            )}
          </View>

          {/* Senha */}
          <View>
            <Input
              placeholder="Senha (mínimo 6 caracteres)"
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

          {/* Confirmar Senha */}
          <View>
            <Input
              placeholder="Confirmar senha"
              value={formData.confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              containerStyle={styles.input}
              leftIcon={{
                type: "material",
                name: "lock-outline",
                color: "#1E88E5",
              }}
              rightIcon={{
                type: "material",
                name: showConfirmPassword ? "visibility" : "visibility-off",
                color: "#1E88E5",
                onPress: () => toggleConfirmPasswordVisibility(),
              }}
              errorMessage={errors.confirmPassword?.message}
              errorStyle={{ color: "#FF5252" }}
            />
            {errors.confirmPassword && (
              <ValidationMessage
                message={errors.confirmPassword.message}
                type={errors.confirmPassword.type}
                visible={!!errors.confirmPassword}
              />
            )}
          </View>

          {error ? <ErrorText>{error}</ErrorText> : null}

          <Button
            title={loading ? "CRIANDO CONTA..." : "CRIAR CONTA"}
            onPress={onRegister}
            loading={loading}
            disabled={loading}
            containerStyle={styles.button}
            buttonStyle={[
              styles.buttonStyle,
              loading && { backgroundColor: "#90CAF9" },
            ]}
            titleStyle={{ fontWeight: "600", letterSpacing: 1 }}
            icon={
              loading ? <LoadingSpinner size="small" color="#FFF" /> : undefined
            }
          />

          <Button
            title="VOLTAR PARA LOGIN"
            onPress={() => navigation.goBack()}
            containerStyle={styles.backButton}
            buttonStyle={styles.backButtonStyle}
            titleStyle={{ fontWeight: "600", letterSpacing: 1 }}
          />
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

const styles = {
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
  },
  buttonStyle: {
    backgroundColor: "#1E88E5",
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButton: {
    marginTop: 10,
  },
  backButtonStyle: {
    backgroundColor: "transparent",
    paddingVertical: 12,
  },
};

const Container = styled.View`
  flex: 1;
  background-color: ${legacyTheme.colors.background};
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${legacyTheme.colors.text};
  text-align: center;
  margin-bottom: 8px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: ${legacyTheme.colors.text};
  text-align: center;
  margin-bottom: 30px;
  opacity: 0.7;
`;

const ErrorText = styled.Text`
  color: ${legacyTheme.colors.error};
  text-align: center;
  margin-bottom: 15px;
  font-size: 14px;
`;

export default RegisterScreen;
