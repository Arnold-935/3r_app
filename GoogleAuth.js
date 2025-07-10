import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from './firebase';


WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'TU_EXPO_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'TU_IOS_CLIENT_ID.apps.googleusercontent.com',
    androidClientId: 'TU_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    webClientId: 'TU_WEB_CLIENT_ID.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      const credential = GoogleAuthProvider.credential(null, authentication.accessToken);

      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log('Usuario autenticado en Firebase:', userCredential.user);
        })
        .catch((error) => {
          console.error('Error en autenticación Firebase:', error);
        });
    }
  }, [response]);

  return { request, promptAsync };
}
