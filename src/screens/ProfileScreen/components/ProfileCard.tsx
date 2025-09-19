import React from "react";
import styled from "styled-components/native";
import { UserProfile } from "../models";

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

interface ProfileCardProps {
  user: UserProfile;
  getRoleText: (role: string) => string;
  getAvatarUrl: () => string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  getRoleText,
  getAvatarUrl,
}) => {
  return (
    <Card>
      <Avatar source={{ uri: getAvatarUrl() }} />
      <Name>{user.name}</Name>
      <Email>{user.email}</Email>
      <RoleBadge role={user.role}>
        <RoleText>{getRoleText(user.role)}</RoleText>
      </RoleBadge>

      {user.role === "doctor" && user.specialty && (
        <SpecialtyText>Especialidade: {user.specialty}</SpecialtyText>
      )}
    </Card>
  );
};

const Card = styled.View`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  align-items: center;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 16px;
`;

const Name = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 8px;
`;

const Email = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text};
  margin-bottom: 8px;
`;

const RoleBadge = styled.View<{ role: string }>`
  background-color: ${(props: { role: string }) => {
    switch (props.role) {
      case "admin":
        return theme.colors.primary + "20";
      case "doctor":
        return theme.colors.success + "20";
      default:
        return theme.colors.secondary + "20";
    }
  }};
  padding: 4px 12px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const RoleText = styled.Text`
  color: ${theme.colors.text};
  font-size: 14px;
  font-weight: 500;
`;

const SpecialtyText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text};
  margin-top: 8px;
`;

export default ProfileCard;
