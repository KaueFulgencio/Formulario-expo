import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { useState } from 'react';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Input, InputField } from '@/components/ui/input';
import { FormControl, FormControlError, FormControlErrorText, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import Geolocalizacao from '@/components/geolocalizacao';

export default function FormularioScreen() {
    const apiCEP = 'https://viacep.com.br/ws/{CEP}/json/';

    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');

    const [erros, setErros] = useState({ cep: '', numero: '' });

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

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
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

            <FormControl isInvalid={!!erros.cep} className="mb-4">
                <FormControlLabel>
                    <FormControlLabelText>CEP</FormControlLabelText>
                </FormControlLabel>

                <Input>
                    <InputField value={cep} onChangeText={aoDigitarCep} placeholder="00000-000" keyboardType="numeric"/>
                </Input>

                {erros.cep && (
                    <FormControlError>
                        <FormControlErrorText>{erros.cep}</FormControlErrorText>
                    </FormControlError>
                )}
            </FormControl>

            <FormControl className="mb-4">
                <FormControlLabel>
                    <FormControlLabelText>Logradouro / Rua</FormControlLabelText>
                </FormControlLabel>

                <Input>
                    <InputField value={logradouro} onChangeText={setLogradouro} placeholder="Nome da rua"/>
                </Input>
            </FormControl>

            <FormControl isInvalid={!!erros.numero} className="mb-4">
                <FormControlLabel>
                    <FormControlLabelText>Número</FormControlLabelText>
                </FormControlLabel>

                <Input>
                    <InputField value={numero} onChangeText={setNumero} placeholder="Número" keyboardType="numeric"/>
                </Input>

                {erros.numero && (
                    <FormControlError>
                        <FormControlErrorText>{erros.numero}</FormControlErrorText>
                    </FormControlError>
                )}
            </FormControl>

            <FormControl className="mb-4">
                <FormControlLabel>
                    <FormControlLabelText>Complemento (opcional)</FormControlLabelText>
                </FormControlLabel>

                <Input>
                    <InputField value={complemento} onChangeText={setComplemento} placeholder="Número apartamento, bloco..."/>
                </Input>
            </FormControl>

            <FormControl className="mb-4">
                <FormControlLabel>
                    <FormControlLabelText>Bairro</FormControlLabelText>
                </FormControlLabel>

                <Input>
                    <InputField value={bairro} onChangeText={setBairro} placeholder="Bairro"/>
                </Input>
            </FormControl>

            <FormControl className="mb-4">
                <FormControlLabel>
                    <FormControlLabelText>Cidade</FormControlLabelText>
                </FormControlLabel>

                <Input>
                    <InputField value={cidade} onChangeText={setCidade} placeholder="Cidade"/>
                </Input>
            </FormControl>

            <FormControl className="mb-4">
                <FormControlLabel>
                    <FormControlLabelText>Estado / UF</FormControlLabelText>
                </FormControlLabel>

                <Input>
                    <InputField value={estado} onChangeText={(v) => setEstado(v.toUpperCase())} placeholder="SP, RJ, MG..." maxLength={2} autoCapitalize="characters"/>
                </Input>
            </FormControl>

        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
