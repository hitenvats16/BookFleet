import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabButton from '../reusables/tabButton';
import Add from './Add';
import { colorPallet } from '../constants/colorpallet';
import Profile from './Profile';
import Home from './Home';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
    return (
        <Tab.Navigator 
        screenOptions={{ 
            headerShown: false, 
            tabBarShowLabel: false, 
            tabBarStyle: { 
                backgroundColor: colorPallet.primary, 
                height: 60, 
                borderTopLeftRadius: 10, 
                borderTopRightRadius: 10 
            }}} 
        initialRouteName='Home'>
            <Tab.Screen name="Add" component={Add} options={{
                tabBarIcon: ({ focused }) => {
                    return <TabButton focused={focused} title={"Add"} iconName={"upload"} />
                }
            }} />
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ focused }) => {
                    return <TabButton focused={focused} title={"Home"} iconName={"home"} />
                }
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({ focused }) => {
                    return <TabButton focused={focused} title={"Profile"} iconName={"user"} />
                }
            }} />
        </Tab.Navigator>
    );
}
