import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import medicalTheme from "../styles/theme";
import Logo from "./Logo";

interface BrandedHeaderProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  logoSize?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "clean";
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
}

const BrandedHeader: React.FC<BrandedHeaderProps> = ({
  title,
  subtitle,
  showLogo = true,
  logoSize = "small",
  variant = "primary",
  rightComponent,
  leftComponent,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: medicalTheme.colors.secondary.main,
          textColor: medicalTheme.colors.text.inverse,
          logoColor: "white" as const,
        };
      case "clean":
        return {
          backgroundColor: medicalTheme.colors.background.paper,
          textColor: medicalTheme.colors.text.primary,
          logoColor: "primary" as const,
        };
      default: // primary
        return {
          backgroundColor: medicalTheme.colors.primary.main,
          textColor: medicalTheme.colors.text.inverse,
          logoColor: "white" as const,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <>
      <StatusBar
        backgroundColor={variantStyles.backgroundColor}
        barStyle={variant === "clean" ? "dark-content" : "light-content"}
      />
      <SafeAreaView
        style={[
          styles.safeArea,
          { backgroundColor: variantStyles.backgroundColor },
        ]}
        edges={["top"]}
      >
        <View
          style={[
            styles.container,
            { backgroundColor: variantStyles.backgroundColor },
          ]}
        >
          {/* Linha superior com logo/componentes */}
          <View style={styles.topRow}>
            <View style={styles.leftSection}>
              {leftComponent}
              {showLogo && (
                <Logo
                  size={logoSize}
                  variant="horizontal"
                  color={variantStyles.logoColor}
                />
              )}
            </View>

            {rightComponent && (
              <View style={styles.rightSection}>{rightComponent}</View>
            )}
          </View>

          {/* Título e subtítulo */}
          {(title || subtitle) && (
            <View style={styles.titleSection}>
              {title && (
                <Text
                  style={[styles.title, { color: variantStyles.textColor }]}
                >
                  {title}
                </Text>
              )}

              {subtitle && (
                <Text
                  style={[styles.subtitle, { color: variantStyles.textColor }]}
                >
                  {subtitle}
                </Text>
              )}
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  container: {
    paddingHorizontal: medicalTheme.spacing.md,
    paddingVertical: medicalTheme.spacing.sm,
    minHeight: medicalTheme.dimensions.headerHeight,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  titleSection: {
    marginTop: medicalTheme.spacing.sm,
    alignItems: "center",
  },

  title: {
    fontSize: medicalTheme.typography.h4.fontSize,
    fontWeight: "600",
    lineHeight: medicalTheme.typography.h4.lineHeight,
    textAlign: "center",
  },

  subtitle: {
    fontSize: medicalTheme.typography.body2.fontSize,
    fontWeight: "400",
    lineHeight: medicalTheme.typography.body2.lineHeight,
    textAlign: "center",
    marginTop: 4,
    opacity: 0.9,
  },
});

export default BrandedHeader;
