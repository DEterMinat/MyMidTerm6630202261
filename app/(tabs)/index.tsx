import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, Alert, View, Text, Dimensions } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Namecard {
  id: string;
  name: string;
  email: string;
  university: string;
  department: string;
}

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const [namecard, setNamecard] = useState<Namecard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // API URL for namecard
  const API_URL = 'http://nindam.sytes.net:9678/api/namecard';

  const fetchNamecard = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: Namecard = await response.json();
      setNamecard(data);
    } catch (error) {
      console.error('Error fetching namecard:', error);
      Alert.alert(
        'Error',
        'Failed to fetch namecard. Please check your connection.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNamecard();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading namecard...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>T</Text>
            </View>
          </View>
        </View>
        <Text style={styles.headerTitle}>Digital Business Card</Text>
        <Text style={styles.headerSubtitle}>Student ID: {namecard?.id}</Text>
      </View>

      {/* Card Container */}
      <View style={styles.cardWrapper}>
        {namecard && (
          <View style={styles.businessCard}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View style={styles.cardLogo}>
                <Text style={styles.cardLogoText}>T</Text>
              </View>
              <View style={styles.cardHeaderText}>
                <Text style={styles.companyName}>Kasetsart University</Text>
                <Text style={styles.department}>{namecard.department}</Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Card Content */}
            <View style={styles.cardContent}>
              <View style={styles.cardSection}>
                <View style={styles.profileIcon}>
                  <Text style={styles.iconText}>👤</Text>
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{namecard.name}</Text>
                  <Text style={styles.cardRole}>Computer Engineering Student</Text>
                </View>
              </View>

              <View style={styles.contactSection}>
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>📧</Text>
                  <Text style={styles.contactText}>{namecard.email}</Text>
                </View>
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>🏫</Text>
                  <Text style={styles.contactText}>{namecard.university}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Internet Programming</Text>
        <Text style={styles.footerSubtext}>React Native with Express.js Backend</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    backgroundColor: '#1e3a8a', // Navy blue
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3b82f6', // Blue
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#cbd5e1', // Light blue-gray
    textAlign: 'center',
  },
  cardWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  businessCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardLogoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cardHeaderText: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  department: {
    fontSize: 14,
    color: '#64748b',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 20,
  },
  cardContent: {
    gap: 20,
  },
  cardSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileIcon: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 20,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  cardRole: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '600',
  },
  contactSection: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  contactIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 25,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 16,
    color: '#475569',
    flex: 1,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
});
