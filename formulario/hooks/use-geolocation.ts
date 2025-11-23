import { useState } from 'react';
import { Platform } from 'react-native';

export function useGeolocation() {
  const [localizacao, setLocalizacao] = useState<{ latitude: number | null; longitude: number | null }>({ latitude: null, longitude: null });
  const [endereco, setEndereco] = useState<any>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const getlocalizacao = async () => {
    setCarregando(true);
    setErro(null);
    if (Platform.OS === 'web') {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            setLocalizacao({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
            try {
              const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&addressdetails=1`;
              const resp = await fetch(url);
              const data = await resp.json();
              setEndereco(data.address || null);
            } catch (e) {
              setEndereco(null);
            }
            setCarregando(false);
          },
          (err) => {
            setErro(err.message);
            setCarregando(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        setErro('Geolocalização nao suportada no navegador');
        setCarregando(false);
      }
    } else {
      try {
        const Geolocation = require('@react-native-community/geolocation');
        Geolocation.getCurrentPosition(
          (pos: { coords: { latitude: number; longitude: number } }) => {
            setLocalizacao({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
            setCarregando(false);
          },
          (err: { message: string }) => {
            setErro(err.message);
            setCarregando(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } catch (e) {
        setErro('Erro ao acessar geolocalização no mobile.');
        setCarregando(false);
      }
    }
  };

  return { localizacao, endereco, erro, carregando, getlocalizacao };
}
