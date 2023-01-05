import React, {useState, useEffect} from 'react';
import {
  Center,
  Box,
  Heading,
  FormControl,
  Input,
  VStack,
  Link,
  Button,
  HStack,
  Text,
} from 'native-base';
import loginImage from '../../assets/images/slide3.png';
import {Image} from 'react-native';
import Colors from '../theme/Colors';
// import Dimension from '../theme/Dimension';
import {useNavigation} from '@react-navigation/native';
// call backend
import Axios from 'axios';
import {IP} from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [cus_email, setCus_email] = useState('');
  const [cus_pass, setCus_pass] = useState('');
  const handleChangeCus_email = text => setCus_email(text);
  const handleChangeCus_pass = text => setCus_pass(text);
  const login = () => {
    Axios.post(`${IP}/login`, {
      cus_email: cus_email,
      cus_pass: cus_pass,
    }).then(async response => {
      if (response.data.message === 'success') {
        await AsyncStorage.multiSet([
          ['logged', 'true'],
          ['cus_id', response.data.result[0].cus_id.toString()],
          ['cus_email', response.data.result[0].cus_email],
        ]);
        const jsonValue = await AsyncStorage.getItem('logged');
        console.log(jsonValue);
        navigation.replace('HomeScreen');
      }
    });
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}>
          Chào mừng đến với UITFood
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs">
          Đăng nhập để tiếp tục!
        </Heading>
        <Image
          source={loginImage}
          style={{width: 280, height: 200, alignSelf: 'center'}}
        />
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input onChangeText={handleChangeCus_email} value={cus_email} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Mật khẩu</FormControl.Label>
            <Input
              type="password"
              onChangeText={handleChangeCus_pass}
              value={cus_pass}
            />
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'indigo.500',
              }}
              alignSelf="flex-end"
              mt="1">
              Quên mật khẩu?
            </Link>
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={() => {
              login();
            }}
            style={{backgroundColor: Colors.primaryColor}}>
            Đăng nhập
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
              style={{marginTop: 8}}>
              Bạn chưa có tài khoản?{' '}
            </Text>
            <Button
              _text={{
                color: '#ffff',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={() => navigation.replace('Register')}
              style={{backgroundColor: Colors.primaryColor}}>
              Đăng kí ngay nào
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;
