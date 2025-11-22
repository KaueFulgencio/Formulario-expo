import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { useState } from 'react';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Button, ButtonText } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertIcon, AlertText } from '@/components/ui/alert';
import { Input, InputField } from '@/components/ui/input';
import { FormControl, FormControlError, FormControlErrorText, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';


export default function HomeScreen() {
  const [carregando, setCarregando] = useState(false);
  const [exibeAlerta, setExibeAlerta] = useState(false);

  const [erros, setErros] = useState({ nome: '', email: '', senha: '' });

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');

  const registrar = () => {
    setCarregando(true);
    setExibeAlerta(false);

    setTimeout(() => {
      setCarregando(false);
      setExibeAlerta(true);
    }, 5000);
  }

  function mascaraTelefone(valor: string): string {
    const numero = valor.replace(/\D/g, '');
    if (numero.length === 11) {
      return numero.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); // Celular
    } else if (numero.length === 10) {
      return numero.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3'); // Fixo
    } else {
      return numero;
    }
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

      <FormControl isInvalid={!!erros.nome} className="mb-4">
        <FormControlLabel>
          <FormControlLabelText>Nome Completo</FormControlLabelText>
        </FormControlLabel>

        <Input>
          <InputField value={nome} onChangeText={setNome} placeholder="Seu nome" />
        </Input>

        {erros.nome && (
          <FormControlError>
            <FormControlErrorText>{erros.nome}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl isInvalid={!!erros.email} className="mb-4">
        <FormControlLabel>
          <FormControlLabelText>Email</FormControlLabelText>
        </FormControlLabel>

        <Input>
          <InputField value={email} onChangeText={setEmail} placeholder='email12345@exemplo.com' keyboardType="email-address" />
        </Input>

        {erros.email && (
          <FormControlError>
            <FormControlErrorText>{erros.email}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl isInvalid={!!erros.senha} className="mb-4">
        <FormControlLabel>
          <FormControlLabelText>Senha</FormControlLabelText>
        </FormControlLabel>

        <Input>
          <InputField value={senha} onChangeText={setSenha} placeholder="Sua senha" secureTextEntry />
        </Input>

        {erros.senha && (
          <FormControlError>
            <FormControlErrorText>{erros.senha}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl className="mb-4">
        <FormControlLabel>
          <FormControlLabelText>Telefone (opcional)</FormControlLabelText>
        </FormControlLabel>

        <Input>
          <InputField
            value={telefone}
            onChangeText={(v) => setTelefone(mascaraTelefone(v))}
            placeholder="telefone ou celular"
            keyboardType="phone-pad"
          />
        </Input>
      </FormControl>

      <Button variant="solid" size="md" action="primary" onPress={registrar}>
        <ButtonText>Registre-se</ButtonText>
      </Button>

      {carregando && (<Spinner size="large" color="grey" />)}

      {exibeAlerta && (<Alert action="muted" variant="outline">
        <AlertIcon />
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
