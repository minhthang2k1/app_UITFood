import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import {
  Box,
  Heading,
  FlatList,
  HStack,
  VStack,
  Spacer,
  Image,
  ScrollView,
} from 'native-base';
import Colors from '../theme/Colors';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';

import Axios from 'axios';
import {IP} from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TextStyles = StyleSheet.create({
  TextStyle: {
    color: Colors.colorPrimary,
    width: 150,
    fontWeight: '900',
    fontSize: 18,
  },
  ButtonStyle: {
    width: 57,
    alignSelf: 'center',
    marginTop: 15,
  },
});

const ListCoupon = () => {
  const navigation = useNavigation();
  const [dataDiscount, setDataDiscount] = useState([]);
  //Chuyền cus_id qua server
  const [cus_id, setCus_id] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('cus_id')
      .then(value => {
        setCus_id(value);
      })
      .then(res => {
        //do something else
      });
    //console.log(cus_id);
    Axios.get(`${IP}/my_coupon`, {
      params: {
        cus_id: cus_id,
      },
    })
      .then(response => {
        setDataDiscount(response.data);
      })
      .catch(error => {
        // console.log(error);
      });
  }, [cus_id]);
  //console.log('DataDisCount' + dataDiscount);
  let data = dataDiscount.map((item, key) => {
    return {
      Id: key,
      Dis_Id: item.dis_id,
      Discount: parseInt(item.dis_percent) / 1000 + 'k',
      //định dạng ngày tháng năm từ biến ngày
      DateStart: new Date(item.dis_start).toLocaleDateString(),
      DateEnd: new Date(item.dis_end).toLocaleDateString(),
      PriceMin: parseInt(item.dis_min) / 1000 + 'k',
      avatarUrl: require('../../assets/images/coupon1.jpg'),
    };
  });
  return (
    <SafeAreaView style={{marginHorizontal: 10}}>
      <Heading fontSize="xl" p="4" pb="3" alignSelf="center">
        Ví vourcher
      </Heading>
      <FlatList
        data={data}
        marginBottom={60}
        renderItem={({item}) => (
          <Box
            borderWidth="1"
            backgroundColor={'gray.300'}
            _dark={{
              borderColor: 'gray.600',
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2">
            <HStack space={3} justifyContent="space-between">
              <Image source={item.avatarUrl} alt={'Text'} size={'sm'} />
              <VStack>
                <Text style={TextStyles.TextStyle}>Giảm: {item.Discount}</Text>
                <Text>Từ: {item.DateStart}</Text>
                <Text>Đến: {item.DateEnd}</Text>
                <Text>Áp dụng cho đơn: trên {item.PriceMin}</Text>
              </VStack>
              <Spacer />
              <VStack>
                <Button
                  title={'Use'}
                  style={TextStyles.ButtonStyle}
                  onPress={() => navigation.replace('ProductByCategory')}
                />
              </VStack>
            </HStack>
          </Box>
        )}
        keyExtractor={item => item.Id}
      />
      <Button
        title={'Về trang chủ'}
        style={{
          width: 300,
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 20,
        }}
        onPress={() => navigation.replace('HomeScreen')}
      />
    </SafeAreaView>
  );
};

export default ListCoupon;
