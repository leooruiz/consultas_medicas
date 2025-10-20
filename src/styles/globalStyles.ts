import { StyleSheet } from "react-native";
import medicalTheme from "./theme";

// === ESTILOS GLOBAIS MEDCONNECT ===
// Estilos reutilizáveis baseados na identidade visual médica

export const globalStyles = StyleSheet.create({
  // === CONTÊINERES BASE ===
  container: {
    flex: 1,
    backgroundColor: medicalTheme.colors.background.default,
  },

  screenContainer: {
    flex: 1,
    backgroundColor: medicalTheme.colors.background.default,
    padding: medicalTheme.spacing.screenPadding,
  },

  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: medicalTheme.colors.background.default,
    padding: medicalTheme.spacing.screenPadding,
  },

  // === CARDS MÉDICOS ===
  medicalCard: {
    backgroundColor: medicalTheme.colors.background.paper,
    borderRadius: medicalTheme.radius.md,
    padding: medicalTheme.spacing.cardPadding,
    marginVertical: medicalTheme.spacing.sm,
    ...medicalTheme.shadows.small,
  },

  elevatedCard: {
    backgroundColor: medicalTheme.colors.background.elevated,
    borderRadius: medicalTheme.radius.lg,
    padding: medicalTheme.spacing.lg,
    marginVertical: medicalTheme.spacing.md,
    ...medicalTheme.shadows.medium,
  },

  // === TEXTOS HIERÁRQUICOS ===
  screenTitle: {
    fontSize: medicalTheme.typography.h3.fontSize,
    fontWeight: "600" as const,
    lineHeight: medicalTheme.typography.h3.lineHeight,
    color: medicalTheme.colors.text.primary,
    textAlign: "center",
    marginBottom: medicalTheme.spacing.lg,
  },

  sectionTitle: {
    fontSize: medicalTheme.typography.h5.fontSize,
    fontWeight: "500" as const,
    lineHeight: medicalTheme.typography.h5.lineHeight,
    color: medicalTheme.colors.text.primary,
    marginTop: medicalTheme.spacing.md,
    marginBottom: medicalTheme.spacing.sm,
  },

  // === TEXTOS MÉDICOS ESPECÍFICOS ===
  patientName: {
    fontSize: medicalTheme.typography.patientName.fontSize,
    fontWeight: "600" as const,
    lineHeight: medicalTheme.typography.patientName.lineHeight,
    color: medicalTheme.colors.text.primary,
  },

  doctorName: {
    fontSize: medicalTheme.typography.doctorName.fontSize,
    fontWeight: "500" as const,
    lineHeight: medicalTheme.typography.doctorName.lineHeight,
    color: medicalTheme.colors.primary.dark,
  },

  specialty: {
    fontSize: medicalTheme.typography.specialty.fontSize,
    fontWeight: "400" as const,
    lineHeight: medicalTheme.typography.specialty.lineHeight,
    color: medicalTheme.colors.secondary.main,
  },

  medicalInfo: {
    fontSize: medicalTheme.typography.medicalInfo.fontSize,
    fontWeight: "500" as const,
    lineHeight: medicalTheme.typography.medicalInfo.lineHeight,
    color: medicalTheme.colors.text.secondary,
  },

  // === BOTÕES MÉDICOS ===
  primaryButton: {
    backgroundColor: medicalTheme.colors.primary.main,
    borderRadius: medicalTheme.radius.md,
    paddingVertical: medicalTheme.spacing.buttonPadding,
    paddingHorizontal: medicalTheme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: medicalTheme.spacing.sm,
    ...medicalTheme.shadows.small,
  },

  secondaryButton: {
    backgroundColor: medicalTheme.colors.secondary.main,
    borderRadius: medicalTheme.radius.md,
    paddingVertical: medicalTheme.spacing.buttonPadding,
    paddingHorizontal: medicalTheme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: medicalTheme.spacing.sm,
  },

  outlinedButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: medicalTheme.colors.primary.main,
    borderRadius: medicalTheme.radius.md,
    paddingVertical: medicalTheme.spacing.buttonPadding,
    paddingHorizontal: medicalTheme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: medicalTheme.spacing.sm,
  },

  // === TEXTOS DE BOTÃO ===
  primaryButtonText: {
    color: medicalTheme.colors.text.inverse,
    fontSize: medicalTheme.typography.button.fontSize,
    fontWeight: "500" as const,
    letterSpacing: medicalTheme.typography.button.letterSpacing,
  },

  secondaryButtonText: {
    color: medicalTheme.colors.text.inverse,
    fontSize: medicalTheme.typography.button.fontSize,
    fontWeight: "500" as const,
    letterSpacing: medicalTheme.typography.button.letterSpacing,
  },

  outlinedButtonText: {
    color: medicalTheme.colors.primary.main,
    fontSize: medicalTheme.typography.button.fontSize,
    fontWeight: "500" as const,
    letterSpacing: medicalTheme.typography.button.letterSpacing,
  },

  // === INPUTS E FORMULÁRIOS ===
  inputContainer: {
    marginBottom: medicalTheme.spacing.md,
  },

  input: {
    backgroundColor: medicalTheme.colors.background.paper,
    borderWidth: 1,
    borderColor: medicalTheme.colors.border.light,
    borderRadius: medicalTheme.radius.sm,
    paddingHorizontal: medicalTheme.spacing.md,
    paddingVertical: medicalTheme.spacing.sm,
    fontSize: medicalTheme.typography.body1.fontSize,
    color: medicalTheme.colors.text.primary,
    height: medicalTheme.dimensions.inputHeight,
  },

  inputFocused: {
    borderColor: medicalTheme.colors.primary.main,
    borderWidth: 2,
  },

  // === ESTADOS DE FEEDBACK ===
  successText: {
    color: medicalTheme.colors.success,
    fontSize: medicalTheme.typography.body2.fontSize,
    fontWeight: "500" as const,
    textAlign: "center",
    marginVertical: medicalTheme.spacing.sm,
  },

  errorText: {
    color: medicalTheme.colors.error,
    fontSize: medicalTheme.typography.body2.fontSize,
    fontWeight: "500" as const,
    textAlign: "center",
    marginVertical: medicalTheme.spacing.sm,
  },

  warningText: {
    color: medicalTheme.colors.warning,
    fontSize: medicalTheme.typography.body2.fontSize,
    fontWeight: "500" as const,
    textAlign: "center",
    marginVertical: medicalTheme.spacing.sm,
  },

  // === BADGES E INDICADORES ===
  statusBadge: {
    paddingHorizontal: medicalTheme.spacing.sm,
    paddingVertical: medicalTheme.spacing.xs,
    borderRadius: medicalTheme.radius.round,
    alignSelf: "flex-start",
  },

  adminBadge: {
    backgroundColor: "#BBDEFB", // medicalTheme.colors.primary[200]
  },

  doctorBadge: {
    backgroundColor: "#A5D6A7", // medicalTheme.colors.secondary[200]
  },

  patientBadge: {
    backgroundColor: "#29B6F620", // medicalTheme.colors.accent.sky + opacity
  },

  // === SEPARADORES E DIVISORES ===
  divider: {
    height: 1,
    backgroundColor: medicalTheme.colors.border.light,
    marginVertical: medicalTheme.spacing.md,
  },

  sectionSeparator: {
    height: medicalTheme.spacing.lg,
  },

  // === AVATAR E IMAGENS ===
  avatarContainer: {
    alignItems: "center",
    marginBottom: medicalTheme.spacing.md,
  },

  avatar: {
    width: medicalTheme.dimensions.avatarSize.large,
    height: medicalTheme.dimensions.avatarSize.large,
    borderRadius: medicalTheme.dimensions.avatarSize.large / 2,
    borderWidth: 2,
    borderColor: medicalTheme.colors.primary.light,
  },

  // === LAYOUT ESPECÍFICOS ===
  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  centered: {
    alignItems: "center",
    justifyContent: "center",
  },

  // === SCROLL E LISTAS ===
  scrollContainer: {
    paddingVertical: medicalTheme.spacing.md,
  },

  listContainer: {
    paddingHorizontal: medicalTheme.spacing.screenPadding,
  },

  // === MODAIS E OVERLAYS ===
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: medicalTheme.colors.background.paper,
    borderRadius: medicalTheme.radius.lg,
    padding: medicalTheme.spacing.lg,
    width: "90%",
    maxWidth: 400,
    ...medicalTheme.shadows.large,
  },
});

// === ESTILOS CONDICIONAIS ===
export const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return medicalTheme.colors.success;
    case "pending":
      return medicalTheme.colors.warning;
    case "cancelled":
      return medicalTheme.colors.error;
    default:
      return medicalTheme.colors.text.secondary;
  }
};

export const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return medicalTheme.colors.primary.main;
    case "doctor":
      return medicalTheme.colors.secondary.main;
    case "patient":
      return medicalTheme.colors.accent.teal;
    default:
      return medicalTheme.colors.text.secondary;
  }
};

// Export do tema para compatibilidade
export { medicalTheme };
