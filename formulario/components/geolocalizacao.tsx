import { useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import * as Location from "expo-location";

export default function Geolocalizacao({ onLocalizado }: any) {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const pegarLocalizacao = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            alert("Permissao negada!");
            return;
        }

        const pos = await Location.getCurrentPositionAsync({});
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);

        const endereco = await Location.reverseGeocodeAsync({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        });

        if (endereco && endereco.length > 0) {
            const info = endereco[0];

            onLocalizado({
                cep: info.postalCode || "",
                logradouro: info.street || "",
                bairro: info.district || "",
                cidade: info.city || "",
                estado: info.region || ""
            });
        }
    };

    return (
        <View className="mb-6 bg-white p-4 rounded-2xl">
            <TouchableHighlight onPress={pegarLocalizacao}>
                <Text>Localização em tempo real</Text>
            </TouchableHighlight>
        </View>

    );
}
