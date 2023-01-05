import React, {useState, useEffect} from 'react';
import {Box, Heading, FlatList, HStack, VStack, Image} from 'native-base';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Colors from '../theme/Colors';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
// call backend
import Axios from 'axios';
import {IP} from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProducByCategory = () => {
  const navigation = useNavigation();

  const [dataProduct, setDataProduct] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [search, setSearch] = useState('');
  // search
  const searchFilter = text => {
    if (text) {
      const newData = dataProduct.filter(item => {
        const itemData = item.product_name
          ? item.product_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(dataProduct);
      setSearch(text);
    }
  };

  useEffect(() => {
    Axios.get(`${IP}/product`)
      .then(response => {
        setDataProduct(response.data);
        setFilterData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const data = filterData.map((item, index) => {
    return {
      key: index,
      product_id: item.product_id,
      product_name: item.product_name,
      product_price: item.product_price,
      product_image: item.product_image,
      product_quantity: item.product_quantity,
    };
  });
  // console.log('data', data);
  return (
    <Box
      borderBottomWidth="1"
      _dark={{
        borderColor: 'gray.600',
      }}
      borderColor="coolGray.200"
      pl="4"
      pr="5"
      py="2">
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'gray.700',
        }}>
        <Image
          source={require('../../assets/icons/search.png')}
          resizeMode="contain"
          style={{
            position: 'absolute',
            width: 20,
            height: 18,
            top: 12,
            left: 10,
          }}
          alt="food"
        />
        <TextInput
          autoCorrect={false}
          placeholder="Tìm kiếm"
          style={{
            backgroundColor: Colors.inactive,
            height: 40,
            flex: 1,
            marginEnd: 2,
            borderRadius: 5,
            opacity: 0.8,
            paddingStart: 30,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          onChangeText={text => searchFilter(text)}
        />
      </View>
      <Heading fontSize="xl" pb="3">
        Danh sách các món ăn
      </Heading>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Box
            borderWidth="1"
            backgroundColor={'gray.300'}
            _dark={{
              borderColor: 'gray.600',
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="4"
            py="2"
            key={item.product_id}>
            <TouchableOpacity
              onPress={() =>
                navigation.replace('ProductDetails', {
                  product_id: item.product_id,
                })
              }>
              <HStack space={2} alignItems="center">
                <Image
                  source={{uri: item.product_image}}
                  alt={'Text'}
                  size={'xl'}
                />
                <VStack>
                  <Text style={styles.TextStyle}>{item.product_name}</Text>
                  <Text>Giá: {item.product_price}</Text>
                  <Text>Đánh giá: {item.Rating}</Text>
                  <Text>Thời gian làm: {item.Time}</Text>
                </VStack>
              </HStack>
            </TouchableOpacity>
          </Box>
        )}
        style={{height: '75%'}}
      />
      <Button
        title={'Về trang chủ'}
        style={{
          marginBottom: 200,
          width: '40%',
          marginLeft: 110,
          marginTop: 20,
        }}
        onPress={() => navigation.replace('HomeScreen')}
      />
    </Box>
  );
};

export default ProducByCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  TextStyle: {
    color: Colors.primaryColor,
    width: 500,
    fontWeight: '900',
    fontSize: 18,
  },
  ButtonStyle: {
    width: 80,
    alignSelf: 'center',
    marginTop: 15,
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 10,
    width: 50,
    height: 50,
  },
  text: {
    color: '#000',
    fontFamily: 'Avenir',
    fontSize: 15,
  },
});
