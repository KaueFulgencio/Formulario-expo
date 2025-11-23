import { ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { useResponsiveStyles } from '@/util/styles';

import { useRef, useState } from 'react';

import { Input, InputField } from '@/components/ui/input';
import { FormControl, FormControlError, FormControlErrorText, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import Geolocalizacao from '@/components/geolocalizacao';

import { Button, ButtonText } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";


export default function FormularioScreen() {
    const styles = useResponsiveStyles();
    const apiCEP = 'https://viacep.com.br/ws/{CEP}/json/';

    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');

    const [erros, setErros] = useState({ cep: '', numero: '' });

    const [carregando, setCarregando] = useState(false);
    const [exibeAlerta, setExibeAlerta] = useState(false);

    const router = require('expo-router').useRouter();

    const scrollRef = useRef<ScrollView>(null);

    const aoDigitarCep = async (valor: string) => {
        const cepFormatado = mascaraCep(valor);
        setCep(cepFormatado);

        if (cepFormatado.length === 9) {
            const dadosCep = await buscarCep(cepFormatado);

            if (dadosCep) {
                setLogradouro(dadosCep.logradouro || '');
                setBairro(dadosCep.bairro || '');
                setCidade(dadosCep.localidade || '');
                setEstado(dadosCep.uf || '');
            }
        }
    }

    const mascaraCep = (v: string) => {
        return v
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 9);
    };

    const validar = () => {
        const novoErro: any = {};

        if (!cep.trim() || cep.length < 9) novoErro.cep = 'CEP inválido.';
        if (!numero.trim()) novoErro.numero = 'Informe o número.';

        setErros(novoErro);
        return Object.keys(novoErro).length === 0;
    };


    const buscarCep = async (cep: string) => {
        try {
            const regexNumeros = cep.replace(/\D/g, '');

            const respostaApi = await fetch(apiCEP.replace('{CEP}', regexNumeros));
            const dadosCep = await respostaApi.json();

            if (dadosCep.erro) { return null; }

            return dadosCep;

        } catch (error) {
            return null;
        }
    }

    const registrar = () => {
        if (!validar()) return;
        setCarregando(true);
        setExibeAlerta(false);
        setTimeout(() => {
            setCarregando(false);
            setExibeAlerta(true);
            setCep('');
            setLogradouro('');
            setNumero('');
            setComplemento('');
            setBairro('');
            setCidade('');
            setEstado('');
            if (scrollRef.current) {
                scrollRef.current.scrollToEnd({ animated: true });
            }

        }, 3000);
    };

    return (
        <ScrollView ref={scrollRef}>
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
                <Geolocalizacao
                    onLocalizado={(info: any) => {
                        if (info.cep) setCep(mascaraCep(info.cep));
                        if (info.logradouro) setLogradouro(info.logradouro);
                        if (info.bairro) setBairro(info.bairro);
                        if (info.cidade) setCidade(info.cidade);
                        if (info.estado) setEstado(info.estado.toUpperCase());
                    }}
                />

                <FormControl isInvalid={!!erros.cep} style={styles.formControl}>
                    <FormControlLabel>
                        <FormControlLabelText>CEP</FormControlLabelText>
                    </FormControlLabel>

                    <Input>
                        <InputField value={cep} onChangeText={aoDigitarCep} placeholder="00000-000" keyboardType="numeric" />
                    </Input>

                    {erros.cep && (
                        <FormControlError>
                            <FormControlErrorText>{erros.cep}</FormControlErrorText>
                        </FormControlError>
                    )}
                </FormControl>

                <FormControl style={styles.formControl}>
                    <FormControlLabel>
                        <FormControlLabelText>Logradouro/Rua</FormControlLabelText>
                    </FormControlLabel>

                    <Input>
                        <InputField value={logradouro} onChangeText={setLogradouro} placeholder="Nome da rua" />
                    </Input>
                </FormControl>

                <FormControl isInvalid={!!erros.numero} style={styles.formControl}>
                    <FormControlLabel>
                        <FormControlLabelText>Número</FormControlLabelText>
                    </FormControlLabel>

                    <Input>
                        <InputField value={numero} onChangeText={setNumero} placeholder="Número" keyboardType="numeric" />
                    </Input>

                    {erros.numero && (
                        <FormControlError>
                            <FormControlErrorText>{erros.numero}</FormControlErrorText>
                        </FormControlError>
                    )}
                </FormControl>

                <FormControl style={styles.formControl}>
                    <FormControlLabel>
                        <FormControlLabelText>Complemento (opcional)</FormControlLabelText>
                    </FormControlLabel>

                    <Input>
                        <InputField value={complemento} onChangeText={setComplemento} placeholder="Número apartamento, bloco..." />
                    </Input>
                </FormControl>

                <FormControl style={styles.formControl}>
                    <FormControlLabel>
                        <FormControlLabelText>Bairro</FormControlLabelText>
                    </FormControlLabel>

                    <Input>
                        <InputField value={bairro} onChangeText={setBairro} placeholder="Bairro" />
                    </Input>
                </FormControl>

                <FormControl style={styles.formControl}>
                    <FormControlLabel>
                        <FormControlLabelText>Cidade</FormControlLabelText>
                    </FormControlLabel>

                    <Input>
                        <InputField value={cidade} onChangeText={setCidade} placeholder="Cidade" />
                    </Input>
                </FormControl>

                <FormControl style={styles.formControl}>
                    <FormControlLabel>
                        <FormControlLabelText>Estado/UF</FormControlLabelText>
                    </FormControlLabel>

                    <Input>
                        <InputField value={estado} onChangeText={(v) => setEstado(v.toUpperCase())} placeholder="SP, RJ, MG..." maxLength={2} autoCapitalize="characters" />
                    </Input>
                </FormControl>

                <View style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
                    <Button variant="solid" size="md" action="primary" onPress={registrar} isDisabled={carregando} style={styles.button}>
                        <ButtonText>{carregando ? 'Processando' : 'Registrar'}</ButtonText>
                    </Button>

                    {exibeAlerta && (
                        <Button variant="outline" size="md" onPress={() => router.push('/')} style={styles.button}>
                            <ButtonText>Voltar para o início</ButtonText>
                        </Button>
                    )}
                </View>

                {carregando && <Spinner size="large" className="mt-4" />}

                {exibeAlerta && (
                    <Alert action="success" variant="solid" className="mt-4">
                        <AlertIcon />
                        <AlertText>Registro efetuado com sucesso</AlertText>
                    </Alert>
                )}



            </ParallaxScrollView>
        </ScrollView>
    );
}