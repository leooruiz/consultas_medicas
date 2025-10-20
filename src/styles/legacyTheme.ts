// Tema de compatibilidade para telas não refatoradas
// Este tema mantém a estrutura antiga para não quebrar as telas existentes

export const legacyTheme = {
  colors: {
    primary: "#1E88E5", // Extraído do novo tema
    secondary: "#43A047",
    background: "#FAFAFA",
    text: "#212121",
    error: "#F44336",
    success: "#4CAF50",
    white: "#FFFFFF",
    border: "#E0E0E0",
    warning: "#FF9800",
  },
  typography: {
    title: {
      fontSize: 24,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 18,
      fontWeight: "500",
    },
    body: {
      fontSize: 16,
    },
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "700",
  },
  specialty: {
    fontSize: 14,
    fontWeight: "500",
  },
};

export default legacyTheme;
