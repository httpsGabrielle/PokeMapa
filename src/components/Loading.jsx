const Loading = () => {
    return (
        <View style={[styles.main, styles.viewCarregamento]}>
        <View style={styles.contentCarregamento}>
          <Image style={styles.imgCarregamento} source={require('../../assets/pikachu_correndo.gif')}/>
        </View>
        <Text style={styles.textoCarregamento}>Carregando mapa...</Text>
      </View>
    )
}

export default Loading