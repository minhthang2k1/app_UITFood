import React from 'react';
// 1. import `NativeBaseProvider` component
import {NativeBaseProvider, Text, Box} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screen/SplashScreen';
import HomeScreen from './src/screen/HomeScreen';
import ProductReview from './src/screen/ProductReview';
import ListCoupon from './src/screen/ListCoupon';
import MyCoupon from './src/screen/MyCoupon';
import Cart from './src/screen/Cart';
import ProductDetails from './src/screen/ProductDetails';
import ProductByCategory from './src/screen/ProductByCategory';
import Map from './src/screen/Map';
import Login from './src/screen/Login';
import Register from './src/screen/Register';
import ChangePassword from './src/screen/ChangePassword';
import EditAccount from './src/screen/EditAccount';
import Profile from './src/screen/Profile';
import Notification from './src/screen/Notification';
import Checkout from './src/screen/Checkout';
import CheckoutSuccess from './src/screen/CheckoutSuccess';
import OrderHistory from './src/screen/OrderHistory';
import DeliveryStatus from './src/screen/DeliveryStatus';
import ListInvoice from './src/screen/ListInvoice';
import Invoice from './src/screen/Invoice';

const Stack = createNativeStackNavigator();

const App = () => {
  const initStackScreen = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProductReview" component={ProductReview} />
      <Stack.Screen name="ListCoupon" component={ListCoupon} />
      <Stack.Screen name="MyCoupon" component={MyCoupon} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="ProductByCategory" component={ProductByCategory} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="EditAccount" component={EditAccount} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="CheckoutSuccess" component={CheckoutSuccess} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen name="DeliveryStatus" component={DeliveryStatus} />
      <Stack.Screen name="ListInvoice" component={ListInvoice} />
      <Stack.Screen name="Invoice" component={Invoice} />
    </Stack.Navigator>
  );
  return (
    <>
      <NativeBaseProvider>
        <NavigationContainer>{initStackScreen()}</NavigationContainer>
      </NativeBaseProvider>
    </>
  );
};

export default App;
