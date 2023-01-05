import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Colors from '../theme/Colors';
// import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  card: {
    margin: 16,
    marginTop: 40,
    backgroundColor: Colors.khaki,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 20,
  },
});

const Product = ({
  product_id,
  product_name,
  product_image,
  product_price,
  product_quantity,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card} key={product_id}>
      <View>
        <Image
          style={{
            height: 100,
            width: 100,
            borderRadius: 9999,
            marginTop: 20,
            marginBottom: 20,
            // box shadow
          }}
          source={{
            uri: product_image,
          }}
          text
        />
      </View>
      <View>
        <Text
          style={{textAlign: 'center', marginBottom: 10}}
          onPress={() =>
            navigation.replace('ProductDetails', {
              product_id,
            })
          }>
          Còn: {product_quantity}
        </Text>
        <Text
          style={{
            color: Colors.primaryColor,
            fontWeight: '600',
            fontSize: 18,
            width: 150,
            height: 50,
            textAlign: 'center',
          }}
          onPress={() =>
            navigation.replace('ProductDetails', {
              product_id,
            })
          }>
          {product_name}
        </Text>
        <Text
          onPress={() =>
            navigation.replace('ProductDetails', {
              product_id,
            })
          }
          style={{
            color: Colors.black,
            fontWeight: '600',
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 20,
          }}>
          Giá {product_price} đ
        </Text>
      </View>
    </View>
  );
};

export default Product;
