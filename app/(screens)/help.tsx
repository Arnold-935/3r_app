import { useRouter } from 'expo-router';
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

interface HelpOption {
  id: string;
  title: string;
  onPress: () => void;
}

export default function Help() {
  const router = useRouter();
  const handleOptionPress = (optionTitle: string) => {
    switch (optionTitle) {
      case 'Preguntas frecuentes':
        Alert.alert(
          'Preguntas frecuentes',
          '¿Cómo cuidar mis plantas?\n¿Con qué frecuencia debo regar?\n¿Qué tipo de luz necesitan?\n\nPróximamente más preguntas...'
        );
        break;
      case 'Guía de uso':
        Alert.alert(
          'Guía de uso',
          '1. Registra tus plantas\n2. Configura recordatorios\n3. Sigue el progreso\n4. Desbloquea logros\n\n¡Es así de fácil!'
        );
        break;
      case 'Tutoriales':
        Alert.alert(
          'Tutoriales',
          'Video tutoriales disponibles:\n\n• Cómo agregar una planta\n• Configurar recordatorios\n• Usar la cámara\n• Interpretar estadísticas'
        );
        break;
      case 'Soporte técnico':
        Alert.alert(
          'Soporte técnico',
          'Contacta con nuestro equipo:\n\n📧 soporte@plantapp.com\n📱 WhatsApp: +1234567890\n🕐 Horario: 9AM - 6PM'
        );
        break;
      default:
        Alert.alert('Ayuda', `Has seleccionado: ${optionTitle}`);
    }
  };

  const helpOptions: HelpOption[] = [
    {
      id: '1',
      title: 'Preguntas frecuentes',
      onPress: () => handleOptionPress('Preguntas frecuentes'),
    },
    {
      id: '2',
      title: 'Guía de uso',
      onPress: () => handleOptionPress('Guía de uso'),
    },
    {
      id: '3',
      title: 'Tutoriales',
      onPress: () => handleOptionPress('Tutoriales'),
    },
    {
      id: '4',
      title: 'Soporte técnico',
      onPress: () => handleOptionPress('Soporte técnico'),
    },
  ];

  const renderHelpOption = (option: HelpOption, index: number) => (
    <View key={option.id}>
      <TouchableOpacity
        style={styles.helpOption}
        onPress={option.onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.optionText}>
          {option.title}
        </Text>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
      {index < helpOptions.length - 1 && <View style={styles.separator} />}
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
        <View style={styles.headerRight}>
          {/* Espacio vacío para balance */}
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} contentContainerStyle={styles.contentContainer}>
        <View style={styles.helpPanel}>
          <Text style={styles.helpTitle}>Ayuda</Text>
          <View style={styles.optionsContainer}>
            {helpOptions.map((option, index) => 
              renderHelpOption(option, index)
            )}
          </View>
        </View>

        {/* Additional Help Info */}
        <View style={styles.additionalInfo}>
          <Text style={styles.infoTitle}>¿Necesitas más ayuda?</Text>
          <Text style={styles.infoText}>
            Nuestro equipo está aquí para ayudarte a cuidar mejor tus plantas. 
            No dudes en contactarnos si tienes alguna pregunta específica.
          </Text>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => handleOptionPress('Soporte técnico')}
          >
            <Text style={styles.contactButtonText}>Contactar Soporte</Text>
          </TouchableOpacity>
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
  headerRight: {
    width: 34, // Para balance con el botón de atrás
  },
  mainContent: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  helpPanel: {
    backgroundColor: '#2d5016',
    borderRadius: 20,
    padding: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 30,
  },
  helpTitle: {
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
  helpOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
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
  additionalInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#2d5016',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  contactButton: {
    backgroundColor: '#2d5016',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});