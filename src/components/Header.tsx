import React from "react";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import styled from "styled-components/native";
import { useAuth } from "../contexts/AuthContext";
import medicalTheme from "../styles/theme";
import Logo from "./Logo";

interface HeaderProps {
  showLogo?: boolean;
  variant?: "primary" | "clean";
  onProfilePress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showLogo = true,
  variant = "clean",
  onProfilePress,
}) => {
  const { user } = useAuth();

  if (!user) return null;

  const isClean = variant === "clean";

  return (
    <Container variant={variant}>
      <MainContent>
        {/* Logo Section */}
        {showLogo && (
          <LogoSection>
            <Logo
              size="small"
              variant="horizontal"
              color={isClean ? "primary" : "white"}
            />
          </LogoSection>
        )}

        {/* User Section */}
        <UserSection>
          <UserInfo>
            <TextContainer>
              <WelcomeText variant={variant}>
                Olá, {user.role === "doctor" ? "Dr(a)." : ""}
              </WelcomeText>
              <UserName variant={variant}>{user.name}</UserName>
            </TextContainer>

            <TouchableOpacity onPress={onProfilePress}>
              <Avatar
                size="medium"
                rounded
                source={{
                  uri: user.image || "https://via.placeholder.com/150",
                }}
                containerStyle={[
                  styles.avatar,
                  {
                    backgroundColor: isClean
                      ? medicalTheme.colors.primary.main
                      : medicalTheme.colors.primary.light,
                  },
                ]}
              />
            </TouchableOpacity>
          </UserInfo>

          {/* Role Badge */}
          <RoleBadge role={user.role} variant={variant}>
            <RoleText variant={variant}>
              {user.role === "admin"
                ? "Administrador"
                : user.role === "doctor"
                ? "Médico"
                : "Paciente"}
            </RoleText>
          </RoleBadge>
        </UserSection>
      </MainContent>
    </Container>
  );
};

const styles = {
  avatar: {
    borderWidth: 2,
    borderColor: medicalTheme.colors.primary.light,
  },
};

const Container = styled.View<{ variant: string }>`
  background-color: ${(props: { variant: string }) =>
    props.variant === "clean"
      ? medicalTheme.colors.background.paper
      : medicalTheme.colors.primary.main};
  padding: ${medicalTheme.spacing.md}px;
  padding-top: ${medicalTheme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props: { variant: string }) =>
    props.variant === "clean"
      ? medicalTheme.colors.border.light
      : medicalTheme.colors.primary.dark};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

const MainContent = styled.View`
  flex-direction: column;
`;

const LogoSection = styled.View`
  align-items: center;
  margin-bottom: ${medicalTheme.spacing.md}px;
`;

const UserSection = styled.View`
  flex-direction: column;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${medicalTheme.spacing.sm}px;
`;

const TextContainer = styled.View`
  flex: 1;
`;

const WelcomeText = styled.Text<{ variant: string }>`
  font-size: ${medicalTheme.typography.body2.fontSize}px;
  color: ${(props: { variant: string }) =>
    props.variant === "clean"
      ? medicalTheme.colors.text.secondary
      : medicalTheme.colors.text.inverse};
  opacity: 0.8;
  margin-bottom: 2px;
`;

const UserName = styled.Text<{ variant: string }>`
  font-size: ${medicalTheme.typography.h6.fontSize}px;
  font-weight: 600;
  color: ${(props: { variant: string }) =>
    props.variant === "clean"
      ? medicalTheme.colors.text.primary
      : medicalTheme.colors.text.inverse};
`;

const RoleBadge = styled.View<{ role: string; variant: string }>`
  background-color: ${(props: { role: string; variant: string }) => {
    if (props.variant === "clean") {
      switch (props.role) {
        case "admin":
          return medicalTheme.colors.primary.main + "15";
        case "doctor":
          return medicalTheme.colors.secondary.main + "15";
        default:
          return medicalTheme.colors.accent.teal + "15";
      }
    } else {
      return medicalTheme.colors.primary.dark + "30";
    }
  }};
  padding: ${medicalTheme.spacing.xs}px ${medicalTheme.spacing.sm}px;
  border-radius: ${medicalTheme.radius.round}px;
  align-self: flex-start;
  border-width: 1px;
  border-color: ${(props: { role: string; variant: string }) => {
    if (props.variant === "clean") {
      switch (props.role) {
        case "admin":
          return medicalTheme.colors.primary.main + "30";
        case "doctor":
          return medicalTheme.colors.secondary.main + "30";
        default:
          return medicalTheme.colors.accent.teal + "30";
      }
    } else {
      return medicalTheme.colors.primary.light + "50";
    }
  }};
`;

const RoleText = styled.Text<{ variant: string }>`
  font-size: ${medicalTheme.typography.caption.fontSize}px;
  font-weight: 500;
  color: ${(props: { variant: string }) =>
    props.variant === "clean"
      ? medicalTheme.colors.text.primary
      : medicalTheme.colors.text.inverse};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export default Header;
