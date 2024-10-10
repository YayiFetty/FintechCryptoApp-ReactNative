import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import SplashScreen from "../auth/SplashScreen";
import LoginScreen from "../auth/LoginScreen";
import RegisterScreen from "../auth/RegisterScreen";
import WelcomeScreen from "../auth/WelcomeScreen";
const Stack = createStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled:true,
        gestureEnabled:true,
        gestureDirection:'horizontal',
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
