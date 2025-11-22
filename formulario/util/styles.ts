import { useScreenSize } from "@/hooks/use-screen-size";
import { StyleSheet } from "react-native";

export function useResponsiveStyles() {
  const { isMobile, isDesktop } = useScreenSize();

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: isMobile ? 16 : 24,
      paddingVertical: isMobile ? 16 : 24,
    },
    scrollView: {
      flex: 1,
    },
    formContainer: {
      maxWidth: isDesktop ? 500 : '100%',
      width: '100%',
      alignSelf: 'center',
    },
    formControl: {
      marginBottom: isMobile ? 16 : 20,
    },
    button: {
      marginTop: isMobile ? 8 : 16,
      width: isMobile ? '100%' : 'auto',
      alignSelf: isMobile ? 'stretch' : 'flex-start',
      minWidth: isMobile ? '100%' : 200,
    },
    inputField: {
      fontSize: isMobile ? 14 : 16,
      paddingVertical: isMobile ? 12 : 14,
    },
    labelText: {
      fontSize: isMobile ? 14 : 16,
      marginBottom: isMobile ? 6 : 8,
    },
    errorText: {
      fontSize: isMobile ? 12 : 14,
    }
  });
}