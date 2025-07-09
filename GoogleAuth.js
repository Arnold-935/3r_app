// GoogleAuth.js
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'TU_ID_EXPO_GOOGLE_CLIENT',
    iosClientId: 'TU_ID_IOS',
    androidClientId: 'TU_ID_ANDROID',
    webClientId: 'TU_CLIENT_ID_FIREBASE',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // Aquí conectas con Firebase si quieres usar el token
    }
  }, [response]);

  return { request, promptAsync };
}
