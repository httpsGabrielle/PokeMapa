import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function Mapa() {
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitudfe] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapLoaded, setmapLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setmapLoaded(true)
    })();
  }, []);

  return(    
    <View style={styles.main}>
      {mapLoaded?
        <MapView style={styles.map} 
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}/>
      :''}
      <TouchableOpacity style={styles.addbtn}>
        <Text style={styles.addbtnContent}>+</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    ...StyleSheet.absoluteFill
  },
  map: {
    ...StyleSheet.absoluteFill
  },
  addbtn: {
    backgroundColor: '#7786C1',
    borderRadius: 50,
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addbtnContent: {
    fontWeight: 'bold',
    fontSize: 32,
    color: 'white',
  }
})