import React from 'react';
import {Text, View, Image} from 'react-native';
// import {View, Text} from 'native-base';
// https://github.com/colbymillerdev/react-native-progress-steps
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import Colors from '../theme/Colors';
import AppStatusBar from '../components/AppStatusBar';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';

const DeliveryStatus = ({route}) => {
  const {invoice_statusdelivery} = route.params;
  const navigation = useNavigation();
  const progressStepsStyle = {
    activeStepIconBorderColor: Colors.primaryColor,
    activeLabelColor: Colors.primaryColor,
    activeStepNumColor: 'white',
    activeStepIconColor: Colors.primaryColor,
    completedStepIconColor: Colors.primaryColor,
    completedProgressBarColor: Colors.primaryColor,
    completedCheckColor: Colors.while,
  };
  const buttonTextStyle = {
    color: Colors.primaryColor,
    fontWeight: 'bold',
  };
  return (
    <View style={{flex: 1, margin: 10}}>
      <AppStatusBar />
      {invoice_statusdelivery == 1 ? (
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
            label="Chọn món"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
            isComplete>
            <View style={{alignItems: 'center'}}>
              <Text>Bạn đã thanh toán thành công đơn hàng</Text>
              <Image
                source={require('../../assets/images/emptycart.png')}
                style={{width: 400, height: 400, marginTop: 30}}
                alt="text"
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label="Chuẩn bị đơn hàng"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}>
            <View style={{alignItems: 'center'}}>
              <Text>Đơn hàng của bạn đang được chuẩn bị</Text>
              <Image
                source={require('../../assets/images/slide3.png')}
                style={{width: 400, height: 300, marginTop: 30}}
                alt="text"
              />
            </View>
            <Button
              title={'Mua tiếp'}
              style={{width: 300, alignSelf: 'center', marginTop: 20}}
              onPress={() => navigation.replace('HomeScreen')}
            />
          </ProgressStep>
        </ProgressSteps>
      ) : invoice_statusdelivery == 2 ? (
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
            label="Chọn món"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
            isComplete>
            <View style={{alignItems: 'center'}}>
              <Text>Bạn đã thanh toán thành công đơn hàng</Text>
              <Image
                source={require('../../assets/images/emptycart.png')}
                style={{width: 400, height: 400, marginTop: 30}}
                alt="text"
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label="Chuẩn bị đơn hàng"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}>
            <View style={{alignItems: 'center'}}>
              <Text>Đơn hàng của bạn đã chuẩn bị xong</Text>
              <Image
                source={require('../../assets/images/slide3.png')}
                style={{width: 400, height: 300, marginTop: 30}}
                alt="text"
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label="Vận chuyển"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}>
            <View style={{alignItems: 'center'}}>
              <Text>Đơn của bạn đang được vận chuyển</Text>
              <Image
                source={require('../../assets/images/onboarding3.png')}
                style={{width: 280, height: 350, marginTop: 30}}
                alt="text"
              />
            </View>
            <Button
              title={'Mua tiếp'}
              style={{width: 300, alignSelf: 'center', marginTop: 20}}
              onPress={() => navigation.replace('HomeScreen')}
            />
          </ProgressStep>
        </ProgressSteps>
      ) : invoice_statusdelivery == 3 ? (
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
            label="Chọn món"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
            isComplete>
            <View style={{alignItems: 'center'}}>
              <Text>Bạn đã thanh toán thành công đơn hàng</Text>
              <Image
                source={require('../../assets/images/emptycart.png')}
                style={{width: 400, height: 400, marginTop: 30}}
                alt="text"
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label="Chuẩn bị đơn hàng"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}>
            <View style={{alignItems: 'center'}}>
              <Text>Đơn hàng của bạn đã chuẩn bị xong</Text>
              <Image
                source={require('../../assets/images/slide3.png')}
                style={{width: 400, height: 300, marginTop: 30}}
                alt="text"
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label="Vận chuyển"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}>
            <View style={{alignItems: 'center'}}>
              <Text>Đơn hàng đã vận chuyển đến bạn thành công</Text>
              <Image
                source={require('../../assets/images/onboarding3.png')}
                style={{width: 300, height: 400, marginTop: 30}}
                alt="text"
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label="Giao hàng thành công"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}>
            <View style={{alignItems: 'center'}}>
              <Text>Giao hàng thành công! Cảm ơn và hẹn gặp lại.</Text>
              <Image
                source={require('../../assets/images/order-success.png')}
                style={{width: 400, height: 380, marginTop: 30}}
                alt="text"
              />
              <Button
                title={'Mua tiếp'}
                style={{width: 300, alignSelf: 'center', marginTop: 20}}
                onPress={() => navigation.replace('HomeScreen')}
              />
            </View>
          </ProgressStep>
        </ProgressSteps>
      ) : null}
    </View>
  );
};

export default DeliveryStatus;
