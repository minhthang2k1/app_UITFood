import React from 'react';
import {View} from 'react-native';
import OrderSuccessImage from '../../assets/images/order-success.png';
import {Image} from 'react-native';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import Dimension from '../theme/Dimension';
import Colors from '../theme/Colors';
import AppStatusBar from '../components/AppStatusBar';

const CheckoutSuccess = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <AppStatusBar />
      <Image
        source={OrderSuccessImage}
        style={{width: Dimension.window.width, resizeMode: 'contain'}}
      />
      <Button
        title={'Tình trạng Giao hàng'}
        style={{width: 300, alignSelf: 'center', marginTop: 20}}
        onPress={() => navigation.replace('DeliveryStatus')}
      />
      <Button
        title={'Mua tiếp'}
        style={{width: 300, alignSelf: 'center', marginTop: 20}}
        onPress={() => navigation.replace('HomeScreen')}
      />
    </View>
  );
};

export default CheckoutSuccess;
