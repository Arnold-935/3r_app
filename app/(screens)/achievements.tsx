import { Link, useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface Achievement {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
}

const achievementsData: Achievement[] = [
  { id: '1', title: 'Primer Brote', icon: '🏆', unlocked: true },
  { id: '2', title: 'Jardinero', icon: '🏆', unlocked: true },
  { id: '3', title: 'Cuidador', icon: '🏆', unlocked: false },
  { id: '4', title: 'Experto', icon: '🏆', unlocked: true },
  { id: '5', title: 'Maestro', icon: '🏆', unlocked: false },
  { id: '6', title: 'Coleccionista', icon: '🏆', unlocked: true },
  { id: '7', title: 'Constante', icon: '🏆', unlocked: false },
  { id: '8', title: 'Dedicado', icon: '🏆', unlocked: true },
  { id: '9', title: 'Paciente', icon: '🏆', unlocked: false },
  { id: '10', title: 'Verde', icon: '🏆', unlocked: false },
  { id: '11', title: 'Naturalista', icon: '🏆', unlocked: false },
  { id: '12', title: 'Botánico', icon: '🏆', unlocked: false },
];

export default function Achievements() {
  const router = useRouter();
  const renderAchievement = ({ item }: { item: Achievement }) => (
    <TouchableOpacity 
      style={[
        styles.achievementCard,
        !item.unlocked && styles.lockedCard
      ]}
      onPress={() => {
        // Mostrar detalles del logro
        console.log(`Logro seleccionado: ${item.title}`);
      }}
    >
      <View style={styles.achievementContent}>
        <View style={[
          styles.iconContainer,
          !item.unlocked && styles.lockedIcon
        ]}>
          <Text style={[
            styles.achievementIcon,
            !item.unlocked && styles.lockedIconText
          ]}>
            {item.unlocked ? item.icon : '🔒'}
          </Text>
        </View>
        <Text style={[
          styles.achievementTitle,
          !item.unlocked && styles.lockedTitle
        ]}>
          {item.unlocked ? item.title : 'Logro'}
        </Text>
      </View>
      {item.unlocked && (
        <View style={styles.unlockedIndicator} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2d5016" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* Espacio vacío para mantener el balance */}
        </View>
        <View style={styles.headerRight}>
          <Link href="/help" asChild> 
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerIcon}>❓</Text>
          </TouchableOpacity>
          </Link>
          
          <Link href="/settings" asChild>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerIcon}>⚙️</Text>
          </TouchableOpacity>
          </Link>

        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <FlatList
          data={achievementsData}
          renderItem={renderAchievement}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.achievementsGrid}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
        />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Link href="/" asChild>
            <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navLabel}>Home</Text>
            </TouchableOpacity>
        </Link>
        
        
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconContainer}>
            <Text style={styles.navIcon}>📊</Text>
            <Text style={styles.navNumber}>0</Text>
          </View>
          <Text style={styles.navLabel}>Stats</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📷</Text>
          <Text style={styles.navLabel}>Camera</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📋</Text>
          <Text style={styles.navLabel}>List</Text>
        </TouchableOpacity>
        
        <Link href="/profile" asChild>
            <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>👤</Text>
            <Text style={styles.navLabel}>Profile</Text>
            </TouchableOpacity>
        </Link>
      </View>
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
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 15,
    padding: 5,
  },
  headerIcon: {
    fontSize: 20,
    color: 'white',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  achievementsGrid: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  achievementCard: {
    backgroundColor: '#2d5016',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '31%',
    aspectRatio: 0.8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: 'relative',
  },
  lockedCard: {
    backgroundColor: '#4a6b2a',
    opacity: 0.7,
  },
  achievementContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    marginBottom: 8,
  },
  lockedIcon: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 24,
    textAlign: 'center',
  },
  lockedIconText: {
    opacity: 0.6,
  },
  achievementTitle: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 13,
  },
  lockedTitle: {
    color: '#cccccc',
    opacity: 0.8,
  },
  unlockedIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  bottomNav: {
    backgroundColor: '#2d5016',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navNumber: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  navLabel: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
  },
});