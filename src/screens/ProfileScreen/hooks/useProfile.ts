import { useAuth } from "../../../contexts/AuthContext";
import { ProfileService } from "../services/profileService";

export const useProfile = () => {
  const { user, signOut } = useAuth();

  const getRoleText = (role: string) => {
    return ProfileService.getRoleText(role as any);
  };

  const getAvatarUrl = () => {
    return user?.image || ProfileService.getDefaultAvatarUrl();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return {
    user,
    getRoleText,
    getAvatarUrl,
    handleSignOut,
  };
};
