import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Button } from "react-native-elements";
import Header from "../../components/Header";
import { RootStackParamList } from "../../types/navigation";
import ProfileCard from "./components/ProfileCard";
import { useProfile } from "./hooks/useProfile";
import { Container, ScrollView, Title, styles } from "./styles";

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Profile">;
};

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenProps["navigation"]>();
  const { user, getRoleText, getAvatarUrl, handleSignOut } = useProfile();

  if (!user) {
    return null; // ou componente de loading
  }

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Meu Perfil</Title>

        <ProfileCard
          user={user}
          getRoleText={getRoleText}
          getAvatarUrl={getAvatarUrl}
        />

        <Button
          title="Voltar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          title="Sair"
          onPress={handleSignOut}
          containerStyle={styles.button}
          buttonStyle={styles.logoutButton}
        />
      </ScrollView>
    </Container>
  );
};

export default ProfileScreen;
