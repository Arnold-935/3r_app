import { useRouter } from 'expo-router';
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

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre de usuario');
      return false;
    }
    
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
      return false;
    }
    
    if (!formData.password) {
      Alert.alert('Error', 'Por favor ingresa una contraseña');
      return false;
    }
    
    if (formData.password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return false;
    }
    
    if (!termsAccepted) {
      Alert.alert('Error', 'Debes aceptar los términos y condiciones');
      return false;
    }
    
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simular registro
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Registro exitoso',
        '¡Bienvenido a Plant App! Tu cuenta ha sido creada correctamente.',
        [
          {
            text: 'Continuar',
            onPress: () => router.push('/')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al crear tu cuenta. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    router.push('/login');
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
          <View style={styles.registerPanel}>
            
            {/* Form Fields */}
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                placeholderTextColor="#888"
                value={formData.username}
                onChangeText={(text) => handleInputChange('username', text)}
                autoCapitalize="none"
                autoCorrect={false}
              />
              
              <TextInput
                style={styles.input}
                placeholder="correo electronico"
                placeholderTextColor="#888"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              
              <TextInput
                style={styles.input}
                placeholder="contraseña"
                placeholderTextColor="#888"
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                secureTextEntry
                autoCapitalize="none"
              />
              
              <TextInput
                style={styles.input}
                placeholder="confirmar contraseña"
                placeholderTextColor="#888"
                value={formData.confirmPassword}
                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            {/* Terms and Conditions */}
            <TouchableOpacity 
              style={styles.termsContainer}
              onPress={() => setTermsAccepted(!termsAccepted)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
                {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <View style={styles.termsTextContainer}>
                <Text style={styles.termsText}>Términos y condiciones</Text>
                <Text style={styles.acceptText}>aceptar</Text>
              </View>
            </TouchableOpacity>

            {/* Register Button */}
            <TouchableOpacity 
              style={[styles.registerButton, isLoading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.registerButtonText}>
                {isLoading ? 'Registrando...' : 'registrarse'}
              </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity 
              style={styles.loginLink}
              onPress={handleLogin}
              activeOpacity={0.7}
            >
              <Text style={styles.loginLinkText}>Ya tengo una cuenta</Text>
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
  registerPanel: {
    backgroundColor: '#2d5016',
    borderRadius: 25,
    padding: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsTextContainer: {
    flex: 1,
  },
  termsText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  acceptText: {
    color: 'white',
    fontSize: 12,
    opacity: 0.8,
  },
  registerButton: {
    backgroundColor: '#c8d5b0',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: '#2d5016',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loginLinkText: {
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});