import { useResponsiveStyles } from '@/util/styles';
import { useState } from 'react';
import { Image } from 'expo-image';

import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { FormControl, FormControlError, FormControlErrorText, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertText, AlertIcon } from '@/components/ui/alert';
import ParallaxScrollView from '@/components/parallax-scroll-view';

export default function HomeScreen() {
  const styles = useResponsiveStyles();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');

  const [erros, setErros] = useState({ nome: '', email: '', senha: '' });

  const [carregando, setCarregando] = useState(false);
  const [exibeAlerta, setExibeAlerta] = useState(false);

  const router = require('expo-router').useRouter();

  function mascaraTelefone(valor: string): string {
    const numero = valor.replace(/\D/g, '');
    if (numero.length === 11) {
      return numero.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numero.length === 10) {
      return numero.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numero;
  }

  const validar = () => {
    const novoErro: any = {};

    if (!nome.trim()) novoErro.nome = 'Informe seu nome completo.';
    if (!email.trim()) {
      novoErro.email = 'Informe seu email.';
    } else {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(email)) novoErro.email = 'Formato de e-mail inválido.';
    }

    if (!senha.trim() || senha.length < 6)
      novoErro.senha = 'A senha deve ter no mínimo 6 caracteres.';

    setErros(novoErro);
    return Object.keys(novoErro).length === 0;
  };

  const aoContinuar = () => {
    if (!validar()) return;

    setCarregando(true);

    setTimeout(() => {
      setCarregando(false);
      setExibeAlerta(true);

      setTimeout(() => {
        setExibeAlerta(false);

        router.push({
          pathname: '/formulario',
          params: {
            nome,
            email,
            senha,
            telefone
          }
        });
      }, 1500);
    }, 1500);
  };

  return (
    <ParallaxScrollView
      headerHeight={120}
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/wallpaper.png')}
          style={{ width: '100%', height: 120, resizeMode: 'cover' }}
        />
      }
    >

      <FormControl isInvalid={!!erros.nome} style={styles.formControl}>
        <FormControlLabel>
          <FormControlLabelText>Nome Completo *</FormControlLabelText>
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

      <FormControl isInvalid={!!erros.email} style={styles.formControl}>
        <FormControlLabel>
          <FormControlLabelText>Email *</FormControlLabelText>
        </FormControlLabel>

        <Input>
          <InputField
            value={email}
            onChangeText={setEmail}
            placeholder="email12345@exemplo.com"
            keyboardType="email-address"
          />
        </Input>

        {erros.email && (
          <FormControlError>
            <FormControlErrorText>{erros.email}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl isInvalid={!!erros.senha} style={styles.formControl}>
        <FormControlLabel>
          <FormControlLabelText>Senha *</FormControlLabelText>
        </FormControlLabel>

        <Input>
          <InputField
            value={senha}
            onChangeText={setSenha}
            placeholder="Sua senha"
            secureTextEntry
          />
        </Input>

        {erros.senha && (
          <FormControlError>
            <FormControlErrorText>{erros.senha}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl style={styles.formControl}>
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

      <Button variant="solid" size="md" action="primary" onPress={aoContinuar} style={styles.button}>
        <ButtonText>Continuar</ButtonText>
      </Button>

      {carregando && <Spinner size="large" className="mt-4" />}

      {exibeAlerta && (
        <Alert action="success" variant="solid" className="mt-4">
          <AlertIcon />
          <AlertText>Registro validado com sucesso!</AlertText>
        </Alert>
      )}

    </ParallaxScrollView>
  );
}

