import { Link, useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Profile() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2d5016" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* Espacio vacío */}
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
      <ScrollView style={styles.mainContent} contentContainerStyle={styles.contentContainer}>
        
        {/* Profile Picture Section */}
        <View style={styles.profilePictureContainer}>
          <TouchableOpacity style={styles.profilePicture}>
            <View style={styles.profilePlaceholder}>
              <Text style={styles.imageIcon}>🖼️</Text>
              <Text style={styles.plusIcon}>+</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* User Info Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.infoButton}>
            <Text style={styles.buttonText}>Nombre de usuario</Text>
          </TouchableOpacity>

          <Link href="/achievements" asChild>
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.buttonText}>Logros</Text>
            </TouchableOpacity>
          </Link>
          
        </View>

        {/* Statistics Summary */}
        <TouchableOpacity style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Resumen de estadísticas</Text>
          <View style={styles.statsContent}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Plantas</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Días activo</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Logros</Text>
            </View>
          </View>
        </TouchableOpacity>

      </ScrollView>

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
        
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Text style={[styles.navIcon, styles.activeNavIcon]}>👤</Text>
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Profile</Text>
        </TouchableOpacity>
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
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  profilePictureContainer: {
    marginBottom: 40,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profilePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    fontSize: 30,
    color: '#888',
    marginBottom: 5,
  },
  plusIcon: {
    fontSize: 20,
    color: '#888',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  infoButton: {
    backgroundColor: '#2d5016',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 0.48,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: '#2d5016',
    width: '100%',
    borderRadius: 15,
    padding: 25,
    minHeight: 200,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  statsTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
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
  activeNavItem: {
    opacity: 1,
  },
  activeNavIcon: {
    opacity: 1,
  },
  activeNavLabel: {
    fontWeight: 'bold',
  },
});