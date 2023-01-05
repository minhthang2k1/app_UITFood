import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, StyleSheet, TextInput, Image, FlatList} from 'react-native';
import {Heading, Modal, Box, HStack, VStack, Spacer} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Colors from '../theme/Colors';
import CartCard from '../components/CartCard';
import {ScrollView} from 'native-base';
import Button from '../components/Button';
import Footer from '../components/Footer';
import CheckoutStep from '../components/CheckoutStep';
// call backend
import Axios from 'axios';
import {IP} from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = () => {
  const [dataCart, setDataCart] = useState([]);
  const [cus_id, setCus_id] = useState(null);
  // const [product_id, setProduct_id] = useState(null);
  const [DelMessageParent, setDelMessageParent] = useState(false);
  const [totalMoney, setTotalMoney] = useState(0);
  const [FeeShip, setFeeShip] = useState(0);
  const [discount, setDiscount] = useState(0);
  AsyncStorage.getItem('cus_id').then(cus_id => {
    setCus_id(cus_id);
    setDelMessageParent(!DelMessageParent);
  });
  useEffect(() => {
    Axios.get(`${IP}/getcart/${cus_id}`)
      .then(res => {
        res.data && setDataCart(res.data);
        // console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [cus_id, DelMessageParent]);

  const getTotalMoney = useCallback(() => {
    let total = 0;
    dataCart.map((item, key) => {
      total += item.product_price * item.cart_quantity;
    });
    setTotalMoney(total);
    // console.log('money', totalMoney);
  }, [dataCart]);
  const navigation = useNavigation();
  // console.log(dataCart);
  const [showModal, setShowModal] = useState(false); // pptt
  const [dataDiscount, setDataDiscount] = useState([]);
  useEffect(() => {
    Axios.get(`${IP}/my_coupon`, {
      params: {
        cus_id: cus_id,
      },
    })
      .then(response => {
        setDataDiscount(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [cus_id]);
  let data = dataDiscount.map((item, key) => {
    return {
      Id: key,
      Dis_Id: item.dis_id,
      Discount: parseInt(item.dis_percent),
      //định dạng ngày tháng năm từ biến ngày
      DateStart: new Date(item.dis_start).toLocaleDateString(),
      DateEnd: new Date(item.dis_end).toLocaleDateString(),
      PriceMin: parseInt(item.dis_min) / 1000 + 'k',
      avatarUrl: require('../../assets/images/coupon1.jpg'),
    };
  });
  const [Hid, setHid] = useState(true);
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Heading fontSize="xl" p="4" pb="3">
        Giỏ hàng
      </Heading>
      <ScrollView style={styles.content}>
        {dataCart.length > 0 ? (
          dataCart.map((item, key) => (
            <CartCard
              key={key}
              product_id={item.product_id}
              product_quantity={item.product_quantity}
              title={item.product_name}
              quantity={item.cart_quantity}
              price={item.product_price}
              image={item.product_image}
              DelMessageParent={DelMessageParent}
              setDelMessageParent={setDelMessageParent}
              totalMoney={totalMoney}
              setTotalMoney={setTotalMoney}
            />
          ))
        ) : (
          <Text style={{margin: 20}}>Không có sản phẩm nào trong giỏ hàng</Text>
        )}
        <Image
          onLoad={() => {
            getTotalMoney();
            setHid(true);
          }}
        />
        <View style={{marginTop: 40}}>
          {Hid === true ? (
            <Button
              title={'Chọn khuyến mãi'}
              style={{flex: 1, fontSize: 10, width: 200, alignSelf: 'center'}}
              onPress={() => setShowModal(true)}
            />
          ) : null}
        </View>
        <View style={styles.totalSection}>
          <View style={styles.divider} />
          <View>
            <View style={styles.DetailsToTal}>
              <Text style={{fontSize: 16}}>Tiền món</Text>
              <Text style={styles.PriceStyle}>
                {totalMoney && totalMoney} đ
              </Text>
            </View>
            <View style={styles.DetailsToTal}>
              <Text style={{fontSize: 16}}>Khuyến mãi</Text>
              <Text style={styles.PriceStyle}>{discount && discount} đ</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.DetailsToTal}>
              <Text style={styles.TotalStyle}>Tổng tiền</Text>
              <Text style={styles.TotalStyle}>
                {FeeShip == 0 ? totalMoney + FeeShip - discount : totalMoney} đ
              </Text>
            </View>
          </View>
        </View>
        <Text style={{marginLeft: 20, marginTop: 15}}>
          Bấm thanh toán để tạo đơn hàng
        </Text>
        <CheckoutStep
          cus_id={cus_id}
          dataCart={dataCart}
          totalMoney={totalMoney}
          setTotalMoney={setTotalMoney}
          FeeShip={FeeShip}
          setFeeShip={setFeeShip}
          discount={discount}
        />
      </ScrollView>
      <Modal
        width="lg"
        style={{alignSelf: 'center'}}
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        size="lg">
        <Modal.Content maxWidth="400">
          <Modal.CloseButton />
          <Modal.Header>Chọn khuyến mãi</Modal.Header>
          <Modal.Body>
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
                    <Image
                      source={item.avatarUrl}
                      alt={'Text'}
                      size={'sm'}
                      style={{width: 40, height: 40}}
                    />
                    <VStack>
                      <Text style={TextStyles.TextStyle}>
                        Giảm: {item.Discount}
                      </Text>
                      <Text>Từ: {item.DateStart}</Text>
                      <Text>Đến: {item.DateEnd}</Text>
                      <Text>Áp dụng cho đơn: trên {item.PriceMin}</Text>
                    </VStack>
                    <Spacer />
                    <VStack>
                      <Button
                        title={'Use'}
                        style={TextStyles.ButtonStyle}
                        onPress={() => {
                          setDiscount(item.Discount);
                          setShowModal(false);
                          setHid(false);
                        }}
                      />
                    </VStack>
                  </HStack>
                </Box>
              )}
              keyExtractor={item => item.Id}
            />
          </Modal.Body>
          <Modal.Footer>
            <Text>Chọn 1 khuyến mãi</Text>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Footer />
    </View>
  );
};

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

const styles = StyleSheet.create({
  content: {
    height: '76%',
    marginHorizontal: 29,
    // paddingBottom: 32,
  },
  totalSection: {
    marginTop: 32,
  },
  divider: {
    height: 1,
    borderColor: '#ddddddd',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    marginHorizontal: 16,
    marginTop: 5,
  },
  TotalStyle: {
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
  },
  PriceStyle: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
  },
  DetailsToTal: {
    marginTop: 14,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  CouponStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 52,
    borderRadius: 50,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingLeft: 29,
    marginTop: 32,
  },
  placeholderStyle: {
    opacity: 0.6,
    color: '#707070',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 32,
    flex: 1,
  },
  ButtonStyle: {
    alignSelf: 'center',
    marginTop: 15,
  },
});
export default Cart;
