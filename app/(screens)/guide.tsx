import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Animated,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface ContainerInfo {
  id: string;
  color: string;
  title: string;
  subtitle: string;
  items: string[];
  tips: string[];
}

export default function RecyclingGuideScreen() {
    const router = useRouter();
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null);
  const [animatedValue] = useState(new Animated.Value(1));

  const containersData: ContainerInfo[] = [
    {
      id: 'green',
      color: '#4CAF50',
      title: 'Contenedor verde',
      subtitle: 'Vidrio',
      items: [
        'Botellas de vidrio',
        'Frascos y tarros',
        'Envases de conservas',
        'Botellas de perfume',
        'Cristalería rota'
      ],
      tips: [
        'Retira tapas y tapones',
        'No incluyas cristales de ventanas',
        'Enjuaga los envases'
      ]
    },
    {
      id: 'blue',
      color: '#2196F3',
      title: 'Contenedor azul',
      subtitle: 'Papel y cartón',
      items: [
        'Periódicos y revistas',
        'Cajas de cartón',
        'Folios y documentos',
        'Libros y cuadernos',
        'Envases de cartón'
      ],
      tips: [
        'Pliega las cajas',
        'Retira grapas y clips',
        'No mojes el papel'
      ]
    },
    {
      id: 'yellow',
      color: '#FFC107',
      title: 'Contenedor amarillo',
      subtitle: 'Plásticos y metales',
      items: [
        'Botellas de plástico',
        'Latas de bebidas',
        'Envases de yogur',
        'Bolsas de plástico',
        'Briks de leche'
      ],
      tips: [
        'Aplasta los envases',
        'Enjuaga los residuos',
        'Separa tapas si es posible'
      ]
    },
    {
      id: 'brown',
      color: '#8D6E63',
      title: 'Contenedor marrón',
      subtitle: 'Orgánicos',
      items: [
        'Restos de comida',
        'Cáscaras de frutas',
        'Posos de café',
        'Restos de jardín',
        'Papel sucio de comida'
      ],
      tips: [
        'Usa bolsas compostables',
        'No incluyas huesos grandes',
        'Evita aceites en exceso'
      ]
    }
  ];

  const handleContainerPress = (containerId: string) => {
    setSelectedContainer(selectedContainer === containerId ? null : containerId);
    
    // Animación de selección
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderContainer = (container: ContainerInfo, index: number) => (
    <TouchableOpacity
      key={container.id}
      style={[styles.containerItem, { marginLeft: index * 5 }]}
      onPress={() => handleContainerPress(container.id)}
      activeOpacity={0.8}
    >
      <Animated.View style={[
        styles.trashContainer,
        { backgroundColor: container.color },
        selectedContainer === container.id && { transform: [{ scale: animatedValue }] }
      ]}>
        <View style={[styles.containerLid, { backgroundColor: container.color }]} />
        <View style={styles.containerBody}>
          <Text style={styles.recycleSymbol}>♻️</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );

  const renderContainerInfo = (container: ContainerInfo) => (
    <View key={container.id} style={styles.infoSection}>
      <View style={styles.infoHeader}>
        <View style={[styles.colorIndicator, { backgroundColor: container.color }]} />
        <View>
          <Text style={styles.containerTitle}>{container.title}</Text>
          <Text style={styles.containerSubtitle}>{container.subtitle}</Text>
        </View>
      </View>
      
      {selectedContainer === container.id && (
        <View style={styles.expandedInfo}>
          <Text style={styles.sectionTitle}>¿Qué va aquí?</Text>
          {container.items.map((item, index) => (
            <Text key={index} style={styles.itemText}>• {item}</Text>
          ))}
          
          <Text style={styles.sectionTitle}>Consejos:</Text>
          {container.tips.map((tip, index) => (
            <Text key={index} style={styles.tipText}>💡 {tip}</Text>
          ))}
        </View>
      )}
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
        <Text style={styles.headerTitle}>Guía de Reciclaje</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Los contenedores de reciclaje</Text>
        </View>

        {/* Info Panel */}
        <View style={styles.infoPanel}>
          
          {/* Containers Illustration */}
          <View style={styles.containersSection}>
            <View style={styles.containersRow}>
              {containersData.map((container, index) => 
                renderContainer(container, index)
              )}
            </View>
            <Text style={styles.instructionText}>
              Toca un contenedor para ver más información
            </Text>
          </View>

          {/* Containers Information */}
          <View style={styles.infoList}>
            {containersData.map(container => renderContainerInfo(container))}
          </View>

          {/* Additional Tips */}
          <View style={styles.generalTips}>
            <Text style={styles.generalTipsTitle}>Consejos generales:</Text>
            <Text style={styles.generalTipText}>
              🌱 Reciclar correctamente ayuda a proteger el medio ambiente
            </Text>
            <Text style={styles.generalTipText}>
              🔄 Reduce, reutiliza y recicla en ese orden de prioridad
            </Text>
            <Text style={styles.generalTipText}>
              📍 Busca puntos de reciclaje especiales para pilas y electrónicos
            </Text>
            <Text style={styles.generalTipText}>
              💧 Limpia los envases antes de reciclarlos
            </Text>
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
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 34,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleSection: {
    paddingVertical: 20,
  },
  mainTitle: {
    backgroundColor: '#2d5016',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  infoPanel: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  containersSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  containersRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  containerItem: {
    marginHorizontal: 8,
  },
  trashContainer: {
    width: 60,
    height: 75,
    borderRadius: 8,
    position: 'relative',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  containerLid: {
    width: 70,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    top: -6,
    left: -5,
  },
  containerBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  recycleSymbol: {
    fontSize: 16,
    color: 'white',
  },
  instructionText: {
    fontSize: 12,
    color: '#2d5016',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  infoList: {
    marginBottom: 20,
  },
  infoSection: {
    marginBottom: 15,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 15,
  },
  containerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5016',
  },
  containerSubtitle: {
    fontSize: 14,
    color: '#2d5016',
    opacity: 0.8,
  },
  expandedInfo: {
    marginLeft: 35,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d5016',
    marginTop: 10,
    marginBottom: 5,
  },
  itemText: {
    fontSize: 13,
    color: '#2d5016',
    marginBottom: 3,
    lineHeight: 18,
  },
  tipText: {
    fontSize: 12,
    color: '#2d5016',
    marginBottom: 3,
    lineHeight: 16,
    fontStyle: 'italic',
  },
  generalTips: {
    backgroundColor: 'rgba(45, 80, 22, 0.1)',
    borderRadius: 15,
    padding: 15,
  },
  generalTipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 10,
  },
  generalTipText: {
    fontSize: 13,
    color: '#2d5016',
    marginBottom: 8,
    lineHeight: 18,
  },
});