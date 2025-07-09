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

export default function PasswordReset() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // Al menos 8 caracteres, una mayúscula, una minúscula y un número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
      return false;
    }
    
    if (!validateEmail(formData.email)) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
      return false;
    }
    
    if (!formData.newPassword) {
      Alert.alert('Error', 'Por favor ingresa una nueva contraseña');
      return false;
    }
    
    if (!validatePassword(formData.newPassword)) {
      Alert.alert(
        'Contraseña débil', 
        'La contraseña debe tener al menos 8 caracteres, incluyendo:\n• Una letra mayúscula\n• Una letra minúscula\n• Un número'
      );
      return false;
    }
    
    if (!formData.confirmPassword) {
      Alert.alert('Error', 'Por favor confirma tu nueva contraseña');
      return false;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return false;
    }
    
    return true;
  };

  const handlePasswordReset = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simular proceso de cambio de contraseña
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      Alert.alert(
        'Contraseña actualizada',
        'Tu contraseña ha sido cambiada exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.',
        [
          {
            text: 'Ir a Login',
            onPress: () => router.push('/login')
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        'Error', 
        'No se pudo cambiar la contraseña. Verifica que el correo electrónico sea correcto e inténtalo de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: '', color: '#ccc' };
    if (password.length < 6) return { strength: 1, text: 'Muy débil', color: '#F44336' };
    if (password.length < 8) return { strength: 2, text: 'Débil', color: '#FF9800' };
    if (!validatePassword(password)) return { strength: 3, text: 'Media', color: '#FFC107' };
    return { strength: 4, text: 'Fuerte', color: '#4CAF50' };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2d5016" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recuperar Contraseña</Text>
        <View style={styles.headerRight} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.resetPanel}>
            
            {/* Instructions */}
            <Text style={styles.instructionsText}>
              Ingresa tu correo electrónico y define una nueva contraseña segura
            </Text>

            {/* Form Fields */}
            <View style={styles.formContainer}>
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
              
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="nueva contraseña"
                  placeholderTextColor="#888"
                  value={formData.newPassword}
                  onChangeText={(text) => handleInputChange('newPassword', text)}
                  secureTextEntry={!showPasswords.newPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity 
                  style={styles.eyeButton}
                  onPress={() => setShowPasswords(prev => ({
                    ...prev,
                    newPassword: !prev.newPassword
                  }))}
                >
                  <Text style={styles.eyeIcon}>
                    {showPasswords.newPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Password Strength Indicator */}
              {formData.newPassword.length > 0 && (
                <View style={styles.strengthContainer}>
                  <View style={styles.strengthBar}>
                    <View 
                      style={[
                        styles.strengthFill, 
                        { 
                          width: `${(passwordStrength.strength / 4) * 100}%`,
                          backgroundColor: passwordStrength.color 
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.strengthText, { color: passwordStrength.color }]}>
                    {passwordStrength.text}
                  </Text>
                </View>
              )}
              
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="confirmar contraseña"
                  placeholderTextColor="#888"
                  value={formData.confirmPassword}
                  onChangeText={(text) => handleInputChange('confirmPassword', text)}
                  secureTextEntry={!showPasswords.confirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity 
                  style={styles.eyeButton}
                  onPress={() => setShowPasswords(prev => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword
                  }))}
                >
                  <Text style={styles.eyeIcon}>
                    {showPasswords.confirmPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Password Match Indicator */}
              {formData.confirmPassword.length > 0 && (
                <View style={styles.matchContainer}>
                  <Text style={[
                    styles.matchText,
                    { color: formData.newPassword === formData.confirmPassword ? '#4CAF50' : '#F44336' }
                  ]}>
                    {formData.newPassword === formData.confirmPassword ? 
                      '✓ Las contraseñas coinciden' : 
                      '✗ Las contraseñas no coinciden'
                    }
                  </Text>
                </View>
              )}
            </View>

            {/* Accept Button */}
            <TouchableOpacity 
              style={[styles.acceptButton, isLoading && styles.buttonDisabled]}
              onPress={handlePasswordReset}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.acceptButtonText}>
                {isLoading ? 'Procesando...' : 'aceptar'}
              </Text>
            </TouchableOpacity>

            {/* Security Tips */}
            <View style={styles.tipsContainer}>
              <Text style={styles.tipsTitle}>Consejos de seguridad:</Text>
              <Text style={styles.tipText}>• Usa al menos 8 caracteres</Text>
              <Text style={styles.tipText}>• Incluye mayúsculas y minúsculas</Text>
              <Text style={styles.tipText}>• Añade números o símbolos</Text>
              <Text style={styles.tipText}>• No uses información personal</Text>
            </View>

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
  header: {
    backgroundColor: '#2d5016',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 34,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  resetPanel: {
    backgroundColor: '#2d5016',
    borderRadius: 25,
    padding: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  instructionsText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
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
  strengthContainer: {
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  strengthBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 5,
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '500',
  },
  matchContainer: {
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  matchText: {
    fontSize: 12,
    fontWeight: '500',
  },
  acceptButton: {
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
  acceptButtonText: {
    color: '#2d5016',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tipsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
  },
  tipsTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tipText: {
    color: 'white',
    fontSize: 12,
    marginBottom: 3,
    opacity: 0.9,
  },
});