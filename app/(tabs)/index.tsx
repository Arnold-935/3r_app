import { Link } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2d5016" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.leafIcon}>🍃</Text>
          <Text style={styles.headerNumber}>0</Text>
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
        <View style={styles.plantContainer}>
          {/* Plant Illustration */}
          <View style={styles.plant}>
            <View style={styles.leaves}>

              <Link href="/questions" asChild>
                <TouchableOpacity style={styles.leafEmoji}>
                  <Text style={styles.leafEmoji}>🌿</Text>
                </TouchableOpacity>
              </Link>

              <Link href="/questions" asChild>
                <TouchableOpacity style={styles.leafEmoji}>
                  <Text style={styles.leafEmoji}>🍃</Text>
                </TouchableOpacity>
              </Link>

              <Link href="/questions" asChild>
                <TouchableOpacity style={styles.leafEmoji}>
                  <Text style={styles.leafEmoji}>🌿</Text>
                </TouchableOpacity>
              </Link>

              <Link href="/questions" asChild>
                <TouchableOpacity style={styles.leafEmoji}>
                  <Text style={styles.leafEmoji}>🍃</Text>
                </TouchableOpacity>
              </Link>

              <Link href="/questions" asChild>
                <TouchableOpacity style={styles.leafEmoji}>
                  <Text style={styles.leafEmoji}>🌿</Text>
                </TouchableOpacity>
              </Link>

              <Link href="/questions" asChild>
                <TouchableOpacity style={styles.leafEmoji}>
                  <Text style={styles.leafEmoji}>🍃</Text>
                </TouchableOpacity>
              </Link>

            </View>
            <View style={styles.stem} />
            <View style={styles.pot}>
              <View style={styles.potRim} />
            </View>
          </View>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Inicio</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconContainer}>
            <Text style={styles.navIcon}>📊</Text>
            <Text style={styles.navNumber}>0</Text>
          </View>
          <Text style={styles.navLabel}>Estadísticas</Text>
        </TouchableOpacity>
        
        <Link href="/guide" asChild>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📚</Text>
          <Text style={styles.navLabel}>Guias</Text>
        </TouchableOpacity>
        </Link>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📋</Text>
          <Text style={styles.navLabel}>Lista</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  leafIcon: {
    fontSize: 24,
    marginRight: 5,
  },
  headerNumber: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  plantContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  plant: {
    alignItems: 'center',
  },
  leaves: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    marginBottom: 10,
  },
  leafEmoji: {
    fontSize: 28,
    margin: 2,
    transform: [{ rotate: '15deg' }],
  },
  stem: {
    width: 6,
    height: 80,
    backgroundColor: '#8B4513',
    marginBottom: 5,
  },
  pot: {
    width: 100,
    height: 60,
    backgroundColor: '#CD853F',
    borderRadius: 8,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  potRim: {
    width: 110,
    height: 15,
    backgroundColor: '#D2691E',
    borderRadius: 8,
    position: 'absolute',
    top: -7,
    left: -5,
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