import React, {useState, useCallback} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Colors from '../theme/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
// call backend
import Axios from 'axios';
import {IP} from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartCard({
  product_id,
  product_quantity,
  title,
  subtitle,
  quantity,
  price,
  image,
  DelMessageParent,
  setDelMessageParent,
  totalMoney,
  setTotalMoney,
}) {
  const navigation = useNavigation();
  const [CartQuantity, setCartQuantity] = useState(quantity);
  const [pPrice, setPPrice] = useState(price * CartQuantity);
  const [cus_id, setCus_id] = useState(null);
  const [product_qty, setProduct_qty] = useState(product_quantity);
  const [delMessage, setDelMessage] = useState(false);
  AsyncStorage.getItem('cus_id').then(cus_id => {
    setCus_id(cus_id);
  });
  const UpdateQuantityP = useCallback(() => {
    Axios.put(`${IP}/updatecartP`, {
      cart_quantity: CartQuantity + 1,
      cus_id: cus_id,
      product_id: product_id,
      product_quantity: product_qty,
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [CartQuantity, cus_id, product_id]);
  const UpdateQuantityD0 = useCallback(() => {
    Axios.put(`${IP}/updatecartD0`, {
      cart_quantity: CartQuantity,
      cus_id: cus_id,
      product_id: product_id,
      product_quantity: product_qty,
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [CartQuantity, cus_id, product_id]);
  const UpdateQuantityD = useCallback(() => {
    Axios.put(`${IP}/updatecartD`, {
      cart_quantity: CartQuantity - 1,
      cus_id: cus_id,
      product_id: product_id,
      product_quantity: product_qty,
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [CartQuantity, cus_id, product_id]);
  const DeleteProduct = useCallback(() => {
    Axios.delete(`${IP}/deletecart/${cus_id}`, {
      data: {
        product_id: product_id,
        cart_quantity: CartQuantity,
      },
    }).then(res => {
      // console.log(res.data);
      setDelMessage(!delMessage);
      setDelMessageParent(!DelMessageParent);
    });
  }, [CartQuantity, cus_id, product_id]);
  return (
    <View style={styles.card}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.image}>
          <Image
            style={{height: 121, width: 124, borderRadius: 20}}
            source={{uri: image}}
          />
        </View>
        <View style={styles.titleSection}>
          <View>
            <Text
              style={{color: Colors.black, fontWeight: '600', fontSize: 18}}>
              {title}
            </Text>
            <Text>Số lượng còn: {product_qty}</Text>
          </View>
          <View>
            <View style={styles.quantityStyle}>
              <TouchableOpacity
                onPress={() => {
                  if (CartQuantity > 1) {
                    setCartQuantity(CartQuantity - 1);
                    setProduct_qty(product_qty + 1);
                    setTotalMoney(totalMoney - price);
                  } else {
                    setCartQuantity(1);
                    alert('Số lượng phải lớn hơn 1');
                  }
                  setPPrice((CartQuantity - 1) * price);
                  if (product_qty > 0) {
                    CartQuantity > 1 ? UpdateQuantityD() : UpdateQuantityD0();
                  } else {
                    alert('Đã hết hàng');
                  }
                }}>
                <View style={{height: 30, width: 30, alignItems: 'center'}}>
                  <Text style={{marginTop: 4}}>-</Text>
                </View>
              </TouchableOpacity>
              <Text>{CartQuantity}</Text>
              <TouchableOpacity
                onPress={() => {
                  if (CartQuantity) {
                    if (product_qty > 0) {
                      setCartQuantity(CartQuantity + 1);
                      setPPrice((CartQuantity + 1) * price);
                      UpdateQuantityP();
                      setProduct_qty(product_qty - 1);
                      setTotalMoney(totalMoney + price);
                    } else {
                      alert('Đã hết hàng');
                      setProduct_qty(0);
                    }
                  }
                }}>
                <View style={{height: 30, width: 30, alignItems: 'center'}}>
                  <Text style={{marginTop: 4}}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={{justifyContent: 'space-between'}}>
        <Text style={{fontWeight: '700', color: Colors.black}}>{pPrice}</Text>
        <View style={styles.delete}>
          <Icon
            color={Colors.white}
            size={30}
            name="delete"
            style={{marginTop: 10}}
            onPress={() => {
              DeleteProduct();
              if (delMessage) {
                if (delMessage == true) {
                  alert('Xóa sản phẩm thành công');
                  navigation.navigate('Cart');
                  setDelMessage(!delMessage);
                  setDelMessageParent(!DelMessageParent);
                } else {
                  alert('Xóa sản phẩm thất bại');
                }
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 124,
    height: 121,
    borderColor: Colors.gray,
    borderRadius: 20,
  },
  titleSection: {
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  quantityStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 95,
    height: 30,
    borderRadius: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  delete: {
    width: 53,
    height: 55,
    borderRadius: 20,
    borderColor: Colors.white,
    borderWidth: 1,
    backgroundColor: Colors.colorPrimary,
    alignItems: 'center',
  },
});
