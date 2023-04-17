import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation()

  return (
    <View style={styles.main}>
      <View style={styles.containerLogo}>
        <Image source={require('../../assets/logo.png')}/>
      </View>
      <View style={styles.containerBottom}>
        <View>
          <Text style={styles.title}>Bem-vindo ao PokéMapa</Text>
          <Text style={styles.p}>Ajude a comunidade, descubra lugares novos e explore as PokéStops mais perto de você</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Map')}>
            <Text style={styles.buttonText}>
                Ver Mapa
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#7786C1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    height:'100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    color:'#fff'
  },
  containerLogo:{
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBottom:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'space-between',
    width: '100%',
    borderRadius: 24,
    padding: 32
  },
  title:{
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  p:{
    marginTop: 16,
    marginBottom: 16,
    textAlign:'center',
    color: '#989898',
    fontSize: 18
  },
  button:{
    backgroundColor: '#7786C1',
    width: 100,
    borderRadius: 24,
    width: '100%',
    padding: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
}
});
