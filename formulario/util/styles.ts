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

      ...(isDesktop && {
        maxHeight: 600,
        justifyContent: 'center'
      })
    },
    formControl: {
      marginBottom: isMobile ? 16 : 20,
    },
    button: {
      width: isMobile ? '48%' : '48%',
      minWidth: 120,
      flexGrow: 1,
      flexShrink: 1,
    },
    buttonRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginTop: 20,
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'stretch',
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