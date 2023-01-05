import React, {useState} from 'react';
import {Box, Text, HStack, Center, Pressable} from 'native-base';
// import Ionicons from '@expo/vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Colors from '../theme/Colors';

const Footer = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(0);
  return (
    <Box
      flex={1}
      bg="transparent"
      safeAreaTop
      width="100%"
      maxW="100%"
      // height="100%"
      alignSelf="center">
      <Center flex={1}></Center>
      <HStack
        bg={Colors.primaryColor}
        alignItems="center"
        safeAreaBottom
        shadow={6}>
        <Pressable
          cursor="pointer"
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => {
            navigation.navigate('HomeScreen');
            setSelected(0);
          }}>
          <Center>
            <Text color="white" fontSize="12">
              Trang chủ
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => {
            navigation.navigate('Cart');
            setSelected(1);
          }}>
          <Center>
            <Text color="white" fontSize="12">
              Giỏ hàng
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => {
            navigation.navigate('ListInvoice');
            setSelected(2);
          }}>
          <Center>
            <Text color="white" fontSize="12">
              Hóa đơn
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default Footer;
