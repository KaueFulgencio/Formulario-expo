import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';

import { Button, ButtonText } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertIcon, AlertText } from '@/components/ui/alert';

import { use, useState } from 'react';

export default function HomeScreen() {
  const [carregando, setCarregando] = useState(false);
  const [exibeAlerta, setExibeAlerta] = useState(false);

  const registrar = () => {
    setCarregando(true);
    setExibeAlerta(false);

    setTimeout(() => {
      setCarregando(false);
      setExibeAlerta(true);
    }, 5000);
  }


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <Button variant="solid" size="md" action="primary" onPress={registrar}>
        <ButtonText>Registre-se</ButtonText>
      </Button>

      {carregando && (<Spinner size="large" color="grey" />)}

      {exibeAlerta && (<Alert action="muted" variant="outline">
        <AlertIcon/>
        <AlertText>Registro efetuado com sucesso</AlertText>
      </Alert>)}

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
