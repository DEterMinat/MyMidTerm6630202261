import React, { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import { Platform, StyleSheet, ActivityIndicator, Alert } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Namecard {
  id: string;
  name: string;
  email: string;
  university: string;
  department: string;
}

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
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <ThemedText style={styles.loadingText}>Loading namecard...</ThemedText>
      </ThemedView>
    );
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Tanakit Namecard</ThemedText>
        <HelloWave />
      </ThemedView>
      
      {namecard && (
        <ThemedView style={styles.cardContainer}>
          <ThemedView style={styles.cardItem}>
            <ThemedText type="subtitle">Name:</ThemedText>
            <ThemedText style={styles.cardValue}>{namecard.name}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.cardItem}>
            <ThemedText type="subtitle">ID:</ThemedText>
            <ThemedText style={styles.cardValue}>{namecard.id}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.cardItem}>
            <ThemedText type="subtitle">Email:</ThemedText>
            <ThemedText style={styles.cardValue}>{namecard.email}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.cardItem}>
            <ThemedText type="subtitle">University:</ThemedText>
            <ThemedText style={styles.cardValue}>{namecard.university}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.cardItem}>
            <ThemedText type="subtitle">Department:</ThemedText>
            <ThemedText style={styles.cardValue}>{namecard.department}</ThemedText>
          </ThemedView>
        </ThemedView>
      )}
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Midterm Project</ThemedText>
        <ThemedText>
          Internet Programming - React Native with Express.js Backend
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  cardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    gap: 12,
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});
