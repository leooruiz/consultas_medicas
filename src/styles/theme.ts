// Tema de Identidade Visual - MedConnect
// Paleta de cores profissional para área da saúde

export const medicalTheme = {
  // === IDENTIDADE VISUAL ===
  brand: {
    name: "MedConnect",
    tagline: "Conectando cuidados, transformando vidas",
  },

  // === PALETA DE CORES MÉDICAS ===
  colors: {
    // Cores Primárias - Azul médico confiável
    primary: {
      main: "#1E88E5", // Azul médico principal
      light: "#64B5F6", // Azul claro para hover/destaque
      dark: "#1565C0", // Azul escuro para texto/contraste
      50: "#E3F2FD",
      100: "#BBDEFB",
      200: "#90CAF9",
    },

    // Cores Secundárias - Verde saúde/vida
    secondary: {
      main: "#43A047", // Verde saúde
      light: "#81C784", // Verde claro
      dark: "#2E7D32", // Verde escuro
      50: "#E8F5E8",
      100: "#C8E6C9",
      200: "#A5D6A7",
    },

    // Cores de Apoio
    accent: {
      teal: "#00ACC1", // Turquesa médico
      mint: "#26A69A", // Verde menta
      sky: "#29B6F6", // Azul céu
    },

    // Estados e Feedback
    success: "#4CAF50", // Verde sucesso
    warning: "#FF9800", // Laranja atenção
    error: "#F44336", // Vermelho erro
    info: "#2196F3", // Azul informação

    // Cores Neutras - Base profissional
    neutral: {
      white: "#FFFFFF",
      lightest: "#FAFAFA",
      lighter: "#F5F5F5",
      light: "#E0E0E0",
      medium: "#BDBDBD",
      dark: "#757575",
      darker: "#424242",
      darkest: "#212121",
    },

    // Texto hierárquico
    text: {
      primary: "#212121", // Texto principal
      secondary: "#757575", // Texto secundário
      disabled: "#BDBDBD", // Texto desabilitado
      inverse: "#FFFFFF", // Texto em fundos escuros
    },

    // Fundos e superfícies
    background: {
      default: "#FAFAFA", // Fundo padrão
      paper: "#FFFFFF", // Cards e modais
      elevated: "#FFFFFF", // Elementos elevados
    },

    // Bordas e divisões
    border: {
      light: "#E0E0E0",
      medium: "#BDBDBD",
      dark: "#757575",
    },
  },

  // === TIPOGRAFIA MÉDICA PROFISSIONAL ===
  typography: {
    // Família de fontes
    fontFamily: {
      primary: "System", // Roboto no Android, SF Pro no iOS
      secondary: "sans-serif",
      monospace: "monospace",
    },

    // Hierarquia de títulos
    h1: {
      fontSize: 32,
      fontWeight: "700", // Bold
      lineHeight: 40,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 28,
      fontWeight: "600", // Semi-bold
      lineHeight: 36,
      letterSpacing: -0.25,
    },
    h3: {
      fontSize: 24,
      fontWeight: "600",
      lineHeight: 32,
      letterSpacing: 0,
    },
    h4: {
      fontSize: 20,
      fontWeight: "600",
      lineHeight: 28,
      letterSpacing: 0.15,
    },
    h5: {
      fontSize: 18,
      fontWeight: "500", // Medium
      lineHeight: 24,
      letterSpacing: 0.15,
    },
    h6: {
      fontSize: 16,
      fontWeight: "500",
      lineHeight: 22,
      letterSpacing: 0.15,
    },

    // Texto corpo
    body1: {
      fontSize: 16,
      fontWeight: "400", // Regular
      lineHeight: 24,
      letterSpacing: 0.5,
    },
    body2: {
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 20,
      letterSpacing: 0.25,
    },

    // Textos especiais
    subtitle1: {
      fontSize: 16,
      fontWeight: "500",
      lineHeight: 22,
      letterSpacing: 0.15,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: "500",
      lineHeight: 20,
      letterSpacing: 0.1,
    },
    caption: {
      fontSize: 12,
      fontWeight: "400",
      lineHeight: 16,
      letterSpacing: 0.4,
    },
    overline: {
      fontSize: 10,
      fontWeight: "500",
      lineHeight: 16,
      letterSpacing: 1.5,
      textTransform: "uppercase",
    },

    // Botões e labels
    button: {
      fontSize: 14,
      fontWeight: "500",
      lineHeight: 20,
      letterSpacing: 1.25,
      textTransform: "uppercase",
    },

    // Contextos médicos específicos
    patientName: {
      fontSize: 18,
      fontWeight: "600",
      lineHeight: 24,
      letterSpacing: 0.15,
    },
    doctorName: {
      fontSize: 16,
      fontWeight: "500",
      lineHeight: 22,
      letterSpacing: 0.15,
    },
    specialty: {
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 20,
      letterSpacing: 0.25,
    },
    medicalInfo: {
      fontSize: 14,
      fontWeight: "500",
      lineHeight: 20,
      letterSpacing: 0.1,
    },
  },

  // === ESPAÇAMENTOS CONSISTENTES ===
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,

    // Espaçamentos específicos
    cardPadding: 16,
    screenPadding: 20,
    sectionMargin: 24,
    buttonPadding: 12,
  },

  // === BORDAS E SOMBRAS ===
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 50,
  },

  shadows: {
    small: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },

  // === DIMENSÕES E MEDIDAS ===
  dimensions: {
    headerHeight: 60,
    tabBarHeight: 60,
    buttonHeight: 48,
    inputHeight: 56,
    avatarSize: {
      small: 32,
      medium: 48,
      large: 72,
      xlarge: 96,
    },
  },
};

// Export padrão para compatibilidade
export default medicalTheme;
