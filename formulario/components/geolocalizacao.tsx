import React from "react";
import { ActivityIndicator, Text, TouchableHighlight, View } from "react-native";
import { useGeolocation } from '@/hooks/use-geolocation';


export default function Geolocalizacao({ onLocalizado }: { onLocalizado?: (info: any) => void }) {
    const { localizacao, endereco, erro, carregando, getlocalizacao } = useGeolocation();

    React.useEffect(() => {
        if (localizacao.latitude && localizacao.longitude && typeof onLocalizado === 'function') {
            if (endereco) {
                onLocalizado({
                    cep: endereco.postcode || '',
                    logradouro: endereco.road || endereco.street || '',
                    bairro: endereco.suburb || endereco.neighbourhood || '',
                    cidade: endereco.city || endereco.town || endereco.village || '',
                    estado: endereco.state || endereco.region || '',
                });
            } else {
                onLocalizado({ latitude: localizacao.latitude, longitude: localizacao.longitude });
            }
        }
    }, [localizacao, endereco, onLocalizado]);

    return (
        <View className="mb-6 bg-white p-4 rounded-2xl">
            <TouchableHighlight onPress={getlocalizacao}>
                <Text>Localização em tempo real</Text>
            </TouchableHighlight>

            {carregando && (
                <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                    <ActivityIndicator size="small" color="#000" />
                    <Text style={{ marginLeft: 8 }}>Buscando sua localização</Text>
                </View>
            )}

            {erro && <Text style={{ color: 'red' }}>{erro}</Text>}
        </View>

    );
}
