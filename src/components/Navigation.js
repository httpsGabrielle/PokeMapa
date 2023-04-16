import { createNativeStackNavigator }
    from '@react-navigation/native-stack'
import { NavigationContainer, StackActions }
    from '@react-navigation/native'
import Mapa from '../pages/Map'
import Home from '../pages/Home'

const Stack = createNativeStackNavigator()
function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                options={{ headerShown: false }}
                component={Home} />
             <Stack.Screen
                name="Map"
                component={Mapa} 
                options ={{ headerTitle: 'PokeMapa'}} />
        </Stack.Navigator>
    )
}
export default function Navigation() {
    return (
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    )
}