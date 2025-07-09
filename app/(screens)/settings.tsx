import { Link, useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface SettingsOption {
  id: string;
  title: string;
  onPress: () => void;
  isDestructive?: boolean;
}

export default function Settings() {
  const router = useRouter();
  const handleOptionPress = (optionTitle: string) => {
    switch (optionTitle) {
      case 'Información de la cuenta':
        Alert.alert('Información de la cuenta', 'Funcionalidad en desarrollo');
        break;
      case 'Perfil':
        router.push('/profile');
        break;
      case 'Notificaciones':
        Alert.alert('Notificaciones', 'Configurar notificaciones');
        break;
      case 'Idioma':
        Alert.alert('Idioma', 'Seleccionar idioma');
        break;
      case 'Accesibilidad':
        Alert.alert('Accesibilidad', 'Opciones de accesibilidad');
        break;
      case 'Cuenta':
        Alert.alert('Cuenta', 'Configuración de cuenta');
        break;
      case 'Ayuda y soporte':
        Alert.alert('Ayuda y soporte', 'Centro de ayuda');
        break;
      case 'Privacidad y seguridad':
        Alert.alert('Privacidad y seguridad', 'Configuración de privacidad');
        break;
      case 'Términos y condiciones':
        Alert.alert('Términos y condiciones', 'Ver términos y condiciones');
        break;
      case 'Salir':
        Alert.alert(
          'Cerrar sesión',
          '¿Estás seguro de que quieres cerrar sesión?',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Salir',
              style: 'destructive',
              onPress: () => {
                // Aquí podés limpiar estado, tokens, etc.
                console.log('Cerrando sesión...');
                router.replace('/login'); // 👈 Redirección segura
              },
            },
          ]
        );
      break;
      default:
        Alert.alert('Opción', `Has seleccionado: ${optionTitle}`);
    }
  };

  const settingsOptions: SettingsOption[] = [
    {
      id: '1',
      title: 'Información de la cuenta',
      onPress: () => handleOptionPress('Información de la cuenta'),
    },
    {
      id: '2',
      title: 'Perfil',
      onPress: () => handleOptionPress('Perfil'),
    },
    {
      id: '3',
      title: 'Notificaciones',
      onPress: () => handleOptionPress('Notificaciones'),
    },
    {
      id: '4',
      title: 'Idioma',
      onPress: () => handleOptionPress('Idioma'),
    },
    {
      id: '5',
      title: 'Accesibilidad',
      onPress: () => handleOptionPress('Accesibilidad'),
    },
    {
      id: '6',
      title: 'Cuenta',
      onPress: () => handleOptionPress('Cuenta'),
    },
    {
      id: '7',
      title: 'Ayuda y soporte',
      onPress: () => handleOptionPress('Ayuda y soporte'),
    },
    {
      id: '8',
      title: 'Privacidad y seguridad',
      onPress: () => handleOptionPress('Privacidad y seguridad'),
    },
    {
      id: '9',
      title: 'Términos y condiciones',
      onPress: () => handleOptionPress('Términos y condiciones'),
    },
    {
      id: '10',
      title: 'Salir',
      onPress: () => handleOptionPress('Salir'),
      isDestructive: true,
    },
  ];

  const renderSettingsOption = (option: SettingsOption, index: number) => (
    <View key={option.id}>
      <TouchableOpacity
        style={[
          styles.settingsOption,
          option.isDestructive && styles.destructiveOption,
        ]}
        onPress={option.onPress}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.optionText,
          option.isDestructive && styles.destructiveText,
        ]}>
          {option.title}
        </Text>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
      {index < settingsOptions.length - 1 && <View style={styles.separator} />}
    </View>
  );

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
        <View style={styles.headerCenter}>
          {/* Espacio vacío para centrar */}
        </View>
        <Link href="/help" asChild> 
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerIcon}>❓</Text>
        </TouchableOpacity>
        </Link>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} contentContainerStyle={styles.contentContainer}>
        <View style={styles.settingsPanel}>
          <Text style={styles.settingsTitle}>Configuración</Text>
          <View style={styles.optionsContainer}>
            {settingsOptions.map((option, index) => 
              renderSettingsOption(option, index)
            )}
          </View>
        </View>
      </ScrollView>
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
  headerCenter: {
    flex: 1,
  },
  headerButton: {
    padding: 5,
  },
  headerIcon: {
    fontSize: 20,
    color: 'white',
  },
  mainContent: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  settingsPanel: {
    backgroundColor: '#2d5016',
    borderRadius: 20,
    padding: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  settingsTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  optionsContainer: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
  },
  settingsOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  destructiveOption: {
    // Mantener el mismo estilo para consistencia
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  destructiveText: {
    color: 'white', // Mantener blanco para consistencia con el diseño
  },
  chevron: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 20,
  },
});