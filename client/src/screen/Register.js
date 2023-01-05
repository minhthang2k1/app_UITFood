import React, {useState} from 'react';
import {
  Center,
  Box,
  Heading,
  FormControl,
  Input,
  VStack,
  Button,
  HStack,
  Text,
} from 'native-base';
import loginImage from '../../assets/images/slide2.png';
import {Image} from 'react-native';
import Colors from '../theme/Colors';
import Axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {IP} from '../constants/constants';

const Register = () => {
  const [cus_email, setCus_email] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleChangeCus_email = text => setCus_email(text);
  const handleChangePassword = text => setPassword(text);
  const handleChangeConfirmPassword = text => setConfirmPassword(text);

  const navigation = useNavigation();

  const register = () => {
    if (password === confirmPassword) {
      console.log(`cus_email: ` + cus_email);
      Axios.post(`${IP}/register`, {
        cus_email: cus_email,
        cus_pass: password,
      })
        .then(response => {
          console.log(`usename: ` + cus_email);
          console.log(`password: ` + password);
          if (response.data.message === 'success') {
            console.log(response.data);
            navigation.replace('Login');
          } else {
            navigation.replace('Login');
          }
        })
        .catch(error => {
          navigation.replace('Login');
          console.log(error);
        });
    } else {
      alert('Password not match');
    }
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight="semibold">
          Chào mừng đến với UITFood
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight="medium"
          size="xs">
          Tạo 1 tài khoản và bắt đầu mua bánh mì!
        </Heading>
        <Image
          source={loginImage}
          style={{width: 280, height: 200, alignSelf: 'center'}}
        />
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input value={cus_email} onChangeText={handleChangeCus_email} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Mật khẩu</FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={handleChangePassword}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Xác nhận mật khẩu</FormControl.Label>
            <Input
              type="password"
              value={confirmPassword}
              onChangeText={handleChangeConfirmPassword}
            />
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={() => {
              register();
            }}
            style={{backgroundColor: Colors.primaryColor}}>
            Đăng kí
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
              style={{marginTop: 8}}>
              Đã có tài khoản?{' '}
            </Text>
            <Button
              _text={{
                color: '#ffffff',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={() => navigation.replace('Login')}
              style={{backgroundColor: Colors.primaryColor}}>
              Đăng nhập ngay
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Register;
