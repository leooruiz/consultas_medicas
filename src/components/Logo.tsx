import React from "react";
import { StyleSheet, Text, View } from "react-native";
import medicalTheme from "../styles/theme";

interface LogoProps {
  size?: "small" | "medium" | "large";
  variant?: "horizontal" | "vertical" | "icon-only";
  color?: "primary" | "white" | "dark";
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  size = "medium",
  variant = "horizontal",
  color = "primary",
  showTagline = false,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          iconSize: 32,
          titleSize: 18,
          taglineSize: 12,
          spacing: 8,
        };
      case "large":
        return {
          iconSize: 64,
          titleSize: 32,
          taglineSize: 16,
          spacing: 16,
        };
      default: // medium
        return {
          iconSize: 48,
          titleSize: 24,
          taglineSize: 14,
          spacing: 12,
        };
    }
  };

  const getColorScheme = () => {
    switch (color) {
      case "white":
        return {
          iconColor: medicalTheme.colors.neutral.white,
          textColor: medicalTheme.colors.neutral.white,
          accentColor: medicalTheme.colors.secondary.light,
        };
      case "dark":
        return {
          iconColor: medicalTheme.colors.text.primary,
          textColor: medicalTheme.colors.text.primary,
          accentColor: medicalTheme.colors.primary.main,
        };
      default: // primary
        return {
          iconColor: medicalTheme.colors.primary.main,
          textColor: medicalTheme.colors.primary.dark,
          accentColor: medicalTheme.colors.secondary.main,
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const colorScheme = getColorScheme();

  // Ícone médico estilizado usando texto/símbolos
  const MedicalIcon = () => (
    <View
      style={[
        styles.iconContainer,
        {
          width: sizeStyles.iconSize,
          height: sizeStyles.iconSize,
          borderColor: colorScheme.iconColor,
        },
      ]}
    >
      {/* Cruz médica */}
      <View
        style={[
          styles.crossVertical,
          {
            backgroundColor: colorScheme.iconColor,
            width: sizeStyles.iconSize * 0.15,
            height: sizeStyles.iconSize * 0.6,
          },
        ]}
      />
      <View
        style={[
          styles.crossHorizontal,
          {
            backgroundColor: colorScheme.iconColor,
            width: sizeStyles.iconSize * 0.6,
            height: sizeStyles.iconSize * 0.15,
          },
        ]}
      />
      {/* Círculo de fundo */}
      <View
        style={[
          styles.circleBackground,
          {
            width: sizeStyles.iconSize * 0.8,
            height: sizeStyles.iconSize * 0.8,
            borderRadius: sizeStyles.iconSize * 0.4,
            borderColor: colorScheme.accentColor,
          },
        ]}
      />
    </View>
  );

  const renderContent = () => {
    if (variant === "icon-only") {
      return <MedicalIcon />;
    }

    const isVertical = variant === "vertical";

    return (
      <View
        style={[
          styles.container,
          isVertical ? styles.verticalLayout : styles.horizontalLayout,
        ]}
      >
        <MedicalIcon />

        <View
          style={[
            styles.textContainer,
            isVertical
              ? styles.verticalTextContainer
              : styles.horizontalTextContainer,
            { marginLeft: isVertical ? 0 : sizeStyles.spacing },
          ]}
        >
          <Text
            style={[
              styles.brandName,
              {
                fontSize: sizeStyles.titleSize,
                color: colorScheme.textColor,
                marginBottom: showTagline ? 4 : 0,
              },
            ]}
          >
            {medicalTheme.brand.name}
          </Text>

          {showTagline && (
            <Text
              style={[
                styles.tagline,
                {
                  fontSize: sizeStyles.taglineSize,
                  color: colorScheme.textColor,
                },
              ]}
            >
              {medicalTheme.brand.tagline}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return renderContent();
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  horizontalLayout: {
    flexDirection: "row",
  },

  verticalLayout: {
    flexDirection: "column",
  },

  iconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: "transparent",
  },

  crossVertical: {
    position: "absolute",
    borderRadius: 2,
  },

  crossHorizontal: {
    position: "absolute",
    borderRadius: 2,
  },

  circleBackground: {
    position: "absolute",
    borderWidth: 1,
    backgroundColor: "transparent",
  },

  textContainer: {
    alignItems: "center",
  },

  horizontalTextContainer: {
    alignItems: "flex-start",
  },

  verticalTextContainer: {
    alignItems: "center",
    marginTop: 8,
  },

  brandName: {
    fontWeight: "700",
    letterSpacing: -0.5,
  },

  tagline: {
    fontWeight: "400",
    letterSpacing: 0.5,
    opacity: 0.8,
    textAlign: "center",
  },
});

export default Logo;
