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
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  map: {
    width: '100%',
    height: '100%'
  },
  addbtn:{
    fontWeight:'bold',
    width: 10,
    height: 10,
    right: 8,
    bottom: 8
  }
})