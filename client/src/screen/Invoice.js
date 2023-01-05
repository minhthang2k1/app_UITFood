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
import {Linking} from 'react-native';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
// call backend
import Axios from 'axios';
import {IP} from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Invoice = ({route}) => {
  const {
    invoice_id,
    invoice_status,
    invoice_feeship,
    invoice_discount,
    invoice_bill,
    invoice_statusdelivery,
  } = route.params;
  const [bill, setBill] = useState(invoice_bill.toString());
  const navigation = useNavigation();
  const [cus_id, setCus_id] = useState(null);
  AsyncStorage.getItem('cus_id')
    .then(cus_id => {
      setCus_id(cus_id);
    })
    .catch(error => {
      console.log(error);
    });
  const [dataProductInInvoice, setDataProductInInvoice] = useState([]);
  const getDataProductInInvoice = useCallback(() => {
    Axios.get(`${IP}/product_in_invoice/${invoice_id}`)
      .then(res => {
        setDataProductInInvoice(res.data);
        // console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [invoice_id]);
  useEffect(() => {
    getDataProductInInvoice();
  }, [getDataProductInInvoice]);
  // console.log(dataProductInInvoice);
  const data = dataProductInInvoice.map((item, key) => {
    return {
      id: key,
      invoice_id: item.invoice_id,
      product_id: item.product_id,
      product_name: item.product_name,
      product_image: item.product_image,
      product_price: item.product_price,
      inde_quantity: item.inde_quantity,
    };
  });

  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Chi tiết đơn hàng số {invoice_id}
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
                  Số lượng: {item.inde_quantity}
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
              </VStack>
            </HStack>
            <Spacer />
          </Box>
        )}
        keyExtractor={item => item.id}
      />
      <HStack space={3} alignSelf="center">
        <VStack>
          <Text
            fontSize="xs"
            _dark={{
              color: 'warmGray.50',
            }}
            color="coolGray.800">
            Phí ship {invoice_feeship} đ
          </Text>
        </VStack>
      </HStack>
      <HStack space={3} alignSelf="center">
        <VStack>
          <Text
            fontSize="xs"
            _dark={{
              color: 'warmGray.50',
            }}
            color="coolGray.800">
            Khuyến mãi {invoice_discount} đ
          </Text>
        </VStack>
      </HStack>
      {invoice_status != 1 ? (
        <Text
          fontSize="xs"
          _dark={{
            color: 'warmGray.50',
          }}
          style={{color: 'red'}}
          alignSelf="center"
          color="coolGray.800">
          {' '}
          Đơn chưa thanh toán
        </Text>
      ) : (
        <Button
          title={'Xem bill'}
          style={{width: 100, alignSelf: 'center', marginTop: 20}}
          onPress={() => Linking.openURL(bill)}></Button>
      )}
      {invoice_statusdelivery != 0 ? (
        <Button
          title={'Giao hàng'}
          style={{width: 103, alignSelf: 'center', marginTop: 20}}
          onPress={() =>
            navigation.replace('DeliveryStatus', {
              invoice_statusdelivery: invoice_statusdelivery,
            })
          }></Button>
      ) : null}
      <Button
        title={'Quay lại'}
        style={{width: 100, alignSelf: 'center', marginTop: 20}}
        onPress={() => navigation.replace('ListInvoice')}></Button>
    </Box>
  );
};

export default Invoice;
