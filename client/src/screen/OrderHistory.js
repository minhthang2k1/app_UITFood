import React, {useState, useCallback, useEffect} from 'react';
import {
  Box,
  Heading,
  FlatList,
  HStack,
  VStack,
  Text,
  Spacer,
  Image,
} from 'native-base';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
// call backend
import Axios from 'axios';
import {IP} from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderHistory = () => {
  const navigation = useNavigation();
  const [cus_id, setCus_id] = useState(null);
  AsyncStorage.getItem('cus_id')
    .then(cus_id => {
      setCus_id(cus_id);
    })
    .catch(error => {
      console.log(error);
    });
  const [dataHistory, setDataHistory] = useState([]);
  const getDataHistory = useCallback(() => {
    Axios.get(`${IP}/orderhistory/${cus_id}`)
      .then(res => {
        setDataHistory(res.data);
        // console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [cus_id]);
  useEffect(() => {
    getDataHistory();
  }, [getDataHistory]);
  console.log(dataHistory);
  const data = dataHistory.map((item, key) => {
    return {
      id: key,
      product_id: item.product_id,
      product_name: item.product_name,
      product_image: item.product_image,
      product_price: item.product_price,
      product_quantity: item.product_quantity,
      inde_quantity: item.inde_quantity,
    };
  });

  // const data = [
  //   {
  //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //     ProductName: 'Hamburger Ý',
  //     timeStamp: '12:47 PM',
  //     Category: 'Hamburger',
  //     avatarUrl: require('../../assets/images/crispy-chicken-burger.jpg'),
  //   },
  // ];
  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Các món đã đặt
      </Heading>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: 'gray.600',
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2">
            <HStack space={3} justifyContent="space-between">
              <Image source={{uri: item.product_image}} alt="text" size="sm" />
              <VStack>
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold
                  style={{width: 150}}>
                  {item.product_name}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  SL vừa mua: {item.inde_quantity}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  Số lượng còn: {item.product_quantity}
                </Text>
              </VStack>
              <Spacer />
              <VStack>
                <Text
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  alignSelf="flex-start">
                  Giá {item.product_price} đ
                </Text>
                <Button
                  title={'Đặt lại'}
                  style={{width: 100, alignSelf: 'center', marginTop: 20}}
                  onPress={() =>
                    navigation.replace('ProductDetails', {
                      product_id: item.product_id,
                    })
                  }></Button>
              </VStack>
            </HStack>
          </Box>
        )}
        keyExtractor={item => item.id}
      />
      <Button
        title={'Về trang chủ'}
        style={{width: 140, alignSelf: 'center', marginTop: 20}}
        onPress={() => navigation.replace('HomeScreen')}></Button>
    </Box>
  );
};

export default OrderHistory;
