import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { getAllPokestops, addPokestop } from '../services/api';

export default function Mapa() {
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showCallout, setShowCallout] = useState(false)
  const [loading, setLoading] = useState(true);

  // const handlePressMarker = (marker) => {
  //   setShowCallout()
  //   return (
  //     <View style={styles.callout}>
  //       <Text styles={styles.calloutTitle}>{marker.name}</Text>
  //       <Text styles={styles.calloutInfo}>
  //         {Location.reverseGeocodeAsync({ latitude: Number(marker.latitude), longitude: Number(marker.longitude)})}
  //       </Text>
  //       <View style={styles.calloutBottom}>
  //         <Text style={styles.calloutCloseBtn}>▾</Text>
  //       </View>
  //     </View>
  //   )
  // }

  useEffect(() => {
    const fetchPokestops = async () => {
      try {
        const pokestops = await getAllPokestops()
        setMarkers(pokestops)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }

    fetchPokestops()
  }, [])

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied')
          return
        }

        let location = await Location.getCurrentPositionAsync({})
        setLocation(location)
      } catch (error) {
        console.log(error)
      }
    }

    getLocation()
  }, [])

  if (errorMsg) {
    return (
      <View>
        <Text>{errorMsg}</Text>
      </View>
    )
  }

  if (!location || loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.main}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
        toolbarEnabled={false}
      >
        {markers.map((marker) => (
          <Marker 
            key={marker.id}
            coordinate={{
              latitude: Number(marker.latitude),
              longitude: Number(marker.longitude)
            }}
            title={marker.name}
            image={require('../../assets/marker.png')}
          >
            <Callout tooltip>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{marker.name}</Text>
                <Text style={styles.calloutInfo}>
                  {marker.latitude}, {marker.longitude}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
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
  },
  callout: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'space-between',
    borderRadius: 24,
    padding: 16
  },
  calloutTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  calloutInfo: {
    fontSize: 16,
    color: '#989898'
  }
})