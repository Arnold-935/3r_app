

import { Link, useRouter } from 'expo-router';
import { GoogleAuthProvider } from 'firebase/auth';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Login() {
    const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [rememberUser, setRememberUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu usuario');
      return false;
    }
    
    if (!formData.password) {
      Alert.alert('Error', 'Por favor ingresa tu contraseña');
      return false;
    }
    
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simular login
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Inicio de sesión exitoso',
        '¡Bienvenido de vuelta!',
        [
          {
            text: 'Continuar',
            onPress: () => router.push('/')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const result = await promptAsync();
    if (result.type === 'success') {
      
      Alert.alert('Éxito', 'Iniciaste sesión con Google');
      
      const credential = GoogleAuthProvider.credential(result.authentication?.accessToken);
      //const auth = getAuth(firebaseApp);
      //await signInWithCredential(auth, credential);
      router.push('/');
    } else if (result.type === 'error') {
      Alert.alert('Error', 'No se pudo iniciar sesión con Google');
    } else if (result.type === 'cancel') {
      Alert.alert('Cancelado', 'Iniciar sesión con Google fue cancelado');
    } else {
      Alert.alert('Error desconocido', 'Ocurrió un error al iniciar sesión con Google');
    }
  };

  function handleForgotPassword() {
    Alert.alert(
      'Recuperar contraseña',
      'Se enviará un enlace de recuperación a tu correo electrónico'
    );
  }

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#c8d5b0" barStyle="dark-content" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.loginPanel}>
            
            {/* Logo Section */}
            <View style={styles.logoSection}>
              <Text style={styles.logoText}>3R</Text>
              <View style={styles.recycleIcon}>
                <Text style={styles.recycleSymbol}>♻️</Text>
              </View>
            </View>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="usuario"
                placeholderTextColor="#888"
                value={formData.username}
                onChangeText={(text) => handleInputChange('username', text)}
                autoCapitalize="none"
                autoCorrect={false}
              />
              
              {/* Remember User Checkbox */}
              <TouchableOpacity 
                style={styles.checkboxContainer}
                onPress={() => setRememberUser(!rememberUser)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, rememberUser && styles.checkboxChecked]}>
                  {rememberUser && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxText}>Recordar usuario</Text>
              </TouchableOpacity>
              
              {/* Password Field */}
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="contraseña"
                  placeholderTextColor="#888"
                  value={formData.password}
                  onChangeText={(text) => handleInputChange('password', text)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity 
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>

              {/* Forgot Password Link */}
              <Link href="/reset" asChild>
              <TouchableOpacity 
                style={styles.forgotPasswordLink}
                onPress={handleForgotPassword}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotPasswordText}>Recuperar contraseña</Text>
              </TouchableOpacity>
              </Link>

            </View>

            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Ingresando...' : 'ingresar'}
              </Text>
            </TouchableOpacity>

            {/* Google Login Button */}
            <TouchableOpacity 
              style={styles.googleButton}
              onPress={handleGoogleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.googleButtonText}>Iniciar con google</Text>
            </TouchableOpacity>

            {/* Register Link */}
            <TouchableOpacity 
              style={styles.registerLink}
              onPress={handleRegister}
              activeOpacity={0.7}
            >
              <Text style={styles.registerLinkText}>Registrarse</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c8d5b0',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  loginPanel: {
    backgroundColor: '#2d5016',
    borderRadius: 25,
    padding: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recycleIcon: {
    marginBottom: 10,
  },
  recycleSymbol: {
    fontSize: 40,
  },
  formContainer: {
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#d3d3d3',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'white',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
  },
  checkmark: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  checkboxText: {
    color: 'white',
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    borderRadius: 25,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  eyeButton: {
    paddingHorizontal: 15,
  },
  eyeIcon: {
    fontSize: 18,
  },
  forgotPasswordLink: {
    alignItems: 'flex-end',
    paddingHorizontal: 5,
  },
  forgotPasswordText: {
    color: 'white',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#c8d5b0',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#2d5016',
    fontSize: 18,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4285F4',
    marginRight: 10,
  },
  googleButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  registerLink: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  registerLinkText: {
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

type GoogleLoginResult = {
  type: 'success' | 'error' | 'cancel' | string;
  authentication?: {
    accessToken?: string;
    [key: string]: any;
  };
};

function promptAsync(): Promise<GoogleLoginResult> {
  
  return Promise.resolve({ type: 'success', authentication: { accessToken: 'fake-token' } });
}
