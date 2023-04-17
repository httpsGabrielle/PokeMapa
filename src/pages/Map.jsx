import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { getAllPokestops, addPokestop } from '../services/api';

export default function Mapa() {
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showCallout, setShowCallout] = useState(false);
  const [value, onChangeText] = useState('Nome da Pokestop');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

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

  getAddress = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync(); // Get the location permission from the user and extract the 'status' key from it.
    if(status !== 'granted') {

        alert('permission denied!');
        return;
    }
    let address = Location.reverseGeoCodeAsync([location.coords.latitude, location.coords.longitude]);
  }

  if (errorMsg) {
    return (
      <View>
        <Text>{errorMsg}</Text>
      </View>
    )
  }

  if (!location || loading) {
    return (
      <View style={[styles.main, styles.viewCarregamento]}>
      <View style={styles.contentCarregamento}>
        <Image style={styles.imgCarregamento} source={require('../../assets/pikachu_correndo.gif')}/>
      </View>
      <Text style={styles.textoCarregamento}>Carregando mapa...</Text>
    </View>
    )
  }

  return (
    <View style={styles.main}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView} onPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.modalViewContent}>
            <TextInput
                editable
                maxLength={100}
                onChangeText={text => onChangeText(text)}
                value={value}
                style={styles.textInput}
              />
            <Text style={styles.modalText}><Text style={{fontWeight: 'bold'}}>Latitude:</Text>  {location.coords.latitude}</Text>
            <Text style={styles.modalText}><Text style={{fontWeight: 'bold'}}>Longitude:</Text> {location.coords.longitude}</Text>

            <TouchableOpacity style={[styles.button, styles.fundoRoxo]} onPress={() => addPokestop({name: nome, latitude: latitude, longitude: longitude})}>
              <Text style={styles.buttonText}>Cadastrar Pokestop</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.fundoVermelho]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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


      <TouchableOpacity style={styles.addbtn}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.addbtnContent}>+</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFill
  },
  map: {
    ...StyleSheet.absoluteFill
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalViewContent: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fundoRoxo: {
    backgroundColor: '#7786C1'
  },
  fundoVermelho: {
    backgroundColor: '#FC6060'
  },
  textInput: {
    backgroundColor: '#fbfbfb',
    borderRadius: 4,
    width: '90%',
    padding: 4
  },
  contentCarregamento: {
    backgroundColor: '#ffffff',
    borderRadius: 100,
    padding: 10,
    overflow: 'hidden',
    height: 200,
    width: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 0
  },
  imgCarregamento: {
    height: '80%',
    resizeMode: 'contain',
  },
  textoCarregamento: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#7786C1',
  },
  viewCarregamento: {
    backgroundColor: '#BDC7F0',
    flex: 1
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
  },
  button:{
    width: 100,
    borderRadius: 15,
    width: '100%',
    padding: 12,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
}
})